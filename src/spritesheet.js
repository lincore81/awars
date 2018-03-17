const rect = require('./rect');
const sprite = require('./sprite');

module.exports = {create: createSpriteSheet};

function createSpriteSheet(ctx, {id, imageId, columns, spriteWidth, spriteHeight, spriteNames}) {
    const sheet = {id, type: "spritesheet", imageId, columns, spriteWidth, spriteHeight, spriteNames}; 
    const spriteNames = Object.entries(spriteNames);
    const it = spriteNames.map(createSprite);
    it._children = Object.spriteNames.map([name] => name);
    it.push(sheet);
    return it;

    function createSprite([id, index]) {
        const y = Math.floor(index / columns) * spriteHeight;
        const x = index % columns * spriteWidth;
        const srect = rect.xywh(x, y, spriteWidth, spriteHeight);
        const sprite = sprite.create(ctx, {id, imageId, srect});
        sprite._parent = it.id;
        return sprite;
    }
}


