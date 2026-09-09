/*=========================================================
    JOURNEY TO YU
=========================================================*/

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

/*=========================================================
    RESIZE
=========================================================*/

function resizeCanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize",resizeCanvas);

/*=========================================================
    SCENES
=========================================================*/

const scenes = document.querySelectorAll(".scene");

let currentScene = 0;
let scene2Started = false;

/*==========================
    HEART GAME
==========================*/

let playerX = window.innerWidth / 2;

let moveLeft = false;
let moveRight = false;

const playerSpeed = 16;

/*==========================
      FALLING HEARTS
==========================*/

let hearts = [];

let heartScore = 0;

let gameTime = 60;

let heartSpawnTimer = 0;

let difficulty = 0;

function showScene(index){

    scenes.forEach(scene=>{

        scene.classList.remove("active");
        scene.style.display="none";

    });

    scenes[index].classList.add("active");
    scenes[index].style.display="flex";

    currentScene=index;

}

/*=========================================================
    MOUSE
=========================================================*/

const mouse={

    x:window.innerWidth/2,

    y:window.innerHeight/2

};

window.addEventListener("mousemove",(e)=>{

    mouse.x=e.clientX;
    mouse.y=e.clientY;

});

/*=========================================================
    STARS
=========================================================*/

const stars=[];

const STAR_COUNT=1000;

class Star{

    constructor(){

        this.reset(true);

    }

    reset(first=false){

        this.x=Math.random()*canvas.width;

        this.y=first
        ?Math.random()*canvas.height
        :-10;

        this.size=Math.random()*2.2;

        this.speed=.2+Math.random()*1.5;

        this.opacity=.25+Math.random()*.75;

    }

    update(){

        this.y+=this.speed;

        if(this.y>canvas.height){

            this.reset();

        }

    }

}

for(let i=0;i<STAR_COUNT;i++){

    stars.push(new Star());

}

/*=========================================================
    SHOOTING STARS
=========================================================*/

const meteors=[];

class Meteor{

    constructor(){

        this.reset();

    }

    reset(){

        this.x=Math.random()*canvas.width;

        this.y=-300;

        this.length=150+Math.random()*180;

        this.speed=10+Math.random()*10;

        this.life=0;

        this.maxLife=80+Math.random()*80;

    }

    update(){

        this.life++;

        this.x+=this.speed;

        this.y+=this.speed;

        if(this.life>this.maxLife){

            this.reset();

        }

    }

}

for(let i=0;i<5;i++){

    meteors.push(new Meteor());

}

/*=========================================================
    PARTICLES
=========================================================*/

const particles=[];

class Particle{

    constructor(x,y){

        this.x=x;
        this.y=y;

        this.vx=(Math.random()-0.5)*20;
        this.vy=(Math.random()-0.5)*20;

        this.size=2+Math.random()*5;

        this.life=140;

    }

    update(){

        this.x+=this.vx;
        this.y+=this.vy;

        this.vx*=0.985;
        this.vy*=0.985;

        this.life--;

        this.size*=0.985;

    }

}
/*=========================================================
    SPACE DUST
=========================================================*/

const dust = [];

class Dust{

    constructor(){

        this.reset(true);

    }

    reset(first=false){

        this.x = Math.random() * canvas.width;

        this.y = first ? Math.random() * canvas.height : -10;

        this.size = 0.5 + Math.random() * 2;

        this.speed = 0.15 + Math.random() * 0.35;

        this.alpha = 0.2 + Math.random() * 0.5;

        this.phase = Math.random() * Math.PI * 2;

    }

    update(){

        this.y += this.speed;

        this.phase += 0.02;

        if(this.y > canvas.height){

            this.reset();

        }

    }

}

for(let i=0;i<250;i++){

    dust.push(new Dust());

}

/*=========================================================
    INTRO
=========================================================*/

const touchText=document.getElementById("touchText");

let introStarted=false;

touchText.addEventListener("pointerdown",startJourney);

function startJourney(){

    if(introStarted) return;

    introStarted=true;

    touchText.style.pointerEvents="none";

    for(let i=0;i<3000;i++){

        particles.push(

            new Particle(

                canvas.width/2,

                canvas.height/2

            )

        );

    }

    document
    .querySelector(".intro-container")
    .classList
    .add("fadeOut");

    setTimeout(()=>{

    showScene(1);

},1400);

}
/*=========================================================
    DRAW
=========================================================*/

function drawBackground(){

    ctx.fillStyle="#000";

    ctx.fillRect(

        0,

        0,

        canvas.width,

        canvas.height

    );

}

