const { describe } = require("mocha");
const Calculator = require("../src/calculator");
const { expect } = require("chai");

describe("testting with async function ", function(){
    let calc = new Calculator();

    it("first funtion with async await", async function(){
        // calc = new Calculator();
        const result = await calc.asysncFunction();

        expect(result).to.equal("resolved")
    })

    it("first funtion with primises",  function(){
        // calc = new Calculator();
      calc.asysncFunction().then(result=>{
          expect(result).to.equal("resolved")
      })

    })
})