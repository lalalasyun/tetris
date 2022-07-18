//canvasに移動block配列を描画する
function set_move_block() {
    init_game();

    context1.beginPath();

    var color = color_dict[position.block.color];


    for (i = 3; i < h; i++) {
        for (n = 0; n < w; n++) {
            if (field[i][n] === 1) {
                context1.beginPath();

                context1.strokeStyle = 'black';
                context1.strokeRect(n * box, (i - 3) * box, box, box);

                context1.fillStyle = get_rgba(color, 1, 0.5);
                context1.fillRect(n * box, (i - 3) * box, box, box);

                context1.fillStyle = get_rgba(color, 1);
                context1.fillRect(n * box + 7, (i - 3) * box + 7, box - 14, box - 14);
            }
        }
    }
}
//canvasに確定block配列を描画する
function set_definition_block() {
    for (i = 3; i < h; i++) {
        for (n = 0; n < w; n++) {
            if (defin_field[i][n] !== 0) {
                var color = color_dict[defin_field[i][n]];
                context1.beginPath();

                context1.strokeStyle = 'black';
                context1.strokeRect(n * box, (i - 3) * box, box, box);

                context1.fillStyle = get_rgba(color, 1, 0.5);
                context1.fillRect(n * box, (i - 3) * box, box, box);

                context1.fillStyle = get_rgba(color, 1);
                context1.fillRect(n * box + 7, (i - 3) * box + 7, box - 14, box - 14);
            }
        }
    }
}


//canvasに格子を描画する(1マス辺り40*40)
function set_line() {

    context5.beginPath();
    context5.strokeStyle = 'grey';
    context5.lineWidth = 2;
    for (var i = 1; i < w; i++) {
        context5.moveTo(i * box, 0);
        context5.lineTo(i * box, 800);
    }
    for (var i = 1; i < h - 3; i++) {
        context5.moveTo(0, i * box);
        context5.lineTo(400, i * box);

    }
    context5.stroke();

}

//canvasにholdlineを描画する
function set_hold_line(key) {
    context2.beginPath();
    context2.strokeStyle = 'black';
    context2.lineWidth = 2;
    var move_box = 100 / 4;
    var move_x = move_box / 2;
    if (key == 'o') {
        for (var i = 1; i < 5; i++) {
            context2.moveTo(i * move_box - 1, 0);
            context2.lineTo(i * move_box - 1, 100);
            context2.moveTo(0, i * move_box - 1);
            context2.lineTo(100, i * move_box - 1);
        }
    } else if(key == 'i'){
        move_box = 100 / 5;
        move_x = move_box / 2;
        for (var i = 1; i < 5; i++) {
            context2.moveTo(i * move_box - 1 + move_x, 0 + move_x);
            context2.lineTo(i * move_box - 1 + move_x, 100 + move_x);
        }
    }else{
        for (var i = 1; i < 5; i++) {
            context2.moveTo(i * move_box + move_x - 1, 0);
            context2.lineTo(i * move_box + move_x - 1, 100);
            context2.moveTo(0 + move_x, i * move_box - 1);
            context2.lineTo(100 + move_x, i * move_box - 1);
        }
    }
    context2.stroke();
}


//holdを描画
function set_hold_block() {
    if (hold_block == null) return;
    del_block_field();
    hbox = 6;
    context2.beginPath();
    context2.clearRect(0, 0, hold_zone.width, hold_zone.height);


    for (i = 0; i < 12; i++) {

        for (n = 0; n < 12; n++) {
            if (hold_block.hold[i][n] === 1) {
                context2.beginPath();
                context2.fillStyle = color_dict[hold_block.color];
                context2.fillRect(n * hbox + 13, i * hbox + 13, hbox, hbox);
            }
        }

    }

    var key = hold_block.key;

    set_hold_line(key);


}