function drawStars(){

    const offsetX=
    (mouse.x-canvas.width/2)*0.003;

    const offsetY=
    (mouse.y-canvas.height/2)*0.003;

    for(const star of stars){

        star.update();

        ctx.beginPath();

        ctx.fillStyle=
        `rgba(255,255,255,${star.opacity})`;

        ctx.arc(

            star.x+offsetX,

            star.y+offsetY,

            star.size,

            0,

            Math.PI*2

        );

        ctx.fill();

    }

}

function drawMeteors(){

    for(const meteor of meteors){

        meteor.update();

        ctx.beginPath();

        const x2=
        meteor.x-
        meteor.length;

        const y2=
        meteor.y-
        meteor.length;

        const gradient=

        ctx.createLinearGradient(

            meteor.x,

            meteor.y,

            x2,

            y2

        );

        gradient.addColorStop(

            0,

            "rgba(255,255,255,.9)"

        );

        gradient.addColorStop(

            1,

            "rgba(255,255,255,0)"

        );

        ctx.strokeStyle=gradient;

        ctx.lineWidth=2;

        ctx.moveTo(

            meteor.x,

            meteor.y

        );

        ctx.lineTo(

            x2,

            y2

        );

        ctx.stroke();

    }

}

function drawParticles(){

    for(

        let i=particles.length-1;

        i>=0;

        i--

    ){

        particles[i].update();

        ctx.beginPath();

        ctx.fillStyle=

        `rgba(255,170,220,${
            particles[i].life/140
        })`;

        ctx.arc(

            particles[i].x,

            particles[i].y,

            particles[i].size,

            0,

            Math.PI*2

        );

        ctx.fill();

        if(particles[i].life<=0){

            particles.splice(i,1);

        }

    }

}
function drawDust(){

    for(const d of dust){

        d.update();

        ctx.beginPath();

        ctx.fillStyle =
        `rgba(255,230,245,${
            d.alpha + Math.sin(d.phase)*0.15
        })`;

        ctx.arc(

            d.x,

            d.y,

            d.size,

            0,

            Math.PI*2

        );

        ctx.fill();

    }

}

/*=========================================================
    SCENE 2 CAMERA
=========================================================*/
let cameraZoom = 1;

function updateScene2(){

    if(currentScene !== 1) return;

    if(!scene2Started){

        scene2Started = true;

        setTimeout(()=>{

            startWhiteFlash();

        },7000);

    }

    const planetSystem = document.getElementById("planetSystem");

    if(!planetSystem) return;

    cameraZoom += 0.0005;

    if(cameraZoom > 1.18){

        cameraZoom = 1.18;

    }

    planetSystem.style.transform =
        `translate(-50%,-50%) scale(${cameraZoom})`;

}

/*=========================================================
    MEMORY SCENE
=========================================================*/

const memoryData = [
    {
        gif: "images/gifs/gif1.gif",
        text: "When you get angry at me"
    },
    {
        gif: "images/gifs/gif2.gif",
        text: "I LOVE YOUU"
    },
    {
        gif: "images/gifs/gif3.gif",
        text: "No comments"
    },
    {
        gif: "images/gifs/gif4.gif",
        text: "You while studying"
    },
    {
        gif: "images/gifs/gif5.gif",
        text: "Me towards you"
    },
    {
        gif: "images/gifs/gif6.gif",
        text: "HEHEHEHHEH"
    },
    {
        gif: "images/gifs/gif7.gif",
        text: "YOURR SOO CUTEE"
    },
    {
        gif: "images/gifs/gif8.gif",
        text: "SLEEPPPP"
    }
];

