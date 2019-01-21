var targets = [];
var distance = 0;
var shotTargets = [];
var score = 0;
var paused = false;


function startGame() {
    gamearea.start();
}


function targetGone() {
    for (let i = 0; i < targets.length; i++)
        if (targets[i].y > 400) return true;
}

function clickHandler(event) {
    x = event.clientX - gamearea.canvas.offsetLeft;
    y = event.clientY - gamearea.canvas.offsetTop;
    checkTarget(x, y);
}


function checkTarget() {
    for (let i = 0; i < targets.length; i++) {
        if (x >= targets[i].x && x <= targets[i].x + 20 && y >= targets[i].y && y <= targets[i].y + 20) {
            targets[i].shot = true;
            shotTargets.push(targets[i]);
            targets.splice(i, 1);
            score++;
        }
    }
}

var gamearea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 250;
        this.canvas.height = 287;
        this.canvas.style.padding = 0;
        this.canvas.style.margin = "auto";
        this.canvas.style.position = "absolute";
        this.canvas.style.top = 12;
        this.canvas.style.bottom = 0;
        this.canvas.style.left = 0;
        this.canvas.style.right = 0;
        this.canvas.style.paddingLeft = 0;
        this.canvas.style.paddingRight = 0;
        this.canvas.style.marginLeft = "auto";
        this.canvas.style.marginRight = "auto";
        this.canvas.style.boxShadow = "inset 0 0 15px rgba(0, 0, 0, 0.5), 1px 1px 2px rgba(0, 0, 0, 0.3)"
        //watch background color//
        this.canvas.style.backgroundColor = "rgb(47,79,79)";
        this.canvas.style.borderRadius = "25px"
        //watch border thickness + and color//
        this.canvas.style.border = "9px solid #C0C0C0";
        this.canvas.style.display = "block";
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.context = this.canvas.getContext("2d");
        this.canvas.addEventListener("click", clickHandler, event);
        requestAnimationFrame(gamearea.update);
        gamearea.update();
        // box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.5), 1px 1px 2px rgba(0, 0, 0, 0.3)
    },


    update: function () {
        gamearea.context.clearRect(0, 0, 300, 400);
        document.getElementById("score").innerText = "Score: " + score;
        if (score == 20) {
            gamearea.stop(true);
            return;
        }
        if (targetGone()) {
            gamearea.stop(false);
            return;
        }

        if (paused) {
            gamearea.pausedGame(true);
            return;
        }
        //This makes multi-objects fall from sky, distance * x determines the speed//
        if (targets.length == 0 || targets[targets.length - 1].y >= distance) {
            var t = new target();
            targets.push(t);
            distance = Math.floor(Math.random() * 500);
        }
        for (let i = 0; i < targets.length; i++) targets[i].draw();
        if (shotTargets.length > 0) {
            for (let i = 0; i < shotTargets.length; i++) shotTargets[i].draw();
            for (let j = 0; j < shotTargets.length; j++)
                if (shotTargets[j].shotCount == 15) shotTargets.splice(j, 1);
        }
        requestAnimationFrame(gamearea.update);
    },

    pausedGame: function (paused) {

        gamearea.canvas.removeEventListener("click", clickHandler, event);
        gamearea.context.fillStyle = "black";
        gamearea.context.globalAlpha = 0.5;
        gamearea.context.fillRect(0, 0, 300, 400);
        gamearea.context.globalAlpha = 1.0;
        gamearea.context.fillRect(0, 100, 300, 100);
        gamearea.context.font = "20px helvetica";
        gamearea.context.fillStyle = "red";
        gamearea.context.fillText("Paused! Score:" + score, 50, 150);

    },



    stop: function (win) {
        gamearea.canvas.removeEventListener("click", clickHandler, event);
        gamearea.context.fillStyle = "black";
        gamearea.context.globalAlpha = 0.5;
        gamearea.context.fillRect(0, 0, 300, 400);
        gamearea.context.globalAlpha = 1.0;
        gamearea.context.fillRect(0, 100, 300, 100);
        gamearea.context.font = "20px helvetica";
        if (win) {
            gamearea.context.fillStyle = "LawnGreen";
            gamearea.context.fillText("You win! Score:" + score, 40, 150);
        } else {
            gamearea.context.fillStyle = "red";
            gamearea.context.fillText("Game over! Score:" + score, 40, 150);
        }
    }
}
//Target function configures the object itself. FillRect determines the x,y,width,height of the object. 
//the x=math.. the *number determines where in the x coordinates it will fall. Must consider the width of the watch or else it will not visible on the watch screen.//
// If this shot.. configures how the object explodes once it's clicked and points are given
//the else statement configures the actual size of the object.
function target() {
    this.x = Math.floor(Math.random() * 225);
    this.y = 0;
    this.h = 4;
    this.w = 4;
    this.shot = false;
    this.shotCount = 0;
    this.draw = function () {
        gamearea.context.fillStyle = "rgb(217, 217, 217)";
        if (this.shot) {
            this.shotCount++;
            gamearea.context.fillRect(this.x, this.y, this.w, this.h);
            gamearea.context.fillRect(this.x + 4, this.y + 4, this.w, this.h);
            gamearea.context.fillRect(this.x + 12, this.y + 4, this.w, this.h);
            gamearea.context.fillRect(this.x + 16, this.y, this.w, this.h);
            gamearea.context.fillRect(this.x + 4, this.y + 12, this.w, this.h);
            gamearea.context.fillRect(this.x, this.y + 16, this.w, this.h);
            gamearea.context.fillRect(this.x + 12, this.y + 12, this.w, this.h);
            gamearea.context.fillRect(this.x + 16, this.y + 16, this.w, this.h);
        } else {
            gamearea.context.fillRect(this.x, this.y, 20, 20);
            this.y += 0.3;
        }


    }
}

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame; {
        window.setTimeout(this.callback, 1000 / 60)
    };
})();

function PStart() {

    requestAnimationFrame(PStart);
}

this.pauseButton = function (event) {
    // if (event.keyCode === 80)
    paused = !paused;
    if (paused === false) {
        gamearea.update();
        gamearea.start();
        return;
    }
}