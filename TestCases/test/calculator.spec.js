const { expect } = require("chai");
const Calculator = require("../src/calculator")

const calc = new Calculator()


describe("Calculator testing test cases", function(){
    it("should return sum",function(){
        const result = calc.add(3,6);
        expect(result).to.equal(9)
    })
    it("should return sub",function(){
        const result = calc.sub(3,6);
        expect(result).to.equal(-3)
    })
    it("should return mul",function(){
        const result = calc.mul(3,6);
        expect(result).to.equal(18)
    })
    it("should return division",function(){
        const result = calc.divide(30,6);
        expect(result).to.equal(5)
    })
})