//最大で15文字(300 * 150)
//1文字(6*6)
//color 1: 'aqua', 2: 'yellow', 3: 'lime', 4: 'red', 
//5: 'blue', 6: 'orange', 7: 'purple'

//最初に数字入れると倍率を設定可能
//改行!+[行数]0 文字![文字名][色]
const temp_dot = {
    home: [
        '!+40',
        '{"z":2,"p":1.3}!+2!t4!e6!t2!r3!i1!s7!+1',
        '!+30',
        '{"c":-20}!+4!s1!t1!a1!r1!t1!+3',
        '!+10',
        '{"c":-20}!+4!e4!n4!t4!e4!r4'
    ],
    end: [
        '!+60',
        '{"z":1.3,"p":1}!+2!g4!a4!m4!e4!o4!v4!e4!r4',
    ],
    press_M: [
        '!+110',
        '!+4!r7!e7!s7!e7!t7',
        '!+10',
        '!+3!p5!r5!e5!s5!s5!+1!m5'
    ],
    ready: [
        '!+80',
        '{"z":2,"p":1.7,"c":12}!+2!r2!e2!a2!d2!y2'
    ],
    tetlis:
        '{"z":1.2,"p":1.1,"c":26}!+2!t2!e2!t2!l2!i2!s2'
    ,
    level:'!l2!e2!v2!e2!l2!+1!u2!p2'
    ,
    ren:'!r6!e6!n6'
    ,
    back:['!+10',
        '{"z":0.7,"p":0.5,"c":5}!b5!a5!c5!k5!t5!o5',
    '{"z":0.7,"p":0.5,"c":5}!b5!a5!c5!k5'],
    perfect:['!+30',
        '{"z":1.2,"p":1.1,"c":90}!p2!e2!r2!f2!e2!c2!t2',
        '{"z":2,"p":1.7,"c":140}!c2!l2!e2!a2!r2'
    ,
]
}
const spin_text = {
    ts:'{"z":1,"p":0.7,"c":7}!t7!s7!p7!i7!n7',
    s:'{"z":0.7,"p":0.55,"c":7}!s2!i2!n2!g2!l2!e2',
    d:'{"z":0.7,"p":0.55,"c":7}!d2!o2!u2!b2!l2!e2',
    t:'{"z":0.7,"p":0.55,"c":7}!t2!r2!i2!p2!l2!e2',
    m:'{"z":0.7,"p":0.5,"c":7}!m6!i6!n6!i6',
}
const spin = {
    ts:['!+20',spin_text.ts],
    tss:['!+20',spin_text.ts,spin_text.s],
    tsd:['!+20',spin_text.ts,spin_text.d],
    tst:['!+20',spin_text.ts,spin_text.t],
    tsm:['!+20',spin_text.ts,spin_text.m],
    tsms:['!+20',spin_text.ts,spin_text.m,spin_text.s],
    tsmd:['!+20',spin_text.ts,spin_text.m,spin_text.d],
}
//dot文字を取得
function set_dot(str,ctx) {
    if(ctx == null) ctx = context4;
    dot_list = changeDot(str);
    for (d1 in dot_list) {
        for (i = 0; i < dot_list[d1].length; i++) {
            style = dot_list[d1][i].style;
            set_dot_text(ctx,dot_list[d1][i].o, d1, i - style.p, style);
        }
    }
}

function set_levelup(){
    set_dot(['!+60','{"z":1,"p":1}!+2'+temp_dot.level]);
}

const set_tetris = list => {
    var add_new_line = '!+'+String(list[0] - 3)+0;

    set_str = [
        add_new_line,
        temp_dot.tetlis
    ]

    set_dot(set_str);
};

function set_perfect(){
    set_dot(temp_dot.perfect);
}

function set_tspin(key){
    if(key == null)return;
    set_dot(spin[key] ,context7);
}



function set_ren(){
    count_ary = String(ren_count)
    var count_str = '';
    for(i in count_ary){
        count_str += '!'+count_ary[i];
    }

    set_str = ['{"z":0.7,"p":0.7,"c":15}'+count_str+temp_dot.ren];
    set_dot(set_str,context7);
}

function set_backtoback(){
    if(backtoback_count < 2)return;
    set_dot(temp_dot.back,context7);
}

const json_temp = {z:1,p:1,c:0};
function get_json(json){
    input = JSON.parse(json);
    out = Object.assign({}, json_temp);
    
    for (key in input){
        out[key] = input[key];
    }
    return out;
}