let scene3Started = false;
let openedMemories = 0;

    function createMemoryScene(){

    if(currentScene !== 2) return;
    if(scene3Started) return;

    scene3Started = true;

    const container = document.getElementById("memoryContainer");

    memoryData.forEach((item, index) => {

        const orb = document.createElement("div");
        orb.className = "memoryOrb";

        const centerX = container.clientWidth / 2;
        const centerY = container.clientHeight / 2;
        const angle = (index / memoryData.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 260;

        orb.dataset.angle = angle;
        orb.dataset.radius = radius;
        orb.dataset.speed = 0.002 + Math.random() * 0.002;

        orb.style.left = (centerX + Math.cos(angle) * radius) + "px";
        orb.style.top = (centerY + Math.sin(angle) * radius) + "px";

        orb.addEventListener("pointerdown", () => {

            const rect = orb.getBoundingClientRect();

            document.getElementById("memoryViewer").style.display = "flex";
            document.getElementById("memoryGif").src = item.gif;
            document.getElementById("memoryText").textContent = item.text;

            const card = document.getElementById("memoryCard");
            setTimeout(() => card.classList.add("show"), 20);

            orb.style.pointerEvents = "none";
            orb.style.opacity = ".15";

        });

        container.appendChild(orb);

    });

}

function updateMemoryOrbs(){

    if(currentScene !== 2) return;

    const container = document.getElementById("memoryContainer");
    if(!container) return;

    const orbs = container.querySelectorAll(".memoryOrb");
    const centerX = container.clientWidth / 2;
    const centerY = container.clientHeight / 2;

    orbs.forEach((orb) => {

        let angle = parseFloat(orb.dataset.angle);
        angle += parseFloat(orb.dataset.speed);
        orb.dataset.angle = angle;

        const radius = parseFloat(orb.dataset.radius);

        orb.style.left = (centerX + Math.cos(angle) * radius) + "px";
        orb.style.top = (centerY + Math.sin(angle) * radius) + "px";

    });

}

    

/*=========================================================
    ANIMATE
=========================================================*/

function startWhiteFlash(){

    const flash = document.getElementById("whiteFlash");

    flash.style.opacity = "1";

    setTimeout(()=>{

        showScene(2);

        flash.style.opacity = "0";

    },900);

}
const closeMemory = document.getElementById("closeMemory");

const nextGameBtn = document.getElementById("nextGameBtn");

if(nextGameBtn){

    nextGameBtn.addEventListener("pointerdown",()=>{

        showScene(5);

    });

}

if(closeMemory){

    closeMemory.addEventListener("pointerdown", () => {

        const viewer = document.getElementById("memoryViewer");
        const card = document.getElementById("memoryCard");

        card.classList.remove("show");
        viewer.style.pointerEvents = "none";

        setTimeout(() => {

    viewer.style.display = "none";
    viewer.style.pointerEvents = "auto";

},300);

        openedMemories++;

        if(openedMemories >= memoryData.length){

    setTimeout(()=>{

    gameTime = 60;
    heartScore = 0;

    document.getElementById("heartScore").textContent = "0";
    document.getElementById("heartTimer").textContent = "60";

    showScene(3);

},500);

}

    });

}

function updateHeartPlayer(){

    if(currentScene !== 3) return;

    const player = document.getElementById("heartPlayer");

    if(!player) return;

    if(moveLeft){

        playerX -= playerSpeed;

    }

    if(moveRight){

        playerX += playerSpeed;

    }

    if(playerX < 45){

        playerX = 45;

    }

    if(playerX > window.innerWidth - 45){

        playerX = window.innerWidth - 45;

    }

    player.style.left = playerX + "px";

if(moveLeft){

    player.style.transform =
    "translateX(-50%) rotate(-8deg) scale(1.08)";

}
else if(moveRight){

    player.style.transform =
    "translateX(-50%) rotate(8deg) scale(1.08)";

}
else{

    player.style.transform =
    "translateX(-50%) scale(1)";

}

}
window.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowLeft" || e.key==="a"){

        moveLeft = true;

    }

    if(e.key==="ArrowRight" || e.key==="d"){

        moveRight = true;

    }

});

window.addEventListener("keyup",(e)=>{

    if(e.key==="ArrowLeft" || e.key==="a"){

        moveLeft = false;

    }

    if(e.key==="ArrowRight" || e.key==="d"){

        moveRight = false;

    }

});
/*=========================================================
    HEART GAME - TOUCH / IPAD CONTROL
=========================================================*/

const heartGame = document.getElementById("heartGame");

if(heartGame){

    heartGame.addEventListener("pointerdown",(e)=>{

        if(currentScene !== 3) return;

        playerX = e.clientX;

    });

    heartGame.addEventListener("pointermove",(e)=>{

        if(currentScene !== 3) return;

        if(e.pointerType === "mouse" && e.buttons === 0) return;

        playerX = e.clientX;

    });

}

