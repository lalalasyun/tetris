
<!DOCTYPE html >
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
        <p>左移動:A ← 右移動:D →</p>
        <p>左回転:Q Z右回転:E X</p>
        <p>ハードドロップ:SPACE</p>
        <p>ソフトドロップ:S</p>
        <p>ホールド:SHIFT</p>
        
    </div>
    <table class="game_button1" id="ctr_btn" hidden>
        <tr>
            <td><button id="rotateL">左回転</button></td>
            <td><button></button></td>
            <td><button id="rotateR">右回転</button></td>
            
        </tr>
        <tr>
            <td><button id="left">左移動</button></td>
            <td><button></button></td>
            <td><button id="right">右移動</button></td>
            
        </tr>
        
        <tr>
            <td colspan="3"><button id="speedS">ソフトドロップ</button></td>
        </tr>
    </table>
    <table class="game_button2">
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

</body>

</html>