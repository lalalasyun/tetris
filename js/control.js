let IntervalId = 0;
let isHardDrop = false;
let isHoldLock = false;
let isPause = false;

/// 長押しを検知する閾値
const LONGPRESS = 50;
/// 長押し実行タイマーのID
let timerId1, timerId2, timerId3, timerId4, timerId5;

$(function () {


    /// 長押し・ロングタップを検知する

    $('#left').on('touchstart', leftdown).on('touchend', leftup);

    $('#right').on('touchstart', rightdown).on('touchend', rightup);

    $('#hold').on('touchstart', hold)

    $('#rotateL').on('touchstart', rotateL)
    $('#rotateR').on('touchstart', rotateR)

    $('#speedH').on('touchstart', speedHdown).on('touchend', speedHup)

    $('#speedS').on('touchstart', speedSdown).on('touchend', speedSup)

    $('#start').mousedown(start)
    $('#end').mousedown(end)

    $('.quit').mousedown(end)
    $('.restart').mousedown(pause)
    $('.option').mousedown(function(){
        $('#modal').fadeTo(200, 1);
    })
    $('.start').mousedown(start)
    $('.end').mousedown(end)

    $('#footer').mousedown(handle);



    $('html').keydown(function (e) {

        if (!isFall) return;
        switch (e.which) {
            case 65: // Key[a]
                leftdown();
                break;

            case 37: //key[<-]
                leftdown();
                break;

            case 68: // Key[d]
                rightdown();
                break;

            case 39: //key[->]
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
        if(e.which == 27)pause();
        if (!isFall) return;
        switch (e.which) {
            case 65: // Key[a]
                leftup();
                break;

            case 37: //key[<-]
                leftup();
                break;

            case 68: // Key[d]
                rightup();
                break;

            case 39: //key[->]
                rightup();
                break;

            case 81: // Key[q]
                rotateL();
                break;

            case 90: //key[z]
                rotateL();
                break;

            case 69: // Key[e]
                rotateR();
                break;

            case 88: //key[x]
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



    function rotateL(event) {
        handle(event);
        if (!isFall) return;
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

        tspin = d;

        if (coord.y + b.h > h) {
            definition_block();
        } else {
            init_game();
            set_block_field();
        }
    }

    function rotateR(event) {
        handle(event);
        if (!isFall) return;
        rotate = 0;
        if (coord.rotate != 270) {
            rotate = coord.rotate + 90;
        } else {
            rotate = 0;
        }
        d = super_rotation(coord.rotate, rotate);
        if (d == null) return;

        //lockdown_cntを増やす
        lockdown_cnt++;

        coord.x += d.x;
        coord.y += d.y;
        coord.rotate = rotate;

        tspin = d;

        if (coord.y + b.h > h) {
            definition_block();
        } else {
            init_game();
            set_block_field();
        }
    }

    function leftdown(event) {
        handle(event);
        if (!isFall) return;
        if (timerId1 != null) {
            clearTimeout(timerId1);
            timerId1 = null
        }
        if (timerId2 != null) {
            clearTimeout(timerId2);
            timerId2 = null;
        }

        timerId1 = setInterval(function () {

            move_left();
        }, LONGPRESS);

    }

    //左に1動かす
    var move_left = function () {
        if (isConnect(-1, 0)) {
            clearTimeout(this);
            return;
        }
        //lockdown_cntを増やす
        lockdown_cnt++;

        coord.x--;
        tspin = null;

        init_game();
        set_block_field();
    }



    function leftup() {
        if (!isFall) return;
        if (timerId1 != null) {
            clearTimeout(timerId1);
            timerId1 = null;

        } else {
            move_left;
        }


    }

    function rightdown(event) {
        handle(event);
        if (!isFall) return;
        if (timerId2 != null) {
            clearTimeout(timerId2);
            timerId2 = null;
        }
        if (timerId1 != null) {
            clearTimeout(timerId1);
            timerId1 = null
        }

        timerId2 = setInterval(function () {

            move_right();
        }, LONGPRESS);
    }

    //右に1動かす
    var move_right = function () {
        b = position.block[position.rotate];

        if (isConnect(1, 0)) {
            clearTimeout(this);
            return;
        }
        //lockdown_cntを増やす
        lockdown_cnt++;

        coord.x++;
        tspin = null;

        init_game();
        set_block_field();
    }


    function rightup() {
        if (!isFall) return;
        if (timerId2 != null) {
            clearTimeout(timerId2);
            timerId2 = null;

        } else {
            move_right();
        }


    }

    function hold() {
        if (!isFall) return;
        if (isHoldLock) return;


        if (hold_block == null) {
            hold_block = coord.block;
            coord.block = block_dict[get_block()];
        } else {
            move_block = hold_block;
            hold_block = coord.block;
            coord.block = move_block;
        }
        coord.x = 4, coord.y = 0, coord.rotate = 0;
        init_game();
        init_hold();
        set_block_field();
        set_hold_block();
        isHoldLock = true;
    }


    const speedH = function () {
        if (!isFall) return;
        clearInterval(timerId3);
        timerId3 = null;
        timerId3 = setInterval(function () {
            tspin = null;
            while (!isConnect(0, 1, position.rotate)) {
                fall_block();
            }
            fall_block(true);
        }, 300);
    }

    function speedHdown() {
        if (!isFall) return;
        if (timerId3 == null && isFall) {
            timerId3 = setTimeout(speedH, 1000);
            while (!isConnect(0, 1, position.rotate)) {
                fall_block();
                tspin = null;
            }
            fall_block(true);
        }
    }

    function speedHup() {
        if (!isFall) return;
        clearInterval(timerId3);
        timerId3 = null;

    }

    var s_key_down_cnt = 0;
    function speedSdown() {
        if (!isFall) return;
        if (s_key_down_cnt > 20) {
            if (timerId4 != null) {
                clearInterval(timerId4);
                timerId4 = setInterval(fall_block, get_fall_time() / 20, true);
                s_key_down_cnt = 0;
                return;
            }
        }
        clearInterval(IntervalId);
        if (!isConnect(0, 1) && timerId4 == null) {
            timerId4 = setInterval(fall_block, 20);
            tspin = null;
        }
        s_key_down_cnt++;
    }

    function speedSup() {
        if (!isFall) return;
        //他のキーが押されていない間だけ



        clearInterval(timerId4);
        clearInterval(IntervalId);

        s_key_down_cnt = 0;

        timerId4 = null;
        IntervalId = setInterval(fall_block, get_fall_time());

    }


    function start() {
        if (isGame) return;
        if (isMobile) {
            document.getElementById("ctr_btn1").hidden = false;
            document.getElementById("openbtn1").hidden = false;
        }
        document.getElementById("endstart_box").hidden = true;

        //確定済みフィールド[10,23]
        defin_field = init_field();

        init_game_ui();
        set_dot(temp_dot.ready);
        timerId5 = setTimeout(() => { delay_start() }, 1000);
    }
    //スタートを押して一秒後にゲームを起動
    function delay_start() {
        isFall = true;
        isGame = true;
        count_line = 0;
        level = 0;
        init_game_ui();
        set_hold_block();
        $('#line').text(count_line + 'LINE');
        $('#level').text('0LEVEL');
        coord.x = 4, coord.y = 1, coord.rotate = 0;
        block_list = get_block_list();

        set_next_block();
        coord.block = block_dict[get_block()];
        clearInterval(IntervalId);
        IntervalId = setInterval(fall_block, get_fall_time());
    }

    function end() {
        speedHup();

        document.getElementById("ctr_btn1").hidden = true;
        document.getElementById("openbtn1").hidden = true;

        document.getElementById("endstart_box").hidden = false;
        document.getElementById("end_box").hidden = true;

        //操作フィールド[10,23]
        field = init_field();

        $('#mess').text('');
        clearInterval(IntervalId);


        isFall = false;
        isGame = false;
        init_game();
        init_game_ui();
        set_dot(temp_dot.home);



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
            move_cnt = 0;
            lockdown_cnt = 0;
            lockdown_hight = 0;
            clearInterval(lockdown_id)
            lockdown_id = null;
        }

        //starttimerを止める
        if (timerId5 != null) {
            clearInterval(timerId5)
        }

        //コンボカウントを0
        ren_count = 0;

        //back
        backtoback_count = 0;

        //pause
        isPause = false;

        set_dot(temp_dot.home);

    }

    function pause(){
        //落下を止める
        if (isGame || isPause) {
            if (!isPause) {
                document.getElementById("pause_box").hidden = false;
                clearInterval(IntervalId);
                init_game_ui();
                
                context4.fillStyle = get_rgba('grey', 0.2, 1);
                context4.fillRect(0, 0, game_ui.width, game_ui.height);
                set_dot(temp_dot.pause);

                isFall = false;
                isPause = true;
            } else {
                document.getElementById("pause_box").hidden = true;
                init_game_ui();
                IntervalId = setInterval(fall_block, get_fall_time());
                isFall = true;
                isPause = false;
            }
            
        }
    }

    //スワイプ処理
    /** ②指が触れたか検知 */
    $("#drop").on("touchstart", start_check);

    /** ③指が動いたか検知 */
    $("#drop").on("touchmove", move_check);

    /** ④指が離れたか検知 */
    $("#drop").on("touchend", end_check);

    /** 変数宣言 */
    var moveY1, moveX1, moveY2, moveX2, posiY, posiX, countX1, countY1;

    //ダブルタップ用の時間
    var time = 0;


    // ⑤タッチ開始時の処理
    function start_check(event) {
        handle(event);
        if (!isFall) return;
        now_time = new Date();
        time_diff = now_time - time;

        /** 現在の座標取得 */
        posiY = getY(event);
        posiX = getX(event);

        //ダブルタップ
        if (time_diff < 200 && coord.y > 1) {
            while (!isConnect(0, 1, position.rotate)) {
                fall_block();
                tspin = null;
            }
            fall_block(true);
            return;
        }

        time = now_time;


        console.log(posiY, posiX)

        /** 移動距離状態を初期化 */
        moveY2 = '';
        moveX2 = '';

        countX1 = 0;
        countY1 = 0;

        /** 表示メッセージを初期化 */
        msgY = '';
        msgX = '';
    }

    // スワイプの標準イベントを発生させない
    function handle(event) {
        if (event == null) return;
        event.preventDefault();
    }

    // ⑥スワイプ中の処理
    function move_check(event) {
        handle(event);
        if (!isGame) false;

        limitX = 15;
        limitY = 50;

        var countX2 = Math.floor(Math.abs((posiX - getX(event)) / limitX));
        var countY2 = Math.floor(Math.abs((posiY - getY(event)) / limitY));

        if (posiX - getX(event) > limitX) // limitXpx以上移動でスワイプと判断
        {
            /** 右→左と判断 */
            moveX2 = "left";

        }
        else if (posiX - getX(event) < -limitX)  // limitXpx以上移動でスワイプと判断
        {
            /** 左→右と判断 */
            moveX2 = "right";
        }

        if (posiY - getY(event) > limitY) // limitYpx以上移動でスワイプと判断
        {
            /** 下→上と判断 */
            moveY2 = "top";

        }
        else if (posiY - getY(event) < -limitY)  // limitYpx以上移動でスワイプと判断
        {
            /** 上→下と判断 */
            moveY2 = "bottom";
        }

        if (countX1 < countX2) {
            countX1 = countX2;
            moveX1 = moveX2;

            posiX = getX(event);

            end_check(null, countX1, 0);
        }

        if (countY1 < countY2) {
            countY1 = countY2;
            moveY1 = moveY2;

            posiY = getY(event);
            end_check(null, 0, countY1);

        }


        if (moveY1 != moveY2 || moveX1 != moveX2) {
            countX1 = 0;
            countY1 = 0;
        }

    }

    // ⑦指が離れた時の処理
    function end_check(event, x, y) {
        handle(event);
        if (!isGame) false;
        console.log(msgX, msgY);
        console.log(x, y);

        if (timerId4 != null) {
            speedSup();
        }



        if (moveX2 == "left" && y == 0) {
            msgX = "左へ移動";
            for (i = 0; i < x; i++) {
                move_left();
            }

        }
        else if (moveX2 == "right" && y == 0) {
            msgX = "右へ移動";
            for (i = 0; i < x; i++) {
                move_right();
            }

        }
        else {
            msgX = "移動なし";

        }


        if (moveY2 == "top") {
            msgY = "上へ移動";
            now_time = new Date();
            time_diff = now_time - time;
            if (time_diff > 50) {
                hold();
            }


        }
        else if (moveY2 == "bottom" && x == 0) {

            msgY = "下へ移動";
            speedSdown();
        }
        else {
            msgY = "移動なし";
        }

    }


    // 座標取得処理
    function getY(event) {
        //縦方向の座標を取得
        return (event.originalEvent.touches[0].pageY);
    }

    function getX(event) {
        //横方向の座標を取得
        return (event.originalEvent.touches[0].pageX);
    }




    //jQuery Simple Modal Example


    $('#edit').click(function () {
        $('#modal').fadeTo(200, 1);
    });

    $('#close').click(function () {
        $('#modal').fadeTo(200, 0).hide();
        // if(isMobile){
        //     var ele = document.documentElement;
        //     ele.requestFullscreen();
        // }

    });

    
    //ポーズ
    $(".openbtn1").click(function () {
        $(this).toggleClass('active');

        pause();
        
    });



    //画面の回転を検知
    var isReverse = false;  //正面が逆かどうかのフラグを用意しておく

    if (navigator.userAgent.indexOf('Android') > 0) {
        //Androidなら正面設定を確認
        var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
        if (orientation.type === "portrait-secondary" || orientation.type === "landscape-primary") {
            isReverse = true;
        }
    }

    $(window).on("orientationchange", function () {
        if (isReverse) {
            orientCheckReverse();  //正面が逆の場合
        } else {
            orientCheck();  //正面が通常の場合
        }
    });

    var result;
    //正面設定が通常の場合の縦横判定処理
    function orientCheck() {
        if (isGame) return;
        var orientation = window.orientation;
        if (orientation === 0) {
            /*  縦画面時の処理  */
            window.location.reload();

        } else {
            /*  横画面時の処理  */
            window.location.reload();

        }
    };

    //正面設定が逆の場合の縦横判定処理
    function orientCheckReverse() {
        if (isGame) return;
        var orientation = window.orientation;
        if (orientation === 0) {
            /*  横画面時の処理  */
            window.location.reload();

        } else {
            /*  縦画面時の処理  */
            window.location.reload();
        }
    };

});