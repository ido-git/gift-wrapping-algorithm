const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth-((window.innerWidth/10)*1)
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

let points = []; // len: 100
let wrapping = false;
let speed = 20;

function newPoints() {
    if (!wrapping) {
        let x, y;
        for (let i = 0; i < 100; i++) {
            x = getRandomInt(0+canvas.width/20, canvas.width-canvas.width/20);
            y = getRandomInt(0+canvas.height/20, canvas.height-canvas.height/20);
            points[i] = new Point(x, y);
        }
        draw(ctx); // draw the new points
    }
    
}

newPoints()

function draw(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the board

    for (let i = 0; i < points.length; i++) {
        let p = points[i];

        // drawing the point
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, 2*Math.PI);
        ctx.fill();
    }
}

const slider = document.getElementById("slider");

slider.oninput = function() {
    speed = 100-this.value;
}
