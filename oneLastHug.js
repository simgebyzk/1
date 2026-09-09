/* =================================
       ONE LAST HUG - CATCH GAME
================================= */

let hugStarted = false;
let hugTouches = 0;

const hugMessages = [
    "Almosttt, YUUU",
    "Catch me if you can",
    "Catchh meee",
    "One more timee... 💕"
];


/* =================================
            POSITIONS
================================= */

let hugPlayerX = 0;
let hugPlayerY = 0;

let hugYuX = 0;
let hugYuY = 0;

let hugYuVelocityX = 3.2;
let hugYuVelocityY = 2.5;


/* =================================
         KEYBOARD MOVEMENT
================================= */

let hugMoveLeft = false;
let hugMoveRight = false;
let hugMoveUp = false;
let hugMoveDown = false;

const hugPlayerSpeed = 10;


/* =================================
           TOUCH MOVEMENT
================================= */

let hugTouchActive = false;


/* =================================
           START GAME
================================= */

function startHugGame() {

    if (hugStarted) return;

    const player = document.getElementById("hugYou");
    const yu = document.getElementById("hugYu");

    if (!player || !yu) return;

    hugStarted = true;
    hugTouches = 0;

    hugPlayerX = window.innerWidth * 0.15;
    hugPlayerY = window.innerHeight * 0.72;

    hugYuX = window.innerWidth * 0.75;
    hugYuY = window.innerHeight * 0.35;

    hugYuVelocityX = 3.2;
    hugYuVelocityY = 2.5;

    player.style.transition = "none";

    player.style.left = hugPlayerX + "px";
    player.style.top = hugPlayerY + "px";

    player.style.right = "auto";
    player.style.bottom = "auto";

    yu.style.transition = "none";

    yu.style.left = hugYuX + "px";
    yu.style.top = hugYuY + "px";

    yu.style.right = "auto";
    yu.style.bottom = "auto";
}


/* =================================
          UPDATE HUG GAME
================================= */

function updateHugGame() {

    /*
    scene7 HTML'deki yedinci sahne.

    JavaScript'te sahneler 0'dan
    başladığı için currentScene = 6.
    */

    if (currentScene !== 6) return;


    startHugGame();


    const player = document.getElementById("hugYou");
    const yu = document.getElementById("hugYu");

    if (!player || !yu) return;


    /* =========================
         PLAYER MOVEMENT
    ========================= */

    if (!hugTouchActive) {

        if (hugMoveLeft) {
            hugPlayerX -= hugPlayerSpeed;
        }

        if (hugMoveRight) {
            hugPlayerX += hugPlayerSpeed;
        }

        if (hugMoveUp) {
            hugPlayerY -= hugPlayerSpeed;
        }

        if (hugMoveDown) {
            hugPlayerY += hugPlayerSpeed;
        }
    }


    /* Ekran dışına çıkmasın */

    hugPlayerX = Math.max(
        0,
        Math.min(
            window.innerWidth - player.offsetWidth,
            hugPlayerX
        )
    );


    hugPlayerY = Math.max(
        145,
        Math.min(
            window.innerHeight - player.offsetHeight,
            hugPlayerY
        )
    );


    player.style.left = hugPlayerX + "px";
    player.style.top = hugPlayerY + "px";


    /* Klavyeyle hareket ederken eğilsin */

    if (!hugTouchActive) {

        if (hugMoveLeft) {

            player.style.transform =
                "rotate(-12deg) scale(1.08)";

        }

        else if (hugMoveRight) {

            player.style.transform =
                "rotate(12deg) scale(1.08)";

        }

        else {

            player.style.transform =
                "scale(1)";
        }
    }


    /* =========================
          RUNNING HEART
    ========================= */

    hugYuX += hugYuVelocityX;
    hugYuY += hugYuVelocityY;


    /* Sağ ve sol duvar */

    if (
        hugYuX < 0 ||
        hugYuX > window.innerWidth - yu.offsetWidth
    ) {

        hugYuVelocityX *= -1;

        hugYuX = Math.max(
            0,
            Math.min(
                window.innerWidth - yu.offsetWidth,
                hugYuX
            )
        );
    }


    /* Üst ve alt duvar */

    if (
        hugYuY < 145 ||
        hugYuY > window.innerHeight - yu.offsetHeight
    ) {

        hugYuVelocityY *= -1;

        hugYuY = Math.max(
            145,
            Math.min(
                window.innerHeight - yu.offsetHeight,
                hugYuY
            )
        );
    }


    /* =========================
       PLAYER YAKLAŞINCA KAÇ
    ========================= */

    const distanceX =
        hugPlayerX - hugYuX;

    const distanceY =
        hugPlayerY - hugYuY;


    const distance = Math.sqrt(
        distanceX * distanceX +
        distanceY * distanceY
    );


    if (distance < 280) {

        const safeDistance =
            Math.max(distance, 1);


        /*
        Kalbi oyuncunun ters yönüne
        doğru hızlandırır.
        */

        hugYuVelocityX +=
            (-distanceX / safeDistance)
            * 0.16;


        hugYuVelocityY +=
            (-distanceY / safeDistance)
            * 0.16;
    }


    /* Hız çok yükselmesin */

    hugYuVelocityX = Math.max(
        -7,
        Math.min(
            7,
            hugYuVelocityX
        )
    );


    hugYuVelocityY = Math.max(
        -7,
        Math.min(
            7,
            hugYuVelocityY
        )
    );


    yu.style.left = hugYuX + "px";
    yu.style.top = hugYuY + "px";


    /* Kaçarken dönsün */

    const angle =
        Math.atan2(
            hugYuVelocityY,
            hugYuVelocityX
        )
        * 180
        / Math.PI;


    yu.style.transform =
        "rotate("
        + angle
        + "deg) scale(1.05)";


    /* =========================
            CATCH
    ========================= */

    if (distance < 78) {

        handleHugTouch();
    }
}


