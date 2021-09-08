import SimpleCalculator, {TooSimple} from "../src/SimpleCalculator";
import {testFolder} from "@ubccpsc310/folder-test";
import exp = require("constants");

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
var expect = chai.expect;

type Input = number[];
type Output = Promise<number>;
type Error = TooSimple;

describe("SimpleCalculator", () => {
    describe("Add", () => {
        it("should add two numbers", async() => {
            const simpleCalculator = new SimpleCalculator();
            const result = await simpleCalculator.add([1, 2]);

            return expect(result).to.equal(3);
        });

        it("should add negative numbers", async() => {
            const simpleCalculator = new SimpleCalculator();
            const result = simpleCalculator.add([-1, -2]);

            return expect(result).to.eventually.equal(-3);
        });

        it("should throw TooSimple if array is empty", async() => {
            const simpleCalculator = new SimpleCalculator();
            const result = simpleCalculator.add([]);

            return expect(result).to.be.rejectedWith(TooSimple);
        })

        testFolder<Input, Output, Error>(
            "Add",
            (input: Input): Output => {
                const simpleCalculator = new SimpleCalculator();
                return simpleCalculator.add(input);
            },
            "./test/resources",
            {
                errorValidator: (error): error is TooSimple =>
                    error === "TooSimple",
                assertOnError(expected, actual) {
                    expect(actual).to.be.instanceof(TooSimple);
                }
            }
        )
    });


});
