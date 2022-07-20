async function wrap(points) {
    //let wrapping = false;

    const P = []; // the points on the convex hull
    let pointOnHull; // the statrt and end point

    // finding the left-most point: the starting point
    let leftMostI;
    let leftMostX = 100000;
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        if (point.x < leftMostX) {
            leftMostI = i;
            leftMostX = point.x;
        }
    }
    pointOnHull = points[leftMostI];
    P[0] = pointOnHull;

    let i = 0;
    let endPoint = points[0];

    while (endPoint != P[0]) {
        wrapping = true;

        P[i] = pointOnHull; // currentVertex
        endPoint = points[0]; // nextVertex
        
        for (let j = 0; j < points.length; j++) {
            const point = points[j]; // checking

            drawLine(endPoint, P[i], "green", ctx); // the current best path found
            drawLine(point, P[i], "white", ctx); // the current point being checked

            await sleep(speed); // delaying the animation

            if (endPoint == pointOnHull || calcCross(endPoint, P[i], points[j]) == 2) {
                drawLine(endPoint, P[i], "white", ctx);
                endPoint = points[j];
            }

            // re-drawing the canvas to clean the prev lines
            reDraw(P); 
        }

        // updating the convex hull
        i++;
        pointOnHull = endPoint;
    }
    // drawing the last segment in the hull
    P[i] = pointOnHull;
    reDraw(P);

    wrapping = false


}

function calcCross(p, q, r) {
    let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

    if (val == 0) 
        return 0; 	 // colinear
    return (val > 0)? 1: 2; 	// clock or counterclock wise
}

function drawLine(p1, p2, color, ctx) {

    ctx.strokeStyle = color; // green or white
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

function reDraw(P) {
    draw(ctx); // clearing and drawing the points

    // drawing the hull 
    for (let i = 0; i < P.length-1; i++) {
        drawLine(P[i], P[i+1], "green", ctx);
    }
}