/* =================================
          TOUCH / IPAD CONTROL
================================= */

const hugTouchArea =
    document.getElementById("hugArea");


if (hugTouchArea) {

    hugTouchArea.addEventListener(
        "pointerdown",
        startHugTouch
    );


    hugTouchArea.addEventListener(
        "pointermove",
        moveHugTouch
    );


    hugTouchArea.addEventListener(
        "pointerup",
        endHugTouch
    );


    hugTouchArea.addEventListener(
        "pointercancel",
        endHugTouch
    );
}


function startHugTouch(e) {

    if (currentScene !== 6) return;

    hugTouchActive = true;


    if (hugTouchArea.setPointerCapture) {

        hugTouchArea.setPointerCapture(
            e.pointerId
        );
    }


    moveHugTouch(e);
}


function moveHugTouch(e) {

    if (
        currentScene !== 6 ||
        !hugTouchActive
    ) return;


    const player =
        document.getElementById(
            "hugYou"
        );


    if (!player) return;


    hugPlayerX =
        e.clientX
        - player.offsetWidth / 2;


    hugPlayerY =
        e.clientY
        - player.offsetHeight / 2;


    hugPlayerX = Math.max(
        0,
        Math.min(
            window.innerWidth
            - player.offsetWidth,
            hugPlayerX
        )
    );


    hugPlayerY = Math.max(
        145,
        Math.min(
            window.innerHeight
            - player.offsetHeight,
            hugPlayerY
        )
    );


    player.style.left =
        hugPlayerX + "px";


    player.style.top =
        hugPlayerY + "px";


    player.style.transform =
        "scale(1.08)";
}


function endHugTouch() {

    hugTouchActive = false;
}


/* =================================
            CATCH MESSAGE
================================= */

function handleHugTouch() {

    if (!hugStarted) return;


    const text =
        document.getElementById(
            "hugText"
        );


    if (
        hugTouches
        <
        hugMessages.length
    ) {

        if (text) {

            text.textContent =
                hugMessages[
                    hugTouches
                ];
        }


        hugTouches++;


        /* Kalbi yeni yere kaçır */

        hugYuX =
            100
            +
            Math.random()
            *
            Math.max(
                100,
                window.innerWidth - 220
            );


        hugYuY =
            170
            +
            Math.random()
            *
            Math.max(
                100,
                window.innerHeight - 300
            );


        /* Yeni yönde kaçmaya devam etsin */

        hugYuVelocityX =
            (
                Math.random() > 0.5
                ? 1
                : -1
            )
            *
            (
                3
                +
                Math.random() * 2
            );


        hugYuVelocityY =
            (
                Math.random() > 0.5
                ? 1
                : -1
            )
            *
            (
                3
                +
                Math.random() * 2
            );

    }

    else {

        finishHugGame();
    }
}


/* =================================
             FINISH
================================= */

function finishHugGame() {

    if (!hugStarted) return;


    hugStarted = false;
    hugTouchActive = false;


    const player =
        document.getElementById(
            "hugYou"
        );


    const yu =
        document.getElementById(
            "hugYu"
        );


    const text =
        document.getElementById(
            "hugText"
        );


    if (text) {

        text.textContent =
            "You finally caught me 🤍";
    }


    if (player) {

        player.style.transition =
            "transform .5s";

        player.style.transform =
            "scale(1.35)";
    }


    if (yu) {

        yu.style.transition =
            "transform .5s";

        yu.style.transform =
            "scale(1.35)";
    }


    setTimeout(() => {

        showScene(7);

    }, 2000);
}


/* =================================
          KEYBOARD CONTROL
================================= */

window.addEventListener(

    "keydown",

    (e) => {

        if (
            e.key === "ArrowLeft" ||
            e.key === "a"
        ) {

            hugMoveLeft = true;
        }


        if (
            e.key === "ArrowRight" ||
            e.key === "d"
        ) {

            hugMoveRight = true;
        }


        if (
            e.key === "ArrowUp" ||
            e.key === "w"
        ) {

            hugMoveUp = true;
        }


        if (
            e.key === "ArrowDown" ||
            e.key === "s"
        ) {

            hugMoveDown = true;
        }
    }
);


window.addEventListener(

    "keyup",

    (e) => {

        if (
            e.key === "ArrowLeft" ||
            e.key === "a"
        ) {

            hugMoveLeft = false;
        }


        if (
            e.key === "ArrowRight" ||
            e.key === "d"
        ) {

            hugMoveRight = false;
        }


        if (
            e.key === "ArrowUp" ||
            e.key === "w"
        ) {

            hugMoveUp = false;
        }


        if (
            e.key === "ArrowDown" ||
            e.key === "s"
        ) {

            hugMoveDown = false;
        }
    }
);
