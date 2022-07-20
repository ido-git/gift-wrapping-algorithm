// get random int between in and max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let num = Math.floor(((Math.random() * (max - min + 1) + min)/2))*2
    return num; // Math.random returns an even number between 0-1 (like in java)
    // we want an even number so there aren't any touching walls
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}