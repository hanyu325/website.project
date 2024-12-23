startGame();

function startGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const catImage = new Image();
    catImage.src = 'cat_walk.png';

    const catrevImage = new Image();
    catrevImage.src = 'cat_walk_rev.png';

    const coffeeImage = new Image();
    coffeeImage.src = 'coffee.png';

    const letterImage = new Image();
    letterImage.src = 'letter.png';

    const sittinggirlImage = new Image();
    sittinggirlImage.src = 'girlsitting.png';

    const cat = {
        x: 260,
        y: 400,
        width: 95,
        height: 70,
        speed: 5,
    };

    const catrev = {
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

    const coffee = {
        x: 300,
        y: 310,
        width: 40,
        height: 40,
        speed: 0,
    };

    const letter = {
        x: 250,
        y: 335,
        width: 60,
        height: 25,
        speed: 0,
    };

    let r = 0;

    // 監聽鍵盤輸入
    const keys = {};
    document.addEventListener('keydown', (e) => keys[e.key] = true);
    document.addEventListener('keyup', (e) => keys[e.key] = false);

    // 更新貓咪位置
    function update() {
        console.log(r);
        if (keys['w'] && cat.y > 0) {
            cat.y -= cat.speed; // 向上移動
            catrev.y -= catrev.speed;
        }
        if (keys['s'] && cat.y + cat.height < canvas.height) {
            cat.y += cat.speed; // 向下移動
            catrev.y += catrev.speed;
        }
        if (keys['a'] && cat.x > 0) {
            cat.x -= cat.speed; // 向左移動
            catrev.x -= catrev.speed;
            r = 0;
        }
        if (keys['d'] && cat.x + cat.width < canvas.width) {
            cat.x += cat.speed; // 向右移動
            catrev.x += catrev.speed;
            r = 1;
        }
    }

    // 渲染畫面
    function render() {
        console.log(r);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除畫布
        ctx.drawImage(letterImage, letter.x, letter.y, letter.width, letter.height);
        ctx.drawImage(coffeeImage, coffee.x, coffee.y, coffee.width, coffee.height);
        ctx.drawImage(sittinggirlImage, sittinggirl.x, sittinggirl.y, sittinggirl.width, sittinggirl.height);
        if (r == 1) {
            ctx.drawImage(catrevImage, catrev.x, catrev.y, catrev.width, catrev.height);
        }
        else {
            ctx.drawImage(catImage, cat.x, cat.y, cat.width, cat.height);
        }
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
