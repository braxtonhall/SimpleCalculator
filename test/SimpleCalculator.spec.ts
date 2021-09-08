import SimpleCalculator, {TooLarge, TooSimple} from "../src/SimpleCalculator";
import {testFolder} from "@ubccpsc310/folder-test";

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
const expect = chai.expect;

type Input = number[];
type Output = Promise<number>;
type Error = "TooSimple" | "TooLarge";

describe("SimpleCalculator", () => {
    describe("Add", () => {

        let simpleCalculator: SimpleCalculator;
        beforeEach(() => {
            simpleCalculator = new SimpleCalculator();
        });

        it("should add two numbers", async function() {
            const result = await simpleCalculator.add([1, 2]);

            return expect(result).to.equal(3);
        });

        it("should add negative numbers", async function() {
            const result = simpleCalculator.add([-1, -2]);

            return expect(result).to.eventually.equal(-3);
        });

        it("should throw TooSimple if array is empty", async function() {
            const result = simpleCalculator.add([]);

            return expect(result).to.be.rejectedWith(TooSimple);
        });

        it("should throw TooLarge if there is a number above 1000", async function() {
            const result = simpleCalculator.add([1001, 1]);

            return expect(result).to.be.rejectedWith(TooLarge);
        });

        testFolder<Input, Output, Error>(
            "Add",
            (input: Input): Output => {
                const simpleCalculator = new SimpleCalculator();
                return simpleCalculator.add(input);
            },
            "./test/resources",
            {
                errorValidator: (error): error is Error =>
                    error === "TooSimple" || error === "TooLarge",
                assertOnError(expected, actual) {
                    if (expected === "TooSimple") {
                        expect(actual).to.be.instanceof(TooSimple);
                    } else if (expected === "TooLarge") {
                        expect(actual).to.be.instanceof(TooLarge)
                    } else {
                        expect.fail("UNEXPECTED ERROR");
                    }
                }
            }
        )
    });


});
