<?php
function is_mobile()
{
    $user_agent = $_SERVER['HTTP_USER_AGENT']; // HTTP ヘッダからユーザー エージェントの文字列を取り出す

    return preg_match('/iphone|ipod|ipad|android/ui', $user_agent) != 0; // 既知の判定用文字列を検索
}
?>

<!DOCTYPE html>
<html>

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
    <div id="game_main">
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
                    <div id="endstart_box">
                        <div class="start"></div>
                        <div class="option"></div>
                    </div>
                    <div id="pause_box" hidden>
                        <div class="restart"></div>
                        <div class="option"></div>
                        <div class="quit"></div>
                    </div>
                    <div id="end_box" hidden>
                        <div class="end"></div>
                        <div class="option"></div>
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
            <tr>
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
            </tr>
        </table>


        <div id="cover"></div>
        <div id="modal">
            <div id="close" class="close-button">×</div>
            <b>操作説明</b>
            <hr>
            <?php
            $pc = is_mobile() ? 'hidden' : '';
            $phone = is_mobile() ? '' : 'hidden';
            ?>
            <table <?= $pc ?>>
                <tr>
                    <td>
                        <p>ゲームスタート</p>
                    </td>
                    <td>
                        <p>：ENTER</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>ゲーム終了</p>
                    </td>
                    <td>
                        <p>：M</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>一時停止</p>
                    </td>
                    <td>
                        <p>：ESC</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>左移動：A ←</p>
                    </td>
                    <td>
                        <p>右移動：D →</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>左回転：Q Z</p>
                    </td>
                    <td>
                        <p>右回転：E X</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>ハードドロップ</p>
                    </td>
                    <td>
                        <p>：SPACE</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>ソフトドロップ</p>
                    </td>
                    <td>
                        <p>：S</p>
                    </td>
                </tr>

                <tr>
                    <td>
                        <p>ホールド</p>
                    </td>
                    <td>
                        <p>：SHIFT</p>
                    </td>
                </tr>

            </table>
            <table <?= $phone ?>>
                <tr>
                    <td>
                        <p>左回転</p>
                    </td>
                    <td>
                        <p>：画面の左端をタップ</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>右回転</p>
                    </td>
                    <td>
                        <p>：画面の右端をタップ</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>左移動</p>
                    </td>
                    <td>
                        <p>：左にスワイプ</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>右移動</p>
                    </td>
                    <td>
                        <p>：右にスワイプ</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>ソフトドロップ</p>
                    </td>
                    <td>
                        <p>：下にスワイプ</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>ホールド</p>
                    </td>
                    <td>
                        <p>：上フリック</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>ハードドロップ</p>
                    </td>
                    <td>
                        <p>：ダブルタップ</p>
                    </td>
                </tr>
            </table>


        </div>
    </div>

    


    <footer id="footer">
        <table class="game_button1" id="ctr_btn1" hidden>
            <tr>
                <td id="rotateL">
                    <div></div>
                </td>
                <td id="drop">
                    <div></div>
                </td>
                <td id="rotateR">
                    <div></div>
                </td>
            </tr>
        </table>
        <div id="openbtn1"class="openbtn1_block" hidden>
            <div class="openbtn1"><span></span><span></span><span></span>
        </div>
        
    </footer>
</body>

</html>