function changeDot(s) {
    let str = s;
    let first_str = [];


    for (let i = 0; i < str.length; i++) {
        add_str = [];
        sp = str[i].split('!');

        for (n in sp) {
            if (n == 0) {
                if (sp[n][0] == null) {
                    add_str.push({ s: 'style', style: { z: 1, p: 1 ,c: 0} });
                } else {
                    style = get_json(sp[n]);
                    add_str.push({ s: 'style', style: style });
                }
                continue;
            }
            if (sp[n][0] == '+') {
                spase_cnt = parseInt(sp[n]);
                if (spase_cnt % 10 == 0) {
                    for (g = 0; g < spase_cnt / 10; g++) {
                        add_str.push({ s: 'shift', c: 0 });
                        first_str.push(add_str);
                    }
                    continue;
                }
                for (g = 0; g < spase_cnt; g++) {
                    add_str.push({ s: ' ', c: 0 });
                }
            } else {
                add_str.push({ s: sp[n][0], c: sp[n][1] });
            }
        }
        first_str.push(add_str);
    }

    let list = [];
    for (let i = 0; i < first_str.length; i++) {
        let all_output = [];
        var style;
        for (let j = 0; j < first_str[i].length; j++) {
            if (first_str[i][j].s == "0") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, c, 0, c, 0, 0], [0, 0, c, 0, c, 0, 0], [0, 0, c, 0, c, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
            } else if (first_str[i][j].s == "1") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, 0, c, c, 0, 0, 0], [0, 0, 0, c, 0, 0, 0], [0, 0, 0, c, 0, 0, 0], [0, 0, 0, c, 0, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
            } else if (first_str[i][j].s == "2") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, 0, 0, c, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, c, 0, 0, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
            } else if (first_str[i][j].s == "3") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, 0, 0, c, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, 0, 0, c, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
            } else if (first_str[i][j].s == "4") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, 0, c, 0, c, 0, 0], [0, 0, c, 0, c, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, 0, 0, c, 0, 0], [0, 0, 0, 0, c, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
            } else if (first_str[i][j].s == "5") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, c, 0, 0, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, 0, 0, c, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
            } else if (first_str[i][j].s == "6") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, c, 0, 0, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, c, 0, c, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
            } else if (first_str[i][j].s == "7") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, 0, 0, c, 0, 0], [0, 0, 0, 0, c, 0, 0], [0, 0, 0, 0, c, 0, 0], [0, 0, 0, 0, c, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
            } else if (first_str[i][j].s == "8") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, c, 0, c, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, c, 0, c, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
            } else if (first_str[i][j].s == "9") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, c, 0, c, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, 0, 0, c, 0, 0], [0, 0, 0, 0, c, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
            } else if (first_str[i][j].s == "A" || first_str[i][j].s == "a") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, 0, c, c, c, 0, 0], [0, c, 0, 0, 0, c, 0], [0, c, c, c, c, c, 0], [0, c, 0, 0, 0, c, 0], [0, c, 0, 0, 0, c, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "B" || first_str[i][j].s == "b") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, c, c, c, c, 0, 0], [0, c, 0, 0, 0, c, 0], [0, c, c, c, c, c, 0], [0, c, 0, 0, 0, c, 0], [0, c, c, c, c, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "C" || first_str[i][j].s == "c") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, 0, c, c, c, 0, 0], [0, c, 0, 0, 0, c, 0], [0, c, 0, 0, 0, 0, 0], [0, c, 0, 0, 0, c, 0], [0, 0, c, c, c, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "D" || first_str[i][j].s == "d") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, c, c, c, c, 0, 0], [0, c, 0, 0, 0, c, 0], [0, c, 0, 0, 0, c, 0], [0, c, 0, 0, 0, c, 0], [0, c, c, c, c, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "E" || first_str[i][j].s == "e") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, c, c, c, c, c, 0], [0, c, 0, 0, 0, 0, 0], [0, c, c, c, c, 0, 0], [0, c, 0, 0, 0, 0, 0], [0, c, c, c, c, c, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "F" || first_str[i][j].s == "f") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, c, c, c, c, c, 0], [0, c, 0, 0, 0, 0, 0], [0, c, c, c, c, 0, 0], [0, c, 0, 0, 0, 0, 0], [0, c, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "G" || first_str[i][j].s == "g") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, 0, c, c, c, c, 0], [0, c, 0, 0, 0, 0, 0], [0, c, 0, c, c, c, 0], [0, c, 0, 0, 0, c, 0], [0, 0, c, c, c, c, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "H" || first_str[i][j].s == "h") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, c, 0, 0, 0, c, 0], [0, c, 0, 0, 0, c, 0], [0, c, c, c, c, c, 0], [0, c, 0, 0, 0, c, 0], [0, c, 0, 0, 0, c, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "I" || first_str[i][j].s == "i") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, 0, c, 0, 0, 0], [0, 0, 0, c, 0, 0, 0], [0, 0, 0, c, 0, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "J" || first_str[i][j].s == "j") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, 0, c, c, c, c, 0], [0, 0, 0, 0, c, 0, 0], [0, 0, 0, 0, c, 0, 0], [0, c, 0, 0, c, 0, 0], [0, 0, c, c, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "K" || first_str[i][j].s == "k") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, c, 0, 0, c, c, 0], [0, c, 0, c, c, 0, 0], [0, c, c, c, 0, 0, 0], [0, c, 0, c, c, 0, 0], [0, c, 0, 0, c, c, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "L" || first_str[i][j].s == "l") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, c, 0, 0, 0, 0, 0], [0, c, 0, 0, 0, 0, 0], [0, c, 0, 0, 0, 0, 0], [0, c, 0, 0, 0, 0, 0], [0, c, c, c, c, c, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "M" || first_str[i][j].s == "m") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, c, 0, 0, 0, c, 0], [0, c, c, 0, c, c, 0], [0, c, 0, c, 0, c, 0], [0, c, 0, 0, 0, c, 0], [0, c, 0, 0, 0, c, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "N" || first_str[i][j].s == "n") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, c, 0, 0, 0, c, 0], [0, c, c, 0, 0, c, 0], [0, c, 0, c, 0, c, 0], [0, c, 0, 0, c, c, 0], [0, c, 0, 0, 0, c, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "O" || first_str[i][j].s == "o") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, 0, c, c, c, 0, 0], [0, c, 0, 0, 0, c, 0], [0, c, 0, 0, 0, c, 0], [0, c, 0, 0, 0, c, 0], [0, 0, c, c, c, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "P" || first_str[i][j].s == "p") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, c, c, c, c, c, 0], [0, c, 0, 0, 0, c, 0], [0, c, c, c, c, c, 0], [0, c, 0, 0, 0, 0, 0], [0, c, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "Q" || first_str[i][j].s == "q") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, 0, c, c, c, 0, 0], [0, c, 0, 0, 0, c, 0], [0, c, 0, 0, 0, c, 0], [0, c, 0, 0, c, c, 0], [0, 0, c, c, c, c, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "R" || first_str[i][j].s == "r") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, c, c, c, c, c, 0], [0, c, 0, 0, 0, c, 0], [0, c, c, c, c, c, 0], [0, c, 0, 0, c, 0, 0], [0, c, 0, 0, 0, c, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "S" || first_str[i][j].s == "s") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, 0, c, c, c, c, 0], [0, c, 0, 0, 0, 0, 0], [0, 0, c, c, c, 0, 0], [0, 0, 0, 0, 0, c, 0], [0, c, c, c, c, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "T" || first_str[i][j].s == "t") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, c, c, c, c, c, 0], [0, 0, 0, c, 0, 0, 0], [0, 0, 0, c, 0, 0, 0], [0, 0, 0, c, 0, 0, 0], [0, 0, 0, c, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "U" || first_str[i][j].s == "u") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, c, 0, 0, 0, c, 0], [0, c, 0, 0, 0, c, 0], [0, c, 0, 0, 0, c, 0], [0, c, 0, 0, 0, c, 0], [0, 0, c, c, c, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "V" || first_str[i][j].s == "v") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, c, 0, 0, 0, c, 0], [0, c, 0, 0, 0, c, 0], [0, c, 0, 0, 0, c, 0], [0, 0, c, 0, c, 0, 0], [0, 0, 0, c, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "W" || first_str[i][j].s == "w") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, c, 0, 0, 0, c, 0], [0, c, 0, c, 0, c, 0], [0, c, 0, c, 0, c, 0], [0, c, c, c, c, c, 0], [0, 0, c, 0, c, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "X" || first_str[i][j].s == "x") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, c, 0, 0, 0, c, 0], [0, 0, c, 0, c, 0, 0], [0, 0, 0, c, 0, 0, 0], [0, 0, c, 0, c, 0, 0], [0, c, 0, 0, 0, c, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "Y" || first_str[i][j].s == "y") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, c, 0, 0, 0, c, 0], [0, 0, c, 0, c, 0, 0], [0, 0, c, 0, c, 0, 0], [0, 0, 0, c, 0, 0, 0], [0, 0, 0, c, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "Z" || first_str[i][j].s == "z") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, c, c, c, c, c, 0], [0, 0, 0, 0, c, 0, 0], [0, 0, 0, c, 0, 0, 0], [0, 0, c, 0, 0, 0, 0], [0, c, c, c, c, c, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == " ") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == ".") {
                c = first_str[i][j].c;
                output = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, c, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
            } else if (first_str[i][j].s == "shift") {
                output = [];
            } else if (first_str[i][j].s == "style") {
                style = first_str[i][j].style;
                continue;
            }
            all_output.push({ o: output, style: style });

        }
        list.push(all_output)
    }
    return list;
}



//色名をRGBAに変換する(色名,彩度,明度,透過度)
function get_rgba(color, alpha, brightness) {
    context1.fillStyle = color;
    var code = context1.fillStyle;
    var red = parseInt(code.substring(1, 3), 16);
    var green = parseInt(code.substring(3, 5), 16);
    var blue = parseInt(code.substring(5, 7), 16);


    
    if (brightness != null && brightness != 1) {
        brightness = get_limit_rgba(red, green, blue, brightness)
        //明度
        red *= brightness;
        green *= brightness;
        blue *= brightness;
    }
    return get_rgba_str(red, green, blue, alpha);

}

function get_limit_rgba(r, g, b, x) {
    ret1 = r * x > 255;
    ret2 = b * x > 255;
    ret3 = g * x > 255;
    if (ret1 || ret2 || ret3) {
        if (r > g && r > b) {
            x = 255 / r
        }
        if (g > r && g > b) {
            x = 255 / g
        }
        if (b > r && b > g) {
            x = 255 / b
        }
    }
    return x;
}

function get_rgba_str(r, g, b, a) {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}