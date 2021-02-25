function getRGB(ticks) {
    elementName = "color-change";
    loopTime = 256;
    fraction = ticks % loopTime;
    const orange = [243, 114, 44];
    const yellow = [249, 199, 79];
    const green = [144, 190, 109];
    out1 = []
    out2 = []
    switch (Math.floor(fraction / (loopTime / 4))) {
        case 0:
            out1 = colorBlend(orange, yellow, fraction);
            out2 = colorBlend(yellow, green, fraction);
            break;
        case 1:
            out1 = colorBlend(yellow, green, fraction - loopTime / 4);
            out2 = colorBlend(green, yellow, fraction - loopTime / 4);
            break;
        case 2:
            out1 = colorBlend(green, yellow, fraction - loopTime / 2);
            out2 = colorBlend(yellow, orange, fraction - loopTime / 2);
            break;
        case 3:
            out1 = colorBlend(yellow, orange, fraction - 3 * loopTime / 4);
            out2 = colorBlend(orange, yellow, fraction - 3 * loopTime / 4);
    }
    outStr1 = 'rgba(' + out1[0] + ',' + out1[1] + ',' + out1[2] + ',1),';
    outStr2 = 'rgba(' + out2[0] + ',' + out2[1] + ',' + out2[2] + ',1)';
    fullOut = "linear-gradient(to top right," + outStr1 + outStr2 + ");";
    el = document.getElementById(elementName);
    el.setAttribute("style", "background: " + fullOut);
    setTimeout(() => { getRGB(ticks + 1); }, 40);
}

function colorBlend(color1, color2, fraction, loopTime = 256) {
    out = []
    for (idx = 0; idx < 3; ++idx) {
        out[idx] = color2[idx] - color1[idx]
        out[idx] *= fraction / (loopTime / 4);
        out[idx] = Math.floor(out[idx]);
        out[idx] += color1[idx];
    }
    return out;
}