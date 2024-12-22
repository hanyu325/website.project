startGame();

function startGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const catImage = new Image();
    catImage.src = 'cat_walk.png';

    const sittinggirlImage = new Image();
    sittinggirlImage.src = 'girlsitting.png';

    const cat = {
        x: 260,
        y: 400,
        width: 95,
        height: 70,
        speed: 5,
    };

    const sittinggirl = {
        x: 170,
        y: 255,
        width: 90,
        height: 200,
        speed: 0,
    };

    // 監聽鍵盤輸入
    const keys = {};
    document.addEventListener('keydown', (e) => keys[e.key] = true);
    document.addEventListener('keyup', (e) => keys[e.key] = false);

    // 更新貓咪位置
    function update() {
        if (keys['w'] && cat.y > 0) cat.y -= cat.speed; // 向上移動
        if (keys['s'] && cat.y + cat.height < canvas.height) cat.y += cat.speed; // 向下移動
        if (keys['a'] && cat.x > 0) cat.x -= cat.speed; // 向左移動
        if (keys['d'] && cat.x + cat.width < canvas.width) cat.x += cat.speed; // 向右移動
    }

    // 渲染畫面
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除畫布
        ctx.drawImage(sittinggirlImage, sittinggirl.x, sittinggirl.y, sittinggirl.width, sittinggirl.height);
        ctx.drawImage(catImage, cat.x, cat.y, cat.width, cat.height); // 繪製貓咪
    }

    // 遊戲主迴圈
    function gameLoop() {
        update(); // 更新邏輯
        render(); // 渲染畫面
        requestAnimationFrame(gameLoop); // 下一幀呼叫
    }

    // 確保圖片載入後開始遊戲
    catImage.onload = () => {
        gameLoop();
    };
}
