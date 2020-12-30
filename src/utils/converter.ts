export const RGBtoHex = (r: number, g: number, b: number): string => {
    let rS = r.toString(16);
    let gS = g.toString(16);
    let bS = b.toString(16);

    if (rS.length == 1) rS = '0' + rS;
    if (gS.length == 1) gS = '0' + gS;
    if (bS.length == 1) bS = '0' + bS;

    return '#' + rS + gS + bS;
};

export const SRGBtoRGB = (rgb1: string): string[] => {
    const sep = rgb1.indexOf(',') > -1 ? ',' : ' ';
    const rgb = rgb1.substr(4).split(')')[0].split(sep);
    return rgb;
};

export const RGBAtoHex = (r: number, g: number, b: number, a: number): string => {
    let rS = r.toString(16);
    let gS = g.toString(16);
    let bS = b.toString(16);

    let aS = Math.round(a * 255).toString(16);
    console.log(rS, gS, bS, aS);
    if (rS.length == 1) rS = '0' + rS;
    if (gS.length == 1) gS = '0' + gS;
    if (bS.length == 1) bS = '0' + bS;

    if (aS.length == 1) aS = '0' + aS;

    return '#' + rS + gS + bS + aS;
};

export const HexToRGB = (h: string): string => {
    if (!h.startsWith('#')) {
        h = '#' + h;
    }
    let r = '0';
    let g = '0';
    let b = '0';

    // 3 digits
    if (h.length == 4) {
        r = '0x' + h[1] + h[1];
        g = '0x' + h[2] + h[2];
        b = '0x' + h[3] + h[3];

        // 6 digits
    } else if (h.length == 7) {
        r = '0x' + h[1] + h[2];
        g = '0x' + h[3] + h[4];
        b = '0x' + h[5] + h[6];
    }

    return 'rgb(' + +r + ',' + +g + ',' + +b + ')';
};
