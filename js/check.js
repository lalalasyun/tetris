//面の接続を調べる(移動量x,移動量y,回転率)
function isConnect(mx, my, r) {
    if (r == null) r = position.rotate;
    block_coord = position.block[r].b;
    var ret = false;

    for (k in block_coord) {
        b = block_coord[k];

        x = (b.x + position.x);
        y = (b.y + position.y);
        if (x + mx > -1 && x + mx < w && y + my > -1 && y + my < h) {
            if (defin_field[y + my][x + mx] != 0) {
                return true;
            }
        } else {
            ret = true;
        }
    }
    return ret;
}

//回転時の補正値
//Super Rotation System
const rotate_key = { 0: 'A', 90: 'B', 180: 'C', 270: 'D' };
const srs_1 = {
    A: {
        D: {
            shift: [{ x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: 2 }, { x: 1, y: 2 }]
        },
        B: {
            shift: [{ x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 1 }]
        }
    },
    B: {
        A: {
            shift: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: -2 }, { x: 1, y: -2 }]
        },
        C: {
            shift: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: -2 }, { x: 1, y: -2 }]
        }
    },
    C: {
        B: {
            shift: [{ x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: 2 }, { x: -1, y: 2 }]
        },
        D: {
            shift: [{ x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: 2 }, { x: 1, y: 2 }]
        }
    },
    D: {
        C: {
            shift: [{ x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: 2 }, { x: -1, y: 2 }]
        },
        A: {
            shift: [{ x: -2, y: 0 }, { x: -2, y: 1 }, { x: 0, y: -2 }, { x: -1, y: -2 }]
        }
    }

};
const srs_2 = {
    A: {
        D: {
            shift: [{ x: -1, y: 0 }, { x: 2, y: 0 }, { x: -1, y: 2 }, { x: 2, y: -1 }]
        },
        B: {
            shift: [{ x: -2, y: 0 }, { x: 1, y: 0 }, { x: -2, y: 1 }, { x: 1, y: -2 }]
        }
    },
    B: {
        A: {
            shift: [{ x: 2, y: 0 }, { x: -1, y: 0 }, { x: 2, y: -1 }, { x: -1, y: 2 }]
        },
        C: {
            shift: [{ x: -1, y: 0 }, { x: 2, y: 0 }, { x: -1, y: -2 }, { x: 2, y: 1 }]
        }
    },
    C: {
        B: {
            shift: [{ x: 1, y: 0 }, { x: -2, y: 0 }, { x: 1, y: 2 }, { x: -2, y: -1 }]
        },
        D: {
            shift: [{ x: 2, y: 0 }, { x: -1, y: 0 }, { x: 2, y: -1 }, { x: -1, y: 2 }]
        }
    },
    D: {
        C: {
            shift: [{ x: 1, y: 0 }, { x: -2, y: 0 }, { x: -2, y: 1 }, { x: 1, y: -2 }]
        },
        A: {
            shift: [{ x: -2, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: -2, y: -1 }]
        }
    }

};
//回転した方向(角度1,角度2)
function super_rotation(rotate1, rotate2) {

    if (!isConnect(0, 0, rotate2)) return { x: 0, y: 0 };
    var s;

    if(position.block.key == 'i'){
        s = srs_2[rotate_key[rotate1]][rotate_key[rotate2]].shift;
    }else{
        s = srs_1[rotate_key[rotate1]][rotate_key[rotate2]].shift;
    }

    for (i in s) {
        if (!isConnect(s[i].x, s[i].y, rotate2)) {

            return { x: s[i].x, y: s[i].y };
        }
    }

    return null;
}

//tspinの判定
const shift_corner = [{x:0,y:0},{x:2,y:0},{x:0,y:2},{x:2,y:2}];
const shift_convex = [{x:1,y:0},{x:0,y:1},{x:1,y:2},{x:2,y:1}]
const ts_key = ['ts','tss','tsd','tst'];
const tsm_key = ['tsm','tsms','tsmd'];
function check_tspin(cnt,d){
    if(position.block.key != 't' || d == null) return null;
    var corner_cnt = 0;
    for(i in shift_corner){
        x = position.x + shift_corner[i].x;
        y = position.y + shift_corner[i].y;
        if(x > -1 && x < 10 && y > -1 && y < 23){
            if(defin_field[y][x] != 0){
                corner_cnt++;
            }
        }else{
            corner_cnt++;
        }
    }
    
   
    if(corner_cnt < 3){
        return null;
    }

    //tspin miniかどうか
    //1T-Spinの条件を満たしていること。
    //2ミノ固定時のＴミノ４隅のうち、凸側の1つが空いていること。
    //3SRSのにおける回転補正の４番目（回転軸移動が(±1,±2)）でないこと
    var convex_count = 0;
    if(!(d.x == 1 && d.y == 2)){

        for(i in shift_convex){
            x = position.x + shift_corner[i].x;
            y = position.y + shift_corner[i].y;
            if(x > -1 && x < 10 && y > -1 && y < 23){
                if(defin_field[y][x] != 0){
                    convex_count++;
                }
            }
        }
        if(convex_count < 3) return tsm_key[cnt];
            

    }

   
    return ts_key[cnt];


    
}

//揃った列を調べる
function check_line() {
    var list = [];
    for (i = 0; i < h; i++) {
        isCheck = false;
        for (n = 0; n < w; n++) {
            if (defin_field[i][n] == 0){
                isCheck = true;
                break;
            }
                
        }
        if (!isCheck) {
            list.push(i);
        } 
    }
    return list;
}

//10lineの達成を調べる
var line10_count = 10;
function isLine10(cnt) {
    if (cnt >= line10_count) {
        line10_count += 10;
        return true;
    }
    return false;
}

//perfectを調べる
function isPerfect(){
    for(i in defin_field){
        for(n in defin_field[i]){
            if(defin_field[i][n] != 0){
                return false;
            }
        }
    }
    return true;
}



//ロックダウンモード
var move_cnt = 0;
var lockdown_cnt = 0;
var lockdown_hight = 0;
var lockdown_id;
function lockdown_mode(isKeyEvent) {
    //下キー入力の場合lockdown終了
    if (isKeyEvent) {
        move_cnt = 16;
        lockdown_timer();
        return;
    }

    //0.5秒置きに入力があるか調べる
    if (lockdown_id == null) {
        lockdown_cnt = 0;
        move_cnt = 0;
        

        lockdown_hight = coord.y;

        lockdown_id = setInterval(lockdown_timer, 500);
    }

}

//入力がなければ次のblockを降らす
const lockdown_timer = function () {
    if (lockdown_cnt == 0 || move_cnt > 15) {

        clearInterval(lockdown_id);
        clearInterval(IntervalId);
        lockdown_id = null;
        //接続を調べる
        if (isConnect(0, 1)) {
            if(!definition_block()){
                init_game();
                get_next();
                set_block_field();
            }
            
        } else {
            if(lockdown_hight < coord.y){
                move_cnt = 0;
            }else{
                //ロックダウンモードの継続
                lockdown_id = setInterval(lockdown_timer, 500);
            }
            IntervalId = setInterval(fall_block, get_fall_time());
            fall_block();
        }
        move_cnt = 0;
    }
    move_cnt += lockdown_cnt;

    lockdown_cnt = 0;

}