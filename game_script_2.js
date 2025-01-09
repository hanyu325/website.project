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

    const letterImage = new Image();
    letterImage.src = 'letter.png';

    const sittinggirlImage = new Image();
    sittinggirlImage.src = 'girlsitting.png';

    const phoneImage = new Image();
    phoneImage.src = 'phone.png';

    const idcardImage = new Image();
    idcardImage.src = 'card.png';

    const ropeImage = new Image();
    ropeImage.src = 'rope.png';

    const badendImage = new Image();
    badendImage.src = 'bad_ending.png';


    // 圖片初始位置
    const catsit = { x: 475, y: 400, width: 55, height: 80, speed: 5 };
    const catleft = { x: 475, y: 400, width: 80, height: 65, speed: 5 };
    const catright = { x: 475, y: 400, width: 80, height: 65, speed: 5 };
    const catback = { x: 475, y: 400, width: 65, height: 70, speed: 5 };
    const catfront = { x: 475, y: 400, width: 55, height: 70, speed: 5 };

    const sittinggirl = { x: 350, y: 265, width: 90, height: 200, speed: 0 };
    const letter = { x: 440, y: 345, width: 60, height: 25, speed: 0 };
    const phone = { x: 510, y: 345, width: 40, height: 25, speed: 0 };
    const idcard = { x: 400, y: 500, width: 40, height: 20, speed: 0 };
    const rope = { x: 390, y: 45, width: 90, height: 190, speed: 0 };
    const badend = { x: 0, y: 0, width: 1000, height: 551, speed: 0};


    let direction = 0;  // 坐著: 0, 上: 1, 下: 2, 左: 3, 右: 4
    let timer = null;
    let timeRemaining = 25;  // 倒數計時時間

    startTimer();

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
        const progress = (timeRemaining / 25) * progressBarWidth;

        ctx.clearRect(10, 10, progressBarWidth, progressBarHeight); // 清除上次繪製的進度條
        ctx.fillStyle = "#e0e0e0";
        ctx.fillRect(10, 10, progressBarWidth, progressBarHeight); // 背景
        ctx.fillStyle = "#76c7c0";
        ctx.fillRect(10, 10, progress, progressBarHeight); // 進度
    }

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

    const phoneModal = document.getElementById('phoneModal');
    const phoneDisplay = document.getElementById('phoneDisplay');
    const phoneButtons = document.getElementById('phoneButtons');
    const phoneClear = document.getElementById('phoneClear');
    const closePhoneModal = document.getElementById('closePhoneModal');

    let phoneTriggered = false;

    // 生成 0-9 按鈕
    for (let i = 0; i <= 9; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.dataset.number = i;
        button.style.backgroundColor = '#000';
        button.style.color = '#ffffff';
        button.style.border = '2px solid #ffffff';
        button.style.padding = '10px';
        button.style.fontSize = '16px';
        button.style.cursor = 'pointer';
        button.style.textAlign = 'center';
        phoneButtons.appendChild(button);
        button.addEventListener('click', () => {
            phoneDisplay.value += button.dataset.number;
        });
    }

    // 清除電話號碼
    phoneClear.addEventListener('click', () => {
        phoneDisplay.value = '';
    });

    // 關閉電話視窗
    closePhoneModal.addEventListener('click', () => {
        phoneModal.style.display = 'none';
        phoneTriggered = false;
    });

    // 檢測玩家是否按下 Q 並靠近電話
    document.addEventListener('keydown', (e) => {
        if (e.key === 'q' && !phoneTriggered) {
            if (
                (phone.x - 50 <= catsit.x && catsit.x <= phone.x + phone.width + 50) &&
                (phone.y - 50 <= catsit.y && catsit.y <= phone.y + phone.height + 50)
            ) {
                phoneModal.style.display = 'block'; // 顯示電話視窗
                phoneTriggered = true;
            }
        }
    });

    // 清除電話號碼
    phoneClear.addEventListener('click', () => {
        phoneDisplay.value = '';
    });

    // 關閉電話視窗
    closePhoneModal.addEventListener('click', () => {
        phoneModal.style.display = 'none';
        phoneTriggered = false;
    });

    // 檢測玩家是否按下 Q 並靠近電話
    document.addEventListener('keydown', (e) => {
        if (e.key === 'q' && !phoneTriggered) {
            if (
                (phone.x - 50 <= catsit.x && catsit.x <= phone.x + phone.width + 50) &&
                (phone.y - 50 <= catsit.y && catsit.y <= phone.y + phone.height + 50)
            ) {
                phoneModal.style.display = 'block'; // 顯示電話視窗
                phoneTriggered = true;
            }
        }
    });

    // 新增 "撥出" 按鈕
    const dialButton = document.createElement('button');
    dialButton.textContent = 'call';
    dialButton.className = 'dialButton'; // 添加 class 方便樣式設置

    // 設定撥出功能
    dialButton.addEventListener('click', () => {
        const phoneNumber = phoneDisplay.value;
        const correctNumber = '1995'; // 預設正確號碼

        if (phoneNumber === correctNumber) {
            // 跳轉到另一個 HTML 頁面
            window.location.href = `happy_ending.html?number=${encodeURIComponent(phoneNumber)}`;
        }
    });

    // 將 "撥出" 按鈕添加到電話視窗
    phoneButtons.appendChild(dialButton); 

        // ID 卡功能
        const idcardModal = document.getElementById("idcardModal");
        const closeIdCard = document.getElementById("closeIdCard");
        let idcardTriggered = false;

        document.addEventListener('keydown', (e) => {
            if (e.key === 'q' && !idcardTriggered) {
                if (
                    (idcard.x - 70 <= catsit.x && catsit.x <= idcard.x + 70) &&
                    (idcard.y - 70 <= catsit.y && catsit.y <= idcard.y + 70)
                ) {
                    idcardModal.style.display = "block";
                    idcardTriggered = true;
                }
            }
        });

    closeIdCard.addEventListener('click', () => {
        idcardModal.style.display = "none";
        idcardTriggered = false;
    });

    const backgroundMusic = new Audio('music_1.mp3');
    backgroundMusic.loop = true; // 自動循環播放
    backgroundMusic.volume = 1; // 調整音量（0 到 1 之間）

    let musicStarted = true;
    function startMusic() {
        backgroundMusic.play();
    }

    // 更新貓咪位置
    function update() {
        if (keys['w'] && catsit.y > 0) {
            catsit.y -= catsit.speed;
            catleft.y -= catleft.speed;
            catright.y -= catright.speed;
            catback.y -= catback.speed;
            catfront.y -= catfront.speed;
            direction = 1;
        }
        if (keys['s'] && catsit.y + catsit.height < canvas.height) {
            catsit.y += catsit.speed;
            catleft.y += catleft.speed;
            catright.y += catright.speed;
            catback.y += catback.speed;
            catfront.y += catfront.speed;
            direction = 2;
        }
        if (keys['a'] && catsit.x > 0) {
            catsit.x -= catsit.speed;
            catleft.x -= catleft.speed;
            catright.x -= catright.speed;
            catback.x -= catback.speed;
            catfront.x -= catfront.speed;
            direction = 3;
        }
        if (keys['d'] && catsit.x + catsit.width < canvas.width) {
            catsit.x += catsit.speed;
            catleft.x += catleft.speed;
            catright.x += catright.speed;
            catback.x += catback.speed;
            catfront.x += catfront.speed;
            direction = 4;
        }
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

    let spill = 0;

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(letterImage, letter.x, letter.y, letter.width, letter.height);
        ctx.drawImage(sittinggirlImage, sittinggirl.x, sittinggirl.y, sittinggirl.width, sittinggirl.height);
        ctx.drawImage(phoneImage, phone.x, phone.y, phone.width, phone.height);
        ctx.drawImage(idcardImage, idcard.x, idcard.y, idcard.width, idcard.height);
        ctx.drawImage(ropeImage, rope.x, rope.y, rope.width, rope.height);

        if (direction == 0) {
            ctx.drawImage(catsitImage, catsit.x, catsit.y, catsit.width, catsit.height);
        }
        if (direction == 1) {
            ctx.drawImage(catbackImage, catback.x, catback.y, catback.width, catback.height);
        }
        if (direction == 2) {
            ctx.drawImage(catfrontImage, catfront.x, catfront.y, catfront.width, catfront.height);
        }
        if (direction == 3) {
            ctx.drawImage(catleftImage, catleft.x, catleft.y, catleft.width, catleft.height);
        }
        if (direction == 4) {
            ctx.drawImage(catrightImage, catright.x, catright.y, catright.width, catright.height);
        }

        direction = 0;
    }

    function gameLoop() {
        update();
        render();
        renderProgressBar();
        requestAnimationFrame(gameLoop);
        startMusic();
        if (timeRemaining === 0) {
            showGameOver();
        }
    }

    gameLoop();
}