// 7. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ to​ ​ get​ ​ the​ ​ month​ ​name​ ​ from​ ​ a ​ ​ particular​ ​ date.

let months = ['jan','feb','mar','apr','may', 'june','july','aug','sep','oct','nov','dec'];

function getMonth(date){
  let newDate = +date.substring(3,5);
  console.log(newDate);
  console.log(months[newDate-1]);
//   return newDate;
}

getMonth("03-01-2025");
getMonth("09/11/2021");