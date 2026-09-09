/*==================================================
                FIND MEMORIES
==================================================*/

let findStarted = false;
let foundCount = 0;

const findItems = [

    // Yıldız: sol üstteki yıldız kümesinin içine
    { id:"star", emoji:"⭐", x:410, y:220 },

    // Kedi: sağdaki büyük pembe gezegenin kenarına
    { id:"cat", emoji:"🐱", x:1125, y:340 },

    // Gül: soldaki mavi gezegenin yakınına
    { id:"rose", emoji:"🌹", x:65, y:650 },

    // Mektup: sağ alttaki mor bulutun içine
    { id:"letter", emoji:"💌", x:1050, y:610 },

    // Oyun konsolu: alt ortadaki yıldızların arasına
    { id:"game", emoji:"🎮", x:510, y:650 }

];

function createFindGame(){

    if(findStarted) return;

    const area = document.getElementById("findArea");

    if(!area) return;

    findStarted = true;
    foundCount = 0;

    area.innerHTML = "";

    findItems.forEach(obj=>{

        const item = document.createElement("div");

        item.className = "findObject";

        item.innerHTML = obj.emoji;

        item.style.left = obj.x + "px";

        item.style.top = obj.y + "px";

        item.addEventListener("click",()=>{

            collectItem(item,obj);

        });

        area.appendChild(item);

    });

}

function collectItem(item,obj){

    if(item.dataset.collected === "true") return;

    item.dataset.collected = "true";

    item.style.pointerEvents = "none";

    item.style.transition = ".35s";

    item.style.transform =
    "scale(2) rotate(360deg)";

    item.style.opacity = "0";

    foundCount++;

    const target = document.getElementById(

        "target" +
        obj.id.charAt(0).toUpperCase() +
        obj.id.slice(1)

    );

    if(target){

        target.style.opacity = ".25";

        target.style.transform =
        "scale(.8)";

    }

    setTimeout(()=>{

        item.remove();

    },350);

    if(foundCount >= findItems.length){

        setTimeout(()=>{

            findStarted = false;

            showScene(6);

        },1000);

    }

}
