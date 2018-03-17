const util = require('./util.js');
module.exports = {
    tween, linear, quadin, quadout, quadinout
    //tweenAnimation, createAnimator
};

// ['sprite', spriteAnimation({spritesheet: 'tank', first: 0, last: 12, time: 100})];


/*
function createAnimator(repeat, ...steps) {
    const anim = {
        repeat,
        repetitionsLeft: repeat,
        steps,
        current: steps[0],
        currentIndex: 0,
        done: !steps.length,
        update
    };
    return anim;
    function update(delta) {
        if (anim.done) throw new Error('Called update on finished animation');
        anim.current.update(delta); 
        if (!anim.current.done) return;
        next();
    }

    function next() {
        anim.currentIndex++;
        // next step:
        if (anim.currentIndex < anim.steps.length) {
            anim.current = anim.steps[anim.currentIndex];
            return;
        }
        // all steps completed, either restart or we are done:
        if (anim.repetitionsLeft !== 0) {
            anim.repetitionsLeft--;
            anim.currentIndex = 0;
            anim.current = anim.steps[0];
        } else {
            anim.done = true;
        }
    }

}

function tweenAnimation(thing, property, tween) {
    const anim = {
        thing, property, tween, update, reset
        done: false
    };
    update(0);
    return anim;
    function reset() {
        
    }
    function update(delta) {
        const value = anim.tween.update(delta);
        anim.thing[anim.property] = value;
        anim.value = value;
        anim.done = anim.tween.done;
    }
}
*/

function tween(easing, begin, end, duration) {
    if (begin === end) throw new Error('begin must not equal end');
    if (!duration || duration < 0) {
        throw new Error(`duration must be a positive number, not '${duration}'.`);
    }
    const change = end - begin;
    return update;
    function update(state, delta) {
        state.time = state.time + delta;
        state.value = easing(state.time, begin, change, duration);
        state.done = state.time >= duration;
        return state.value;
    }
}

// Penner's easing equations:

// t: elapsed time, 
// b: beginning value, 
// c: change,
// d: duration (total time)

function linear(t, b, c, d) {
    return c * t / d + b;
}

function quadin(t, b, c, d) {
    t = t / d;
    return c * t * t + b;
}

function quadout(t, b, c, d) {
    t = t / d;
    return -c / 2 * ((t-1) * (t-3) -1) + b;
}

function quadinout(t, b, c, d) {
    if (t < d/2) {
        return quadin(t*2, b, c/2, d);
    }
    return quadin(t*2 - d, b + c/2, c/2, d);
}




