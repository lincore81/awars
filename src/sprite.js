const assert = require('assert');
const assets = require('./assets');

module.exports = {create: createSprite, draw: drawSprite};



function createSprite(ctx, {id, imageId, srect}) {
    const image = assets.get(imageId, 'image');
    if (!image) throw new Error(`image id does not exist: ${imageId}.`);
    if (srect) assertSRectOk(srect);
    return {
        id,
        type: "sprite", imageId, srect,
        width: srect && srect.width || image.width, 
        height: srect && srect.height || image.height,
    };

    function assertSRectOk(srect) {
        const ok = (
            typeof srect.x === 'number'
            && typeof srect.y === 'number'
            && srect.width && srect.height);
        if (!ok) {
            throw new Error(`srect given, but invalid: ${srect}`);
        }
    }
}


function drawSprite(assetctx, drawctx, sprite, pos) {
    const width = pos.width || sprite.width;
    const height = pos.height || sprite.height;
    const image = assetctx.get(sprite.imageId, 'image');
    if (!sprite.srect) {
        drawctx.drawImage(image, pos.x, pos.y, width, height); 
    } else {
        drawctx.drawImage(image, 
            sprite.srect.x, sprite.srect.y, 
            sprite.srect.width, sprite.srect.height, 
            pos.x, pos.y, width, height);
    }
}
