function deepClone(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  let clone = {};
  for (let key in obj) {
    clone[key] = deepClone(obj[key]);
  }

  return clone;
}

const obj1 = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    state: "NY"
  }
};

const obj2 = obj1;
obj2.address.city = "Los Angeles";
console.log(obj1.address.city); 