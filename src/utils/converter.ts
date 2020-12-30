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

export const RGBToHSL = (r: number, g: number, b: number, flag = false): string | number[] => {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    const cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin;
    let h = 0,
        s = 0,
        l = 0;

    if (delta == 0) h = 0;
    // Red is max
    else if (cmax == r) h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g) h = (b - r) / delta + 2;
    // Blue is max
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    if (flag) return [h, s, l];
    else return 'hsl(' + h + ',' + s + '%,' + l + '%)';
};

export const RGBAToHSLA = (r: number, g: number, b: number, a: number): string => {
    const rR = RGBToHSL(r, g, b, true);
    return 'hsla(' + rR[0] + ',' + rR[1] + '%,' + rR[2] + '%,' + a + ')';
};

export const HSLToRGB = (h: number, s: string | number, l: string | number, flag = false): string | number[] => {
    // Must be fractions of 1
    if (typeof s == 'string') {
        s = parseFloat(s.replace('%', ''));
    }
    if (typeof l == 'string') {
        l = parseFloat(l.replace('%', ''));
    }
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
        m = l - c / 2;
    let r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    if (flag) return [r, g, b];
    else return 'rgb(' + r + ',' + g + ',' + b + ')';
};

export const HSLAToRGBA = (h: number, s: string | number, l: string | number, a: number): string => {
    const rR = HSLToRGB(h, s, l, true);
    return 'rgba(' + rR[0] + ',' + rR[1] + ',' + rR[2] + ',' + a + ')';
};
