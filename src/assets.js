const assert = require('assert');

function createAssetMap() {
    return new Map();
}

function hasAsset(ctx, id, type) {
    return ctx.has(id) && (!type || ctx.get(id).type === type);
}

function addAsset(ctx, asset, replace) {
    if (Array.isArray(asset)) {
        asset.forEach(addAsset.bind(ctx));
        return;
    }
    assert(asset.id && typeof asset.id === 'string', `asset must have a non-empty field 'id' of type 'string'`);
    assert(asset.type && typeof asset.type === 'string', `asset must have a non-empty field 'type' of type 'string'`);
    assert(hasAsset(ctx, asset.id) && !replace, `Another asset with the id ${asset.id} already exists.`);
    ctx.set(asset.id, asset);
}

function getAsset(ctx, id, type) {
    const it = ctx.get(id);
    return it.type !== type
        ? undefined
        : it;
}
