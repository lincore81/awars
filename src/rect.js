module.exports = {
    xywh, xy1xy2, union, rightOf, bottomOf, bottomRightOf
};

function xywh(x, y, width, height) {
    return {x, y, width, height};
}

function xy1xy2(x1, y1, x2, y2) {
    return {
        x: x1,
        y: y1,
        width: x2 - x1,
        height: y2 - y1
    };
}

function rightOf({x, width}) {
    return x + width;
}

function bottomOf({y, height}) {
    return y + height;
}

function bottomRightOf({x, y, width, height}) {
    return {x: x + width, y: y + height};
}

function union(a, b) {
    const minx = Math.max(a.x, b.x),
          miny = Math.max(a.y, b.y),
          maxx = Math.min(a.x + a.width, b.x + b.width),
          maxy = Math.min(a.y + a.height, b.y + b.height),
          it =  xy1xy2(minx, miny, maxx, maxy);
    return (it.width > 0 && it.height > 0)
        ? it
        : undefined;
}

function translate(rect, mx, my) {
    return xywh(rect.x + mx, rect.y + my, rect.width, rect.height);
}

function* positions(rect, step) {
    step = step || {x: 1, y: 1};
    const x2 = rightOf(rect);
    const y2 = bottomOf(rect);
    let pos = {};
    for (let my = rect.y; my < y2; my + step.y) {
        for (let mx = rect.x; mx < x2; mx++ + step.x) {
            pos.x = mx;
            pos.y = my;
            yield pos;
        }
    }
}
