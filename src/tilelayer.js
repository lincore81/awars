const assert = require('assert');

const sprite = require('./sprite');
const rect = require('./rect');

//function createSprite(resourceGetter, {imageId, srect}) {
function createTileLayer(_, {width, height, tileWidth, tileHeight}) {
    return {
        type: "tilelayer", 
        width, 
        height, 
        tilewidth, 
        tileHeight, 
        rect: rect.xywh(0, 0, width, height)};
}

function setData(resourceGetter, layer, data, unknownSprite) {
    // data validation:
    assert(Array.isArray(data), "data should be an array");
    assert(data.length === layer.height, `data.length should have a length of ${height.height} (height)`);
    data.forEach((x, i) => {
        assert(Array.isArray(x), `data[${i}] should be an array`);
        assert(x.length === layer.width, 
            `data[${i}] should have a length of ${layer.width} (width)`);
        x.forEach((y, j) => assert(typeof y === 'string', 
            `data[${i}][${j}] should be of type string, not ${typeof y}`));
    });
    // mapping ids to actual sprites:
    layer.data = data.map(id => id !== ''
        ? resourceGetter(id, 'sprite') || unknownSprite || undefined
        : undefined
    );
}

function layerRect(layer) {
    return rect.xywh(0, 0, layer.width, layer.height);
}


function drawTileLayer(resourceGetter, ctx, layer, screenoffset, drawrect) {
    const layerrect = layerRect(layer);
    drawrect = drawrect && union(drawrect, layerrect) 
            || layerrect;
    const rect = rect.union(tilerect, tileRectOf(layer));
    const spos = {x: 0, y: 0};
    for (let tpos of rect.positions(tilerect)) {
        spos.x = screenoffset.x + tpos.x * layer.tileWidth;
        spos.y = screenoffset.y + tpos.y * layer.tileHeight;
        const tilesprite = layer.data[tpos.y][tpos.x];
        if (tilesprite) sprite.draw(resourceGetter, ctx, tilesprite, spos);
    }
}
