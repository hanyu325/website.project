startGame();

function startGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // 載入圖片
    const catsitImage = new Image();
    catsitImage.src = 'cat_sit.png';

    const catleftImage = new Image();
    catleftImage.src = 'cat_walk.png';

    const catrightImage = new Image();
    catrightImage.src = 'cat_walk_rev.png';

    const catbackImage = new Image();
    catbackImage.src = 'cat_back.png';

    const catfrontImage = new Image();
    catfrontImage.src = 'cat_front.png';

    const coffeeImage = new Image();
    coffeeImage.src = 'coffee.png';

    const coffeespillImage = new Image();
    coffeespillImage.src = 'spilled_coffee.png';

    const letterImage = new Image();
    letterImage.src = 'letter.png';

    const sittinggirlImage = new Image();
    sittinggirlImage.src = 'girlsitting.png';

    
    // 圖片初始位置 (btw. 我調這個調了很久)
    const catsit = { x: 475, y: 400, width: 55, height: 80, speed: 5 };
    const catleft = { x: 475, y: 400, width: 80, height: 65, speed: 5 };
    const catright = { x: 475, y: 400, width: 80, height: 65, speed: 5 };
    const catback = { x: 475, y: 400, width: 65, height: 70, speed: 5 };
    const catfront = { x: 475, y: 400, width: 55, height: 70, speed: 5 };

    const sittinggirl = { x: 350, y: 265, width: 90, height: 200, speed: 0 };
    const coffee = { x: 500, y: 320, width: 40, height: 40, speed: 0 };
    const coffeespill = { x: 460, y: 320, width: 40, height: 40, speed: 0 };
    const letter = { x: 440, y: 345, width: 60, height: 25, speed: 0 };

    let direction = 0;  // 坐著: 0, 上: 1, 下: 2, 左:3, 右: 4

    // 監聽鍵盤輸入
    const keys = {};
    document.addEventListener('keydown', (e) => keys[e.key] = true);
    document.addEventListener('keyup', (e) => keys[e.key] = false);
    
    // 獲取元素
    const modal = document.getElementById("myModal");
    const openModal = document.getElementById("openModal");
    const closeModal = document.querySelector(".close");

    // 點擊按鈕顯示模態框
    openModal.onclick = function () {
        modal.style.display = "flex";
    };

    // 點擊關閉按鈕隱藏模態框
    closeModal.onclick = function () {
        modal.style.display = "none";
    };

    // 點擊模態框外部隱藏模態框
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
    
    // 更新貓咪位置
    function update() {
        console.log(direction);
        if (keys['w'] && catsit.y > 0) {
            catsit.y -= catsit.speed; // 向上移動
            catleft.y -= catleft.speed;
            catright.y -= catright.speed;
            catback.y -= catback.speed;
            catfront.y -= catfront.speed;
            direction = 1;
        }
        if (keys['s'] && catsit.y + catsit.height < canvas.height) {
            catsit.y += catsit.speed; // 向下移動
            catleft.y += catleft.speed;
            catright.y += catright.speed;
            catback.y += catback.speed;
            catfront.y += catfront.speed;
            direction = 2;
        }
        if (keys['a'] && catsit.x > 0) {
            catsit.x -= catsit.speed; // 向左移動
            catleft.x -= catleft.speed;
            catright.x -= catright.speed;
            catback.x -= catback.speed;
            catfront.x -= catfront.speed;
            direction = 3;  // 貓咪朝左
        }
        if (keys['d'] && catsit.x + catsit.width < canvas.width) {
            catsit.x += catsit.speed; // 向左移動
            catleft.x += catleft.speed;
            catright.x += catright.speed;
            catback.x += catback.speed;
            catfront.x += catfront.speed;
            direction = 4;  // 貓咪朝右
        }
    }

    let spill = 0;  // 判斷咖啡倒了沒的變數

    // 真正畫在網頁上面是這個 function，每幀每幀的畫 :)
    // 因為用了console.log，去看console的話會很精彩 XD
    function render() {
        console.log(direction);
        console.log(spill);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除畫布
        ctx.drawImage(letterImage, letter.x, letter.y, letter.width, letter.height);
        ctx.drawImage(sittinggirlImage, sittinggirl.x, sittinggirl.y, sittinggirl.width, sittinggirl.height);

        // 畫咖啡
        if (keys['q'] && (coffee.x - 50 <= catsit.x && catsit.x <= coffee.x + 50) && (coffee.y - 50 <= catsit.y && catsit.y <= coffee.y + 50)) {
            spill = 1;
        }
        if (spill == 1) {
            ctx.drawImage(coffeespillImage, coffeespill.x, coffeespill.y, coffeespill.width, coffeespill.height);
        }
        else {
            ctx.drawImage(coffeeImage, coffee.x, coffee.y, coffee.width, coffee.height);
        }

        // 畫貓
        if (direction == 0) {   // 坐著
            ctx.drawImage(catsitImage, catsit.x, catsit.y, catsit.width, catsit.height);
        }
        if (direction == 1) {   // 上
            ctx.drawImage(catbackImage, catback.x, catback.y, catback.width, catback.height);
        }
        if (direction == 2) {   // 下
            ctx.drawImage(catfrontImage, catfront.x, catfront.y, catfront.width, catfront.height);
        }
        if (direction == 3) {   // 左
            ctx.drawImage(catleftImage, catleft.x, catleft.y, catleft.width, catleft.height);
        }
        if (direction == 4) {   // 右
            ctx.drawImage(catrightImage, catright.x, catright.y, catright.width, catright.height);
        }

        direction = 0;
    }

    // 遊戲主迴圈
    function gameLoop() {
        update();   // 更新貓咪位置
        render();   // 畫畫 :)
        requestAnimationFrame(gameLoop); // 下一幀呼叫
        console.log(spill);
    }

    gameLoop();
}

function endGame() {
    // 還在想
}
