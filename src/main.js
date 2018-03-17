const loader = require('./loader');
const sprite = require('./sprite');
//const anim = require('./animation');

window._l = loader;
//load();


loader.loadImageRaw('/gfx/sprites/tiles.png').then(main).catch(console.exception);



function main(tiles) {
    const rget = () => tiles;
    const mysprite = sprite.create(rget, {
        imageId: 'woods',
        srect: {x: 0, y: 0, width: 16, height: 16}
    });
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 640, 480);
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    sprite.draw(rget, ctx, mysprite, {x: 100, y: 100, width: 64, height: 64});
}

/*
function load() {
    const ctx = {
        url: '/data/resources.json',
        loaders: {
            image: loader.loadImage,
            json: loader.loadJson,
            spritesheet: loader.dummyLoader
        },
        onUpdate: console.log
    };
    loader.loadJson(ctx)
        .then(loader.loadList)
        .catch(console.error)
        .then(main);
}

function main(resources) {
    resources = resources.resource;
    console.log('RESOURCES:\n', resources);
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 640, 480);
    const tux = resources["tux.png"];
    tux.x = 0;
    const updateTux = setupAnimation(tux);
    loop(delta => {
        ctx.fillRect(0, 0, 640, 480);
        updateTux(delta);
        ctx.drawImage(tux.resource, tux.x, 200);
    });
}

function loop(onUpdate) {
    let now = performance.now();
    const loop_ = timestamp => {
        const delta = timestamp - now;
        now = timestamp;
        onUpdate(delta);
        window.requestAnimationFrame(loop_);
    };
    window.requestAnimationFrame(loop_);
}

function setupAnimation(thing) {
    const tween1 = anim.tween(anim.quadout, 0, 512, 2000);
    const tween2 = anim.tween(anim.quadin, 512, 0, 2000);
    const state = {done: false, time: 0, tweens: [tween1, tween2], index: 0};
    let tw = tween1;
    return delta => {
        const x = tw(state, delta);
        thing.x = x;
        if (!state.done) return;
        state.index = (state.index+1) % state.tweens.length;
        tw = state.tweens[state.index];
        state.done = false;
        state.time = 0;
    };
}*/
