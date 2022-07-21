<!DOCTYPE html>
<html id="html">

<head>
    <meta charset="utf-8" name="viewport" content="width=device-width,user-scalable=no">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./js/game.js"></script>
    <script src="./js/control.js"></script>
    <script src="./js/dot.js"></script>
    <script src="./js/draw.js"></script>
    <script src="./js/check.js"></script>
    <script src="./js/block.js"></script>
    <link rel="icon" href="/icon/favicon.ico" id="favicon">
    <link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-touch-icon-180x180.png">
    <link rel="stylesheet" type="text/css" href="./css/pc_game_style.css">
    <title>テトリス</title>
</head>


<body onload="load();">
    <table class="main_table">
        <tr>
            <td class="game_panel_class">
                <table id="hold_panel">
                    <tr>
                        <td>
                            <p class="line">HOLD</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <canvas id="hold_zone" width="100px" height="100px"></canvas>
                        </td>
                    </tr>
                </table>
                <div>
                    <canvas id="event_zone" width="140px" height="300px"></canvas>
                </div>

            </td>
            <td class="game_panel_class" id="game_panel">
                <canvas width="400px" height="800px"></canvas>
                <div>
                    <canvas id="game_base" width="400px" height="800px"></canvas>
                    <canvas id="game" width="400px" height="800px"></canvas>
                    <canvas id="game_effect" width="400px" height="800px"></canvas>
                    <canvas id="game_ui" width="400px" height="800px"></canvas>
                </div>
            </td>
            <td class="game_panel_class">
                <table id="next_panel">
                    <tr>
                        <td>
                            <p class="line">NEXT</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <canvas id="next_zone" width="65px" height="260px"></canvas>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p id="line"></p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p id="level"></p>
                        </td>
                    </tr>
                </table>
            </td>

        </tr>
    </table>


    <div id="cover"></div>
    <div id="modal">
        <span id="close" class="close-button">✕</span>
        <b>操作説明</b>
        <hr>
        <table>
            <tr>
                <td colspan="2">
                    <h3>PC</h3>
                </td>
            </tr>
            <tr>
                <td>
                    <p>左移動:A,←</p>
                </td>
                <td>
                    <p>右移動:D,→</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>左回転:Q,Z</p>
                </td>
                <td>
                    <p>右回転:E,X</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>ハードドロップ</p>
                </td>
                <td>
                    <p>:SPACE</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>ソフトドロップ</p>
                </td>
                <td>
                    <p>:S</p>
                </td>
            </tr>

            <tr>
                <td>
                    <p>ホールド</p>
                </td>
                <td>
                    <p>:SHIFT</p>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <h3>スマートフォン</h3>
                </td>
            </tr>
            <tr>
                <td>
                    <p>ゲームスタート</p>
                </td>
                <td>
                    <p>:画面中央のSTARTを押す</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>ゲーム終了</p>
                </td>
                <td>
                    <p>:画面中央のRESETを押す</p>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <p>各種操作</p>
                </td>
            </tr>

            <tr>
                <td colspan="2">
                    <p>画面下のコントローラーを操作</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>ソフトドロップ</p>
                </td>
                <td>
                    <p>:ドロップ長押し</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>ホールド</p>
                </td>
                <td>
                    <p>:ドロップを上フリック</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>ホールド</p>
                </td>
                <td>
                    <p>:ドロップを上フリック</p>
                </td>
            </tr>

        </table>


    </div>
    <div>
        <p id="endstart" class="btn-endstart" ></p>
    </div>

    <table class="game_button2" id="ctr_btn2">
        <tr>
            <td>
                <a id="start" class="btn btn--yellow btn--cubic">　開始　</a>
            </td>
            <td>
                <a id="end" class="btn btn--yellow btn--cubic">リセット</a>
            </td>
            <td>
                <a id="edit" class="btn btn--yellow btn--cubic">操作説明</a>
            </td>
        </tr>
    </table>

    <table class="game_button1" id="ctr_btn1" hidden>
        <tr>
            <td><button id="rotateL">左回転</button></td>
            <td><button id="rotateR">右回転</button></td>

        </tr>
        <tr>
            <td><button id="left">左移動</button></td>
            <td><button id="right">右移動</button></td>

        </tr>

        <tr>
            <td colspan="2"><button id="drop">ドロップ</button></td>
        </tr>
    </table>
</body>

</html>