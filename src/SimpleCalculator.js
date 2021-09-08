"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooSimple = void 0;
class TooSimple extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, TooSimple);
    }
}
exports.TooSimple = TooSimple;
class SimpleCalculator {
    add(nums) {
        if (nums.length < 1) {
            return Promise.reject(new TooSimple());
        }
        return Promise.resolve(nums.reduce((prevVal, currentVal) => prevVal + currentVal));
    }
}
exports.default = SimpleCalculator;
