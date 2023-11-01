
var GAME = {
    width: 500,
    height: 500,
    background: '#E6E6FA'
}

var BALL = {
    color: "red",
    x: 100,
    y: 80,
    radius: 13,
    out: "black",
    xDirection: 4,
    yDirection: 6,
}

var RACKET = {
    color: "gray",
    x: 0,
    y: 450,
    width: 100,
    height: 25,
    xDirection: 5,
    yDirection: 5,
    counter: 0,
}


var ANIMATION = {
    img: new Image(),      // для изображения спрайта
    imgIsLoad: false,      // чтобы убедиться, что спрайт прогрузился
    /*count: 0,              // для отрисовки нужного кадра из спрайта
    explosion: false,      // делать взрыв или не делать*/
    /*size: 1,              // размер кадра из спрайта*/
 }
 
 function initAnimation() {
    ANIMATION.img.src = "./img/scr.png"
    ANIMATION.img.onload = () => {
        ANIMATION.imgIsLoad = true;
     }
  
}

function drawAnimation() {
    if (ANIMATION.imgIsLoad) {
        canvasContext.drawImage(ANIMATION.img, 0, 0)
    }
 }
 
 

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");


function drawBall() {
    canvasContext.fillStyle = BALL.color;
    canvasContext.strokeStyle = BALL.out;
    canvasContext.lineWidth = 1;
    canvasContext.beginPath();
    canvasContext.arc(BALL.x, BALL.y, BALL.radius, 0, 2 * Math.PI);
    canvasContext.closePath();
    canvasContext.fill();
    canvasContext.stroke();
}
function drawRacket() {
    canvasContext.fillStyle = RACKET.color;
    canvasContext.fillRect(RACKET.x, RACKET.y, RACKET.width, RACKET.height);
}
function drawBackground() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}
function drawScore() {
    canvasContext.font = "48px serif";
    canvasContext.fillText("Score: " + RACKET.counter, 10, 50);
}
function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawBall();
    drawRacket();
    drawScore();
}
function FinishDraw() {
    drawAnimation();
    canvasContext.strokeStyle = "black";
    canvasContext.lineWidth = 2;
    canvasContext.font = "bold 70px serif";
    canvasContext.strokeText("ЧЕМПИОН", GAME.width/ 7.6, 280);
}
function FinishDraw1() {
    drawBackground();
    canvasContext.fillStyle = "black";
    canvasContext.font = "80px serif";
    canvasContext.fillText("ЛОШАРА", 75, GAME.height / 2);
}

function updateBall() {
    BALL.x += BALL.xDirection;
    BALL.y += BALL.yDirection;
    if ((BALL.y + BALL.radius > GAME.height) || (BALL.y - BALL.radius < 0)) {
        BALL.yDirection = -BALL.yDirection;
    }
    if ((BALL.x + BALL.radius > GAME.width) || (BALL.x - BALL.radius < 0)) {
        BALL.xDirection = -BALL.xDirection;
    }
    counter1();
}

function jumping() {
    var racketTopLineCollision = BALL.y + BALL.radius > RACKET.y;
    var racketLeftLineCollision = BALL.x + BALL.radius > RACKET.x;
    var racketDownLineCollision = BALL.y - BALL.radius < RACKET.y + RACKET.height;
    var racketRightLineCollision = BALL.x - BALL.radius < RACKET.x + RACKET.width;
    if ((racketTopLineCollision && racketLeftLineCollision) && (racketDownLineCollision && racketRightLineCollision)) {
        BALL.yDirection = -BALL.yDirection;
        return true;
    }
}

function counter1() {
    if (jumping()) {
        RACKET.counter += 1;

        console.log("SCORE ", RACKET.counter)
    }
}


function finish() {
    if (BALL.y + BALL.radius > GAME.height) {
        FinishDraw1(); }
    else if (RACKET.counter > 3) {
        FinishDraw();}
    else requestAnimationFrame(play) 
    return true;   
    
        
}

function play() {
    drawFrame();
    updateBall();
    finish();    
}

function initEventsListeners() {
    window.addEventListener("mousemove", onCanvasMouseMove);
    window.addEventListener("keydown", onCanvasKeyDown);
}
function clampRacketPosition() {
    if (RACKET.x < 0) {
        RACKET.x = 0;
    }
    if (RACKET.x + RACKET.width > GAME.width) {
        RACKET.x = GAME.width - RACKET.width;
    }
}
function onCanvasMouseMove(event) {
    RACKET.x = event.clientX;
    clampRacketPosition();
}
function onCanvasKeyDown(event) {
    if (event.key === "ArrowLeft") {
        RACKET.x -= RACKET.xDirection;
    }
    if (event.key === "ArrowRight") {
        RACKET.x += RACKET.xDirection;
    }
    clampRacketPosition();
}

initAnimation();
initEventsListeners();
play();
