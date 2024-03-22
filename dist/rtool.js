"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.R = exports.RTool = void 0;
const moment_1 = __importDefault(require("moment"));
const common_1 = require("./common");
const uuid_1 = require("uuid");
const accessValue_1 = require("./accessValue");
class RTool {
    static AnyOf(...options) {
        return options[Math.floor(Math.random() * options.length)];
    }
    static Between(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static Guid() {
        return (0, uuid_1.v4)();
    }
    static Date(startDate, endDate, format) {
        const start = (0, moment_1.default)(startDate);
        const end = (0, moment_1.default)(endDate);
        // Calculate the range in milliseconds
        const range = end.diff(start);
        // Generate a random number within the range
        const randomRange = Math.random() * range;
        // Add the random number of milliseconds to the start date
        const randomDate = start.add(randomRange, 'milliseconds');
        // Format the random date using the provided format
        const formattedDate = randomDate.format(format);
        return formattedDate;
    }
}
exports.RTool = RTool;
class R {
    static SameAs(path) {
        return new common_1.RGenerator((_, context) => {
            const { root, absolutePaths } = context;
            return (0, accessValue_1.accessValue)(root, absolutePaths, path);
        }, 1);
    }
    static AnyOf(...options) {
        return new common_1.RGenerator(() => RTool.AnyOf(...options));
    }
    static Between(min, max) {
        return new common_1.RGenerator(() => RTool.Between(min, max));
    }
    static Guid() {
        return new common_1.RGenerator(() => RTool.Guid());
    }
    static Date(startDate, endDate, format) {
        return new common_1.RGenerator(() => RTool.Date(startDate, endDate, format));
    }
    static Array(rGenerator) {
        return new RArray(rGenerator);
    }
    static Object(obj) {
        return new RObject(obj);
    }
}
exports.R = R;
class RArray extends common_1.RGenerator {
    constructor(obj) {
        const func = () => {
            const result = [];
            const length = RTool.Between(this.from, this.to);
            for (let i = 0; i < length; i++) {
                let tempObj = (0, common_1.transformRecursively)(obj, {
                    onGeneratorIsFound: (x) => x.generate()
                });
                result.push(tempObj);
            }
            return result;
        };
        super(func);
        this.from = 1;
        this.to = 1;
    }
    withLengthBetween(from, to) {
        this.from = from;
        this.to = to;
        return this;
    }
}
class RObject extends common_1.RGenerator {
    constructor(format) {
        let func = () => {
            let tempObj = (0, common_1.transformRecursively)(format, {
                onGeneratorIsFound: (x) => x.generate()
            });
            tempObj = (0, common_1.transformRecursively)(tempObj, {
                onGeneratorIsFound: (x, absolutePaths) => {
                    let res = x.generate(1, {
                        root: tempObj,
                        absolutePaths
                    });
                    return res;
                }
            });
            return tempObj;
        };
        super(func);
    }
}
