export function binarySearch(
    dt_list: string[],
    dt: string,
    dir: boolean
): number {
    const func = dir ? searchUpper : searchLower
    return func(dt_list, dt);
}

function searchLower(dt_list: string[], dt: string): number {
    // argmin_i(dt <= dt_list[i])
    var l = 0,
        r = dt_list.length - 1;
    var i = r;

    while (l <= r) {
        let m = Math.floor((l + r) / 2);

        if (dt <= dt_list[m]) {
            r = m - 1;
            i = Math.min(i, m);
        } else l = m + 1;
    }

    return i;
}

function searchUpper(dt_list: string[], dt: string): number {
    // argmax_i(dt >= dt_list[i])
    var l = 0,
        r = dt_list.length - 1;
    var i = l;

    while (l <= r) {
        let m = Math.floor((l + r) / 2);

        if (dt >= dt_list[m]) {
            l = m + 1;
            i = Math.max(i, m);
        } else r = m - 1;
    }

    return i;
}
