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

    init_game();
    set_block_field();

}


//blockの確定
function definition_block(d) {
    var isFin = false;
    for (i = 0; i < h; i++) {
        for (n = 0; n < w; n++) {
            if (field[i][n] == 1) {
                if(defin_field[i][n] != 0)isFin = true;
                defin_field[i][n] = position.block.color;
            }
        }
    }
    init_game();

    field = init_field();

    set_definition_block();
    clearInterval(IntervalId);


    if (isFin) {
        game_over();
        return true;
    }

    //壊したlineの数を取得し画面に描画する
    var line_list = check_line();

    

    cnt = line_list.length;

    init_event_text();

    //tspin
    if(tspin != null){
        result = check_tspin(cnt,tspin);
        if(result != null){
            backtoback_count++;
            set_tspin(result);
        }
    }


    remove_line(line_list);
    set_line_effect(line_list);
    count_line += cnt;

    level = Math.floor(count_line/10);

    init_game_ui();
    clearInterval(dot_timer_Id);
    if(cnt > 0){
        ren_count++;
        
        set_ren();
        if(cnt == 4){
            backtoback_count++;
            set_backtoback();
    
            setTimeout(function(){set_tetris(line_list)},200);
        }else{
            backtoback_count = 0;
        }
    }else{
        ren_count = 0;
    }

    if(isPerfect())set_perfect();
    

    if (isLine10(count_line)) set_levelup();
    
    
    

    dot_timer_Id = setTimeout(() => {
        init_game_ui();
    }, 1000);


    set_next_block();

    $('#line').text(count_line + 'LINES');
    $('#level').text(level + 'LEVEL');

    //ホールドのロックを解除する
    isHoldLock = false;

    isFall = true;

    tspin = null;

    IntervalId = setInterval(fall_block, get_fall_time());

}

//次のblockをセットする
//左から4列目にミノの左端がくる
//Oミノだけは左から5列目にミノの左端が来る
function get_next() {
    block_name = get_block();
    coord.block = block_dict[block_name];
    coord.x = block_name == 'o' ? 5 : 4;
    coord.y = 2;position.y = 1;
    coord.rotate = 0;
    

}

//fieldにblockをセット
function set_block_field() {
    //前回のblockを消去
    field = init_field();

    //新しい位置を保存
    position = { x: coord.x, y: coord.y, block: coord.block, rotate: coord.rotate };

    block_coord = position.block[position.rotate].b;

    for (k in block_coord) {
        b = block_coord[k];

        x = (b.x + position.x);
        y = (b.y + position.y);

        field[y][x] = 1;
    }
    set_definition_block();
    set_move_block();
    
    set_ghost();
}

//揃ったlineを消去しずらす
function remove_line(list){
    //list[揃ったlineのindexが格納]
    //新しいfeild
    var new_field = init_field();

    var index = 22;
    for(i in defin_field){
        if(list.indexOf(parseInt(22-i)) == -1){
            new_field[index] = defin_field[22-i];
            index--;
        }
        
    }
    defin_field = new_field;
}




//block_listから先頭のblockを取り出す
function get_block() {
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