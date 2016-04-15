


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
    let j = m;
    while (j--) {
        let callback = curry(j);
        let i = n;
        while (i--) {
            callback(i);
        }
    }
}

export function gridMap(n, m, curry) {
    let output = [];
    gridEach(n, m, i => {
        let callback = curry(i);
        return j => {
            let value = callback(j);
            output.push(value);
        };
    });
    return output;
}

export function gather(objects, key) {
    return objects
        .filter( x => !!x[key] )
        .map( x => x[key] );
}
    
export function invokeAll(functions, ...args) {
    return functions.map( f => f(...args) );
}


 /**
 * Computes the squared distance (d^2) between the player ball and a
 * given brick.  Uses squared distance instead of distance because the
 * latter requires the computationally expensive Math.sqrt().
 * 
 * @param {Phaser.Sprite} brick
 * @returns {number} Squared distance from brick to ball
 */
export function distanceSquared(a, b) {
    if (!a) return null;
    if (!a) return null;
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return dx*dx + dy*dy;
}
    
    
    
export function callOnce(callback) {
    let wasCalled = false;
    
    return (...args) => {
        if (wasCalled) return;
        
        wasCalled = true;
        
        return callback(...args);
    };
}