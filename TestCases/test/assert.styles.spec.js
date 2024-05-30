const { expect,should,assert } = require("chai");


describe("assert style", () => {
    it("EXPECT assertion style", () => {
    
      const name = "kumar";
      const age = 30;
      const objData = { name: "kumar", age: 30 };
      const arrData = [1, 2, 3];
      const boolData = true;

      expect(name).to.be.ok;
      expect(name).to.be.equal("kumar");
      expect(name).to.be.a("string");
          expect(age).to.be.ok;
      expect(age).to.be.equal(30);
      expect(age).to.be.a("number");
      expect(objData).to.be.ok;
      expect(objData).to.be.a("object");
      expect(objData).to.have.property("name").equal("kumar");
      expect(objData).to.have.property("age").equal(30);
      expect(arrData).to.be.ok;
      expect(arrData).to.have.lengthOf(3);
      expect(arrData).to.have.lengthOf(3).that.include(2);
      expect(arrData).to.not.have.lengthOf(4).that.does.not.include(5);
      expect(arrData).to.be.a("array");
    
      expect(boolData).to.be.ok;
      expect(boolData).to.be.a("boolean");
      expect(boolData).to.be.true;
    });
  
    it("SHOULD assertion style", () => {
      should();
    
      const name = "kumar";
      const age = 30;
      const objData = { name: "kumar", age: 30 };
      const arrData = [1, 2, 3];
      const boolData = true;
                   name.should.be.ok;
      name.should.be.equal("kumar");
      name.should.be.a("string");
          age.should.be.ok;
      age.should.be.equal(30);
      age.should.be.a("number");
          objData.should.be.ok;
      objData.should.be.a("object");
      objData.should.have.property("name").equal("kumar");
      objData.should.have.property("age").equal(30);
         arrData.should.be.ok;
      arrData.should.have.lengthOf(3);
      arrData.should.have.lengthOf(3).that.include(2);
      arrData.should.not.have.lengthOf(4).that.does.not.include(5);
      arrData.should.be.a("array");
    
      boolData.should.be.ok;
      boolData.should.be.a("boolean");
      boolData.should.be.true;
    });
  
    it("ASSERT assertion style", () => {
    
      const name = "kumar";
      const age = 30;
      const objData = { name: "kumar", age: 30 };
      const arrData = [1, 2, 3];
      const boolData = true;
                   assert.isOk(name);
      assert.equal(name, 'kumar');
      assert.typeOf(name, 'string');
     
          assert.typeOf(objData, 'object');
      assert.deepEqual(objData ,  { name: "kumar", age: 30 })
         assert.typeOf(arrData, 'array');
      assert.deepEqual(arrData , [1, 2, 3])
      assert.include(arrData , 2);
    
      assert.typeOf(boolData, 'boolean');
      assert.equal(boolData , true);
    });
  });