"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessValue = void 0;
function accessValue(root, absolutePaths, path) {
    const mappers = [root];
    let currentTrace = {
        _p: () => null,
        _r: () => root,
        ...root
    };
    absolutePaths.forEach((x) => {
        if (typeof (currentTrace) != 'object') {
            return;
        }
        currentTrace = {
            _p: () => currentTrace,
            _r: () => root,
            ...currentTrace[x]
        };
        mappers.push(currentTrace);
    });
    const parent = mappers[mappers.length - 2];
    let func = p => p;
    if (typeof (path) === 'string') {
        func = eval("(p) => p." + path);
    }
    else if (typeof (path) === 'function') {
        func = path;
    }
    return func(parent);
}
exports.accessValue = accessValue;
