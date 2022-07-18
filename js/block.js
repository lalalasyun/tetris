//blockの落下
var timeout_timer = null;
var fall_keyEvent_cnt = 0;
const fall_block = isKeyEvent => {
   

    
    if (isConnect(0, 1)) {
        clearInterval(IntervalId);
        lockdown_mode(isKeyEvent);
        return;
    }
    coord.y++;
    set_block_field();

}


//blockの確定
var definition_block = function () {
    var isFin = false;
    for (i = 0; i < h; i++) {
        for (n = 0; n < w; n++) {
            if (field[i][n] == 1) {
                defin_field[i][n] = position.block.color;
                if (i < 2) isFin = true;
            }
        }
    }

    del_block_field(position);
    set_definition_block();
    clearInterval(IntervalId);


    if (isFin) {
        game_over();
        return true;
    }

    //壊したlineの数を取得し画面に描画する
    var cnt = check_line();
    count_line += cnt;

    level = Math.floor(count_line/10);
    if (cnt > 0) {
        clearInterval(dot_timer_Id);
        get_dot(get_lineCount(cnt));
        dot_timer_Id = setTimeout(() => {
            init_game_ui();
        }, 1000);
    }


    set_next_block();

    $('#line').text(count_line + 'LINES');
    $('#level').text(level+1 + 'LEVEL');

    //ホールドのロックを解除する
    isHoldLock = false;

    isFall = true;

    IntervalId = setInterval(fall_block, get_fall_time());

}

//次のblockをセットする
//左から4列目にミノの左端がくる
//Oミノだけは左から5列目にミノの左端が来る
function get_next() {
    block_name = set_block();
    coord.block = block_dict[block_name];
    coord.x = block_name == 'o' ? 5 : 4;
    coord.y = 3 - coord.block[0].h;
    coord.rotate = 0;


}

//fieldにblockをセット
function set_block_field() {
    //前回のblockを消去
    del_block_field(position);

    //新しい位置を保存
    position = { x: coord.x, y: coord.y, block: coord.block, rotate: coord.rotate };

    block_coord = position.block[position.rotate].b;

    for (k in block_coord) {
        b = block_coord[k];

        x = (b.x + position.x);
        y = (b.y + position.y);

        field[y][x] = 1;
    }

    set_move_block();
    set_definition_block();
    get_ghost();
}



//blockを消去
function del_block_field() {
    for (i = 0; i < h; i++) {
        for (n = 0; n < w; n++) {
            field[i][n] = 0;
        }
    }
}

//block_listから先頭のblockを取り出す
function set_block() {
    var result = block_list[block.i][block.n];
    block.n++;
    if (block.n == 7) {
        block.n = 0;
        block.i++;
    }
    return result;
}

//ランダムでblockを取得
function get_block_key() {
    var i = Math.floor(Math.random() * block_key.length);
    return block_key[i];
}

//落ちてくるblockを10通り決める(七種*10)
function get_block_list() {
    res_list = [];
    turn_list = [];
    for (i = 0; i < 100; i++) {
        turn_list = [...block_key];
        array_shuffle(turn_list);
        res_list[res_list.length] = turn_list;
    }
    return res_list;
}

function array_shuffle(list) {
    for (n = 0; n < 100; n++) {
        var r = Math.floor(Math.random() * block_key.length);
        move_value = list[0];
        list[0] = list[r];
        list[r] = move_value;
    }
    return list;
}

//listから次のブロックを取得
function get_next_block() {
    var list = [];
    block_i = block.i;
    block_n = block.n;

    for (i = 0; i < 6; i++) {
        if (block_n + 1 > 6) {
            block_i++;
            block_n = 0;
        } else {
            block_n++;
        }
        list.push(block_dict[block_list[block_i][block_n]]);
    }
    return list;
}