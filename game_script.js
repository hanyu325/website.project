startGame();

function startGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // 音樂的部分
    const backgroundMusic = new Audio('music_1.mp3');
    backgroundMusic.loop = true; // 自動循環播放
    backgroundMusic.volume = 1; // 調整音量（0 到 1 之間）

    let musicStarted = true;
    function startMusic() {
        backgroundMusic.play();
    }

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

    const standinggirlImage = new Image();
    standinggirlImage.src = 'girlstanding.png';

    const ropeImage = new Image();
    ropeImage.src = 'rope.png';

    const badendImage = new Image();
    badendImage.src = 'bad_ending.png';

    // 圖片初始位置 (btw. 我調這個調了很久)
    const catsit = { x: 475, y: 400, width: 55, height: 80, speed: 5 };
    const catleft = { x: 475, y: 400, width: 80, height: 65, speed: 5 };
    const catright = { x: 475, y: 400, width: 80, height: 65, speed: 5 };
    const catback = { x: 475, y: 400, width: 65, height: 70, speed: 5 };
    const catfront = { x: 475, y: 400, width: 55, height: 70, speed: 5 };

    const sittinggirl = { x: 350, y: 265, width: 90, height: 200, speed: 0 };
    const standinggirl = { x: 355, y: 170, width: 80, height: 235, speed: 0 };
    const coffee = { x: 500, y: 320, width: 40, height: 40, speed: 0 };
    const coffeespill = { x: 460, y: 320, width: 40, height: 40, speed: 0 };
    const letter = { x: 440, y: 345, width: 60, height: 25, speed: 0 };
    const rope = { x: 390, y: 45, width: 90, height: 190, speed: 0 };
    const badend = { x: 0, y: 0, width: 1000, height: 551, speed: 0};

    let direction = 0;  // 坐著: 0, 上: 1, 下: 2, 左:3, 右: 4
    let timer = null;
    let timeRemaining = 8;  // 倒數計時時間

    function startTimer() {
        timer = setInterval(() => {
            timeRemaining--;
            renderProgressBar();

            if (timeRemaining <= 0) {
                clearInterval(timer);
            }
        }, 1000);
    }

    function renderProgressBar() {
        const progressBarWidth = 200;
        const progressBarHeight = 20;
        const progress = (timeRemaining / 8) * progressBarWidth;

        ctx.clearRect(10, 10, progressBarWidth, progressBarHeight); // 清除上次繪製的進度條
        ctx.fillStyle = "#e0e0e0";
        ctx.fillRect(10, 10, progressBarWidth, progressBarHeight); // 背景
        ctx.fillStyle = "#76c7c0";
        ctx.fillRect(10, 10, progress, progressBarHeight); // 進度
    }

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

    // 多段對話內容
    const dialogs = [
        "How should I write this…? I want them to know that I’m not complaining; I’m just tired… really, really tired.",
        "...",
        "I’ve tried everything, but each time it feels like falling into a deeper black hole… There’s no way out. There’s truly no hope.",
        "...",
        "Why did things turn out this way? I tried, but no one cared… Maybe leaving is my only relief.",
        "…So this is the end, isn’t it? No one will miss me… Maybe that’s how it should be. The world doesn’t need someone as useless as me.",
        "If there’s a next life, I hope I can live more freely… but for now, I just can’t."
    ];

    let dialogIndex = 0; // 當前對話的索引
    let dialogTriggered = false; // 是否觸發對話框
    let allDialogsCompleted = false; // 確保所有對話結束後不再觸發

    const dialogBox = document.getElementById("dialogBox"); // 對話框元素
    const dialogText = document.getElementById("dialogText"); // 顯示對話的文字內容

    document.addEventListener('keydown', (e) => {
        if (e.key === 'q') {
            // 確保所有對話結束後不再觸發對話框
            if (allDialogsCompleted) return;
    
            // 檢查貓咪是否靠近 girl
            if (
                (sittinggirl.x - 50 <= catsit.x && catsit.x <= sittinggirl.x + sittinggirl.width + 50) &&
                (sittinggirl.y - 50 <= catsit.y && catsit.y <= sittinggirl.y + sittinggirl.height + 50)
            ) {
                if (!dialogTriggered) {
                    // 顯示對話框並顯示第一段對話
                    dialogBox.style.display = "block";
                    dialogText.textContent = dialogs[dialogIndex];
                    dialogTriggered = true;
                } else {
                    // 切換到下一段對話
                    dialogIndex++;
                    if (dialogIndex < dialogs.length) {
                        dialogText.textContent = dialogs[dialogIndex];
                    } else {
                        // 隱藏對話框並記錄所有對話完成
                        dialogBox.style.display = "none";
                        dialogTriggered = false;
                        allDialogsCompleted = true; // 設置對話完成狀態
                        startTimer(); // 開始倒數計時
                    }
                }
            }
        }
    });

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
        console.log(allDialogsCompleted);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除畫布
        ctx.drawImage(letterImage, letter.x, letter.y, letter.width, letter.height);
        ctx.drawImage(ropeImage, rope.x, rope.y, rope.width, rope.height);
        
        // 如果對話結束，換成站著的圖片
        if (allDialogsCompleted === true) {
            ctx.drawImage(standinggirlImage, standinggirl.x, standinggirl.y, standinggirl.width, standinggirl.height);
        }
        else {
            ctx.drawImage(sittinggirlImage, sittinggirl.x, sittinggirl.y, sittinggirl.width, sittinggirl.height);
        }
        // 畫咖啡
        if (allDialogsCompleted && keys['q'] && (coffee.x - 50 <= catsit.x && catsit.x <= coffee.x + 50) && (coffee.y - 50 <= catsit.y && catsit.y <= coffee.y + 50)) {
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

    function showGameOver() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(badendImage, badend.x, badend.y, badend.width, badend.height);
        ctx.strokeStyle = "#6e6454";
        ctx.lineWidth = 10;
        ctx.fillStyle = "#dcc9a9";
        ctx.font = "80px 'Press Start 2P'";
        ctx.textAlign = "center";
        ctx.strokeText("Game Over", canvas.width / 2, canvas.height / 2);
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    }

    // 遊戲主迴圈
    function gameLoop() {
        update();   // 更新貓咪位置
        render();   // 畫畫 :)
        renderProgressBar();
        startMusic();

        // 如果咖啡未打翻，繼續gameloop()
        if (spill === 1) {
            clearInterval(timer);
            setTimeout(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.strokeStyle = "#6e6454";
                ctx.lineWidth = 10;
                ctx.fillStyle = "#dcc9a9";
                ctx.font = "80px 'Press Start 2P'";
                ctx.textAlign = "center";
                ctx.strokeText("Next Level", canvas.width / 2, canvas.height / 2);
                ctx.fillText("Next Level", canvas.width / 2, canvas.height / 2);
                setTimeout(() => window.location.href = 'game2.html', 2000);
            }, 1000);
        } 
        else if (timeRemaining > 0) {
            requestAnimationFrame(gameLoop);
        }
        else {
            showGameOver();
        }
    }

    gameLoop();
}