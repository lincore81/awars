
const loadImage = rawLoaderWrapper.bind(null, loadImageRaw);
const loadJson = rawLoaderWrapper.bind(null, loadJsonRaw);

const baseLoaders = {
    image: loadImage,
    json: loadJson,
    list: loadList
};

module.exports = {
    loadResource, rawLoaderWrapper, baseLoaders, dummyLoader,
    loadImage, loadJson, loadList,
    loadImageRaw, loadJsonRaw, loadListRaw
};

function dummyLoader(def) {
    return new Promise(resolve => {
        def.resource = 'this is a dummy resource';
        resolve(def);
    });
}

function rawLoaderWrapper(loader, def) {
    return loader(def.url).then(img => {
        def.resource = img;
        return def;
    });
}

function loadResource(loaders, definition) {
    const type = definition.type;
    const loader = loaders[type];
    definition.loaders = loaders;
    if (!loader) throw new Error(`No loader found for definition: ${definition}`);
    return loader(definition);
}

function loadList(def) {
    return loadListRaw(def.resource, def.loaders, def.onUpdate).then(resources => {
        def.type = 'list';
        def.resource = resources;
        return def;
    });
}

function loadListRaw(list, loaders, onUpdate) {
    const resources = {};
    const total = list.content.length;
    let count = 0;
    const load = loadResource.bind(null, loaders);
    return new Promise((resolve) => {
        const onLoad = def => {
            count++;
            if (def.id) resources[def.id] = def;
            if (onUpdate) onUpdate(def, count, total, resources);
        };
        const promises = list.content.map(def => load(def).then(onLoad));
        Promise.all(promises).then(() => {
            Object.values(resources).forEach(r => {delete r.loaders;});
            resolve(resources);
        });
    });
}


function loadJsonRaw(url) {
    return fetch(url).then(response => response.json());
} 

function loadImageRaw(url) {
    const img = new Image();
    const noDataErr = "Image has no data.";
    return new Promise((resolve, reject) => {
        if (img.naturalWidth) {
            resolve(img);
        } else if (img.complete && img.src) {
            reject(noDataErr);
        } else {
            img.addEventListener('load', fullfill);
            img.addEventListener('error', fullfill);
            img.src = url;
        }

        function fullfill() {
            if (img.naturalWidth) {
                resolve(img);
            } else {
                reject(noDataErr);
            }
            img.removeEventListener('load', fullfill);
            img.removeEventListener('error', fullfill);
        }
    });
}

