


export function clampRange(x, a, b) {
    return Math.max(a, Math.min(x, b));
}

/**
 * Ensures the given value is within a given radius of zero.
 * (Utility function) 
 * 
 * @param {number} x The given value
 * @param {number} r Desired radius
 * @returns {number} A value from the set {-r, x, +r}
 */
export function clampRadius(x, r) {
    return clampRange(x, -r, r);
}


export function clamp(...args) {
    let clamper = args.length < 3 ? clampRadius : clampRange;
    return clamper(...args);
}


export function gridEach(n, m, curry) {
    let i = n;
    while (i--) {
        let j = m;
        while (j--) {
            curry(j)(i);
        }
    }
}
