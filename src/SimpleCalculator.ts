export class TooSimple extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, TooSimple);
    }
}

export default class SimpleCalculator {
    add(nums: number[]) : Promise<number> {
        if (nums.length < 1) {
            return Promise.reject(new TooSimple());
        }

        return Promise.resolve(nums.reduce((prevVal, currentVal) => prevVal + currentVal));
    }
}
