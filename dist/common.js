"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RGenerator = exports.transformRecursively = void 0;
function transformRecursively(obj, events, paths) {
    let { onIteratingObject, onGeneratorIsFound, onPrimitiveIsFound } = events;
    if (!onIteratingObject) {
        onIteratingObject = (x, breakFurtherFunc, paths0) => breakFurtherFunc(x, paths0);
    }
    if (!onGeneratorIsFound) {
        onGeneratorIsFound = (x) => x;
    }
    if (!onPrimitiveIsFound) {
        onPrimitiveIsFound = (x) => x;
    }
    if (!paths) {
        paths = [];
    }
    let newObj = obj;
    if (typeof newObj === 'object') {
        if (newObj instanceof RGenerator) {
            return onGeneratorIsFound(newObj, paths);
        }
        const breakFurtherFunc = (o, paths0) => {
            if (Array.isArray(o)) {
                return o.map((x, idx) => transformRecursively(x, events, [...paths0, idx]));
            }
            else {
                const otherObj = {};
                for (const key in o) {
                    otherObj[key] = transformRecursively(o[key], events, [...paths0, key]);
                }
                return otherObj;
            }
        };
        newObj = onIteratingObject(newObj, breakFurtherFunc, paths);
    }
    else {
        newObj = onPrimitiveIsFound(newObj, paths);
    }
    return newObj;
}
exports.transformRecursively = transformRecursively;
class RGenerator {
    constructor(func, phase = 0) {
        this.funcs = [func];
        this.phase = phase;
    }
    generate(phaseCheck = 0, context = {}) {
        if (typeof (phaseCheck) == 'number' && this.phase > phaseCheck) {
            return this;
        }
        if (typeof (phaseCheck) == 'function' && this.phase > phaseCheck()) {
            return this;
        }
        let res = null;
        this.funcs.forEach((func) => {
            res = func(res, context);
        });
        return res;
    }
    asString() {
        this.funcs.push((res) => (res).toString());
        return this;
    }
    mappedInto(mapper) {
        this.funcs.push((res) => mapper[res]);
        return this;
    }
    transformedInto(func) {
        this.funcs.push(func);
        return this;
    }
}
exports.RGenerator = RGenerator;
