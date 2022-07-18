let IntervalId = 0;
let isHardDrop = false;
let isHoldLock = false;

/// 長押しを検知する閾値
const LONGPRESS = 50;
/// 長押し実行タイマーのID
let timerId1, timerId2, timerId3, timerId4;

$(function () {


    /// 長押し・ロングタップを検知する

    $('#left').mouseup(leftdown).mousedown(leftup);
    $('#right').mouseup(rightdown).mousedown(rightup);

    $('#hold').mousedown(hold)

    $('#rotateL').mousedown(rotateL)
    $('#rotateR').mousedown(rotateR)

    $('#speedH').mousedown(speedHdown).mouseup(speedHup)

    $('#speedS').mousedown(speedSdown).mouseup(speedSup)
    $('#start').mousedown(start)
    $('#end').mousedown(end)

    $('#getary').mousedown(function (e) {
        console.log(defin_field);
    });

    $('html').keydown(function (e) {

        if (!isFall) return;
        switch (e.which) {
            case 65: // Key[a]
                leftdown();
                break;

            case 68: // Key[d]
                rightdown();
                break;

            case 83: // Key[s]
                speedSdown();
                break;

            case 32: // Key[space]
                speedHdown();
                break;
        }
    });

    $('html').keyup(function (e) {
        if (e.which == 13) start();
        if (e.which == 77) end();
        if (!isFall) return;
        switch (e.which) {
            case 65: // Key[a]
                leftup();
                break;

            case 68: // Key[d]
                rightup();
                break;

            case 81: // Key[q]
                rotateL();
                break;

            case 69: // Key[e]
                rotateR();
                break;

            case 32: // Key[space]
                speedHup();
                break;

            case 83: // Key[s]
                speedSup();
                break;

            case 16: // Key[shift]
                hold();
                break;
        }
    });
    function rotateL() {
        rotate = 0;
        if (coord.rotate != 0) {
            rotate = coord.rotate - 90;
        } else {
            rotate = 270;
        }
        b = position.block[rotate];
        d = super_rotation(coord.rotate, rotate);
        if (d == null) return;
        //lockdown_cntを増やす
        lockdown_cnt++;

        coord.x += d.x;
        coord.y += d.y;
        coord.rotate = rotate;
        if (coord.y + b.h > h) {
            definition_block();
        } else {
            set_block_field();
        }
    }

    function rotateR() {
        rotate = 0;
        if (coord.rotate != 270) {
            rotate = coord.rotate + 90;
        } else {
            rotate = 0;
        }
        d = super_rotation(coord.rotate, rotate);
        if (isConnect(d.x, d.y, rotate)) {
            return;
        }
        //lockdown_cntを増やす
        lockdown_cnt++;

        coord.x += d.x;
        coord.y += d.y;
        coord.rotate = rotate;
        if (coord.y + b.h > h) {
            definition_block();
        } else {
            set_block_field();
        }
    }

    function leftdown() {
        clearTimeout(timerId1);
        timerId1 = setInterval(function () {

            if (isConnect(-1, 0)) {
                clearTimeout(this);
                return;
            }
            //lockdown_cntを増やす
            lockdown_cnt++;

            coord.x--;

            set_block_field();
        }, LONGPRESS);

    }

    function leftup() {
        clearTimeout(timerId1);
    }

    function rightdown() {
        clearTimeout(timerId2);
        timerId2 = setInterval(function () {

            b = position.block[position.rotate];

            if (isConnect(1, 0)) {
                clearTimeout(this);
                return;
            }
            //lockdown_cntを増やす
            lockdown_cnt++;

            coord.x++;

            set_block_field();
        }, LONGPRESS);
    }

    function rightup() {
        clearTimeout(timerId2);

    }

    function hold() {
        if (isHoldLock) return;


        if (hold_block == null) {
            hold_block = coord.block;
            coord.block = block_dict[set_block()];
        } else {
            move_block = hold_block;
            hold_block = coord.block;
            coord.block = move_block;
        }
        coord.x = 4, coord.y = 0, coord.rotate = 0;
        set_block_field();
        set_hold_block();
        isHoldLock = true;
    }

    const speedH = function () {
        while (!isConnect(0, 1, position.rotate)) {
            fall_block();
        }
        fall_block(true);

        clearInterval(timerId3);

    }

    function speedHdown() {
        if (timerId3 == null) {
            timerId3 = setInterval(speedH, 200);
        }
    }

    function speedHup() {
        while (!isConnect(0, 1, position.rotate)) {
            fall_block();
        }
        fall_block(true);
        clearInterval(timerId3);
        timerId3 = null;


    }

    var s_key_down_cnt = 0;
    function speedSdown() {
        if (s_key_down_cnt > 20) {
            if (timerId4 != null) {
                clearInterval(timerId4);
                timerId4 = setInterval(fall_block, 20, true);
                s_key_down_cnt = 0;
                return;
            }
        }
        clearInterval(IntervalId);
        if (!isConnect(0, 1) && timerId4 == null) {
            timerId4 = setInterval(fall_block, 20);
        }
        s_key_down_cnt++;
    }

    function speedSup() {
        fall_block(true);

        clearInterval(timerId4);
        clearInterval(IntervalId);

        timerId4 = null;
        IntervalId = setInterval(fall_block, get_fall_time());

    }

    function start() {
        if (isGame) return;
        init_game_ui();
        get_dot(temp_dot.ready);
        setTimeout(() => { delay_start() }, 1000);
    }
    //スタートを押して一秒後にゲームを起動
    function delay_start() {
        isFall = true;
        isGame = true;
        count_line = 0;
        init_game_ui();
        set_hold_block();
        $('#line').text(count_line + 'LINES');
        $('#level').text('1LEVEL');
        coord.x = 4, coord.y = 0, coord.rotate = 0;
        block_list = get_block_list();

        set_next_block();
        coord.block = block_dict[set_block()];
        clearInterval(IntervalId);
        IntervalId = setInterval(fall_block, get_fall_time());
    }

    function end() {
        $('#mess').text('');
        clearInterval(IntervalId);
        isFall = false;
        isGame = false;
        init_game();
        init_game_ui();
        get_dot(temp_dot.home);
        //操作フィールド[10,23]
        field = init_field();

        //確定済みフィールド[10,23]
        defin_field = init_field();

        //hold
        isHoldLock = false;
        hold_block = null;
        block = { i: 0, n: 0 };
        context2.clearRect(0, 0, hold_zone.width, hold_zone.height);

        //next
        context3.clearRect(0, 0, next_zone.width, next_zone.height);

        //gameoverの表示を止める
        if (gameover_dot_timer_ID != null) {
            clearInterval(gameover_dot_timer_ID);
            gameover_dot_timer_ID = null;
        }

        //lockdownモードを止める
        if (lockdown_id == null) {
            clearInterval(lockdown_id)
            lockdown_id = null;
        }

        get_dot(temp_dot.home);

    }

    //jQuery Simple Modal Example

    $('#edit').click(function () {
        $('#cover, #modal').fadeTo(200, 1);
    });

    $('#close, #cover').click(function () {
        $('#cover, #modal').fadeTo(200, 0).hide();
    });

});
