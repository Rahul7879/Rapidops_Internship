const { expect } = require("chai")
const Calculator = require("../src/calculator")

describe("hook testing",function(){
    let calc;
    before(()=>{
         calc = new Calculator(); //  we should add that is command and required for every test case
        console.log("before")
    })
    beforeEach(()=>{
        console.log("before Each")
    })


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
    it.skip("should return division",function(){
        const result = calc.divide(30,6);
        expect(result).to.equal(5)
    })
    
    afterEach(()=>{
        console.log("after Each")
    })
    after(()=>{
        console.log("after")
    })
})