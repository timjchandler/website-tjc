var isRunning = false;

function loopXTimesRecSetup(iterations) {
    if (isRunning == false) {
        isRunning = true;
        counts = new Array(16).fill(0);
        loopRec(iterations, counts, iterations);
    }
}

function loopRec(iterations, array, initial) {
    document.getElementById("bottom-out").innerHTML = (initial - iterations) + " sets of 3 dice rolled."; 
    if (iterations < 1) {
        isRunning = false;
        return;
    }
    total = 0;
    for (idx = 0; idx < 3; idx++) {
        value = Math.random();
        value = Math.ceil(value * 6);
        total += value;
    }
    counts[total - 3] = counts[total - 3] + 1;
    colWeight = 25 / Math.max(...array);
    for (j = 0; j < 16; j++) {
            nameID = "bar" + (j + 3);
            height = (counts[j] * colWeight) + "rem"
            document.getElementById(nameID).style.minHeight = height;
    }
    skip = Math.ceil((initial - iterations + 1) / 250);
    if (iterations % skip == 0) {
        setTimeout(() => { loopRec(iterations - 1, array, initial); }, 10);
    }
    else {
        loopRec(iterations - 1, array, initial); 
    }
}