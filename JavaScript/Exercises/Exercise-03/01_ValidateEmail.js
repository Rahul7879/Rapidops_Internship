// 1. Write​ ​ a ​​ pattern​ ​ that​ ​can identify an​ ​ e-mail​ ​ address.

let email = ""
function Check(){
     email = prompt("Enter Email")
     if(email.indexOf('@') != email.lastIndexOf('@') || email.includes(" ") || !email.includes('@') || !email.includes('.') || email[0] == '@' || email[0] == '.' || email[email.length-1] == '@' || email[email.length-1] == '.' ){
          alert("Wrong Email! Enter again ")
         return false
     }
     let domain = email.substring(email.indexOf('@'));
     if(email.indexOf('.') != email.lastIndexOf('.') && email.lastIndexOf('.') - email.indexOf('.') >= 2){
          alert("Wrong Email! Enter again ")
          return false;
     }
     alert("Right")
     return true;
}

do{
     Check();
}while(!Check(email))




 

