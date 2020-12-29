export const RGBtoHex = (r: number, g: number, b: number): string => {
    let rS = r.toString(16);
    let gS = g.toString(16);
    let bS = b.toString(16);

    if (rS.length == 1) rS = '0' + rS;
    if (gS.length == 1) gS = '0' + gS;
    if (bS.length == 1) bS = '0' + bS;

    return '#' + rS + gS + bS;
};

export const RGBToHex1 = (rgb1: string): string[] => {
    const sep = rgb1.indexOf(',') > -1 ? ',' : ' ';
    const rgb = rgb1.substr(4).split(')')[0].split(sep);
    console.log(rgb);
    return rgb;
};
