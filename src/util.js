
const clamp = (min, max, n) => Math.min(max, Math.max(min, n));

module.exports = {
    clamp,
    clmap01: clamp.bind(null, 0, 1),
    clamp0x: clamp.bind(null, 0)
};