function updateHearts(){

    if(currentScene !== 3) return;

    const container = document.getElementById("heartContainer");

    if(!container) return;

    heartSpawnTimer++;

     difficulty += 0.003;

    if(heartSpawnTimer > Math.max(8,25-difficulty)){

        heartSpawnTimer = 0;

        if(difficulty < 17){

    difficulty += 0.2;

}

        const heart = document.createElement("div");

const random = Math.random();

let type = "normal";

if(random < 0.15){

    type = "gold";

    heart.innerHTML = "✨";

}
else if(random < 0.30){

    type = "broken";

    heart.innerHTML = "💔";

}
else{

    type = "normal";

    heart.innerHTML = "❤️";

}

heart.style.userSelect = "none";
heart.style.pointerEvents = "none";

heart.className = "fallHeart " + type;

    heart.style.transform =
`rotate(${Math.random()*40-20}deg)`;

    heart.style.fontSize =
(35 + Math.random()*18) + "px";

        heart.style.left =
30 + Math.random() * (window.innerWidth - 60) + "px";

        container.appendChild(heart);

        hearts.push({

    x: parseFloat(heart.style.left),

    y: -40,

    speed: 4 + Math.random() * (4 + difficulty),

    el: heart,

    type: type

});

    }

    for(let i = hearts.length - 1; i >= 0; i--){

        const h = hearts[i];

        h.y += h.speed;

h.x += Math.sin(h.y * 0.03) * 0.8;

h.el.style.left = h.x + "px";

        h.el.style.top = h.y + "px";

        const player = document.getElementById("heartPlayer");

const playerRect = player.getBoundingClientRect();
const heartRect = h.el.getBoundingClientRect();

if(

    heartRect.left < playerRect.right &&
    heartRect.right > playerRect.left &&
    heartRect.top < playerRect.bottom &&
    heartRect.bottom > playerRect.top

){

    if(h.type === "normal"){

    heartScore += 1;

document.getElementById("heartScore").style.transform = "scale(1.25)";

setTimeout(()=>{

    document.getElementById("heartScore").style.transform = "scale(1)";

},120);

}
else if(h.type === "gold"){

    heartScore += 5;

document.getElementById("heartScore").style.transform = "scale(1.4)";

setTimeout(()=>{

    document.getElementById("heartScore").style.transform = "scale(1)";

},150);

}
else{

    heartScore -= 3;

document.getElementById("heartScore").style.color = "#ff4d4d";

setTimeout(()=>{

    document.getElementById("heartScore").style.color = "white";

},250);

    if(heartScore < 0){

        heartScore = 0;

    }

}

    document.getElementById("heartScore").textContent = heartScore;

if(heartScore >= 40){

    heartScore = 40;

    document.getElementById("heartScore").textContent = heartScore;

    setTimeout(()=>{

        showScene(4);

    },800);

    return;

}

    const pop = document.createElement("div");

           pop.className = "heartPop";

           pop.innerHTML = "✨";

           pop.style.left = h.x + "px";

           pop.style.top = h.y + "px";

           document.getElementById("heartContainer").appendChild(pop);

           setTimeout(()=>{

           pop.remove();

},400);

            h.el.style.transform = "scale(1.8)";
           h.el.style.opacity = "0";

setTimeout(()=>{

    h.el.remove();

},150);

    hearts.splice(i,1);

    continue;

}
        

        if(h.y > window.innerHeight){

            hearts.splice(i,1);

        }

    }

}

setInterval(()=>{

    if(currentScene !== 3) return;

    if(gameTime <= 0){

    if(heartScore >= 40){

        showScene(4);

    }

    return;

}

    gameTime--;

    const timer = document.getElementById("heartTimer");

    if(timer){

        timer.textContent = gameTime;

    }

},1000);

function animate(){

    requestAnimationFrame(animate);

    drawBackground();

    drawStars();

    drawDust();

    drawMeteors();

    drawParticles();

    updateHeartPlayer();

    updateHearts();

    updateScene2();

    createMemoryScene();
    
    updateMemoryOrbs();

    updateHugGame();

if(currentScene === 7){

    startGoodbyeHearts();

}

    if(currentScene === 5){

    createFindGame();

}

}

animate();
/* =================================
       GOODBYE - YÜKSELEN KALPLER
================================= */

let goodbyeHeartsStarted = false;


function startGoodbyeHearts(){

    if(goodbyeHeartsStarted) return;

    goodbyeHeartsStarted = true;


    const goodbyeScene =

    document.getElementById(

        "goodbyeScene"

    );


    if(!goodbyeScene) return;


    setInterval(()=>{


        if(currentScene !== 7) return;


        const heart =

        document.createElement(

            "div"

        );


        heart.className =

        "goodbyeHeart";


        const hearts = [

            "💕",

            "💖",

            "🤍",

            "🩷",

            "✨"

        ];


        heart.textContent =

        hearts[

            Math.floor(

                Math.random()

                *

                hearts.length

            )

        ];


        heart.style.left =

        Math.random()

        *

        100

        +

        "%";


        heart.style.fontSize =

        18

        +

        Math.random()

        *

        25

        +

        "px";


        heart.style.animationDuration =

        5

        +

        Math.random()

        *

        5

        +

        "s";


        goodbyeScene.appendChild(

            heart

        );


        setTimeout(()=>{

            heart.remove();

        },10000);


    },650);

}