//canvasにnextlineを描画する
function set_next_line(key,index) {
    context3.beginPath();
    context3.strokeStyle = 'black';
    var key_box_x = 65;
    var key_box_y = 50;
    var move_box = key_box_x / 4;
    var move_x = move_box / 2;
    var move_y = key_box_y * index;

    if (key == 'o') {
        for (var i = 1; i < 5; i++) {
            context3.moveTo(i * move_box +1, 0 + move_y -3);
            context3.lineTo(i * move_box +1, key_box_x + move_y -3);
            context3.moveTo(0+1, i * move_box  + move_y -3);
            context3.lineTo(key_box_x+1, i * move_box  + move_y -3);
        }
    } else if(key == 'i'){
        move_box = key_box_x / 5;
        move_x = move_box / 2;
        for (var i = 1; i < 5; i++) {
            context3.moveTo(i * move_box  + move_x+1, 0 + move_x + move_y -3);
            context3.lineTo(i * move_box  + move_x+1, key_box_x + move_x + move_y -10);
        }
    }else{
        for (var i = 1; i < 5; i++) {
            context3.moveTo(i * move_box + move_x +1, 0 + move_y -3);
            context3.lineTo(i * move_box + move_x +1, key_box_x + move_y -3);
            context3.moveTo(0 + move_x+1, i * move_box  + move_y -3);
            context3.lineTo(key_box_x + move_x+1, i * move_box  + move_y -3);
        }
    }
    context3.stroke();
}

//next_zoneを描画
function set_next_block() {
    hbox = 4;
    context3.beginPath();
    context3.clearRect(0, 0, next_zone.width, next_zone.height);

    var list = get_next_block();
    for (block_i in list) {
        for (i = 0; i < 12; i++) {
            for (n = 0; n < 12; n++) {

                if (list[block_i].hold[i][n] === 1) {
                    context3.beginPath();
                    context3.fillStyle = color_dict[list[block_i].color];
                    context3.fillRect(n * hbox + 9, i * hbox + block_i * 50 + 6, hbox, hbox);
                    
                }
                
            }
        }
        
    }
    for (block_i in list) {
        key = list[block_i].key;
        set_next_line(key,block_i);
    }
}

//dot文字を表示(配列,x,y,zoom)
function set_dot(dot, d1, i, s) {
    //改行判定
    if (dot.length == 0) {
        return;
    }
    dot_box = box;
    dot_dot = dot_box / 7;
    context4.beginPath();

    context4.beginPath();
    for (i1 = 0; i1 < 7; i1++) {

        for (n1 = 0; n1 < 7; n1++) {
            if (dot[i1][n1] != 0) {

                fx = (i * dot_box) * style.p + (dot_dot * n1 * s.z);
                fy = (d1 * dot_box) + (dot_dot * i1 * s.z);
                fwh = dot_dot * s.z;
                color = color_dict[dot[i1][n1]];

                context4.fillStyle = get_rgba(color, 1, 2);
                context4.strokeRect(fx + s.c, fy, fwh, fwh);
                context4.fillRect(fx + s.c, fy, fwh, fwh);
            }
        }
    }
}

//ゴーストを取得描画
function get_ghost() {
    var ghost_y = 0;
    for (i = 0; i < h; i++) {
        if (isConnect(0, i)) {
            ghost_y = i;
            break;
        }

    }
    block_ghost = position.block[position.rotate];
    block_coord = block_ghost.b;
    context1.beginPath();
    context1.fillStyle = get_rgba(color_dict[position.block.color], 1, 0.4);
    for (k in block_coord) {
        b = block_coord[k];

        x = (b.x + position.x);
        y = (b.y + position.y) + ghost_y - 1;

        //元のblockと重なっていた場合表示しない
        if (field[y][x] == 1) {
            continue;
        }

        context1.fillRect(x * box, (y - 3) * box, box, box);
        context1.strokeRect(x * box, (y - 3) * box, box, box);
        context1.clearRect(x * box + 6, (y - 3) * box + 6, box - 12, box - 12);


    }
}



//canvasを初期化
function init_game() {
    context1.beginPath();
    context1.clearRect(0, 0, game.width, game.height);
}

function init_game_ui() {
    context4.beginPath();
    context4.clearRect(0, 0, game_ui.width, game_ui.height);
}
