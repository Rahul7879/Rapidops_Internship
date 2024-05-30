const { default: axios } = require("axios");
const baseUrl = 'https://jsonplaceholder.typicode.com';
class Calculator {
   add(a,b){
    return a+b;
   }
   sub(a,b){
    return a-b;
   }
   mul(a,b){
    return a*b;
   }
   divide(a,b){
    return a/b;
   }
   modulo(a,b){
    return a%b;
   }
   asysncFunction(){
    return new Promise((res,rej)=>{
         setTimeout(()=>{
            res("resolved")
         },2000)
    })
   }

 async  getUser(){
    return await axios.get(`${baseUrl}/users/1`);
}

 async saveUser(userPayload){
    return await axios.post(`${baseUrl}/users`, userPayload)
};
}

module.exports = Calculator