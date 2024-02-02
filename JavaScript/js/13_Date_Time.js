// "use strict"
// let now = new Date();
// console.log(now); // 2024-02-02T11:09:53.525Z

// // 0 means 01.01.1970 UTC+0
// let Jan01_1970 = new Date(0);
// console.log( Jan01_1970 );

// // now add 24 hours, get 02.01.1970 UTC+0
// let Jan02_1970 = new Date(10*24 * 3600 * 1000);
// console.log( Jan02_1970 )

// let date = new Date("2003-05-08");
// console.log(date); //  2017-01-26T00:00:00.000Z

// console.log(now.getFullYear());
// console.log(now.getMonth());
// console.log(now.getDate());
// console.log(now.getDay());
// console.log(now.getHours());
// console.log(now.getMinutes());
// console.log(now.getTimezoneOffset());
// console.log(now.getSeconds());
// console.log(now.getTime());


// tasks-01

// let date = new Date(2012,1,20,3,12);
// console.log(date);

// task-02 

// function getWeekDay(date) {
//     let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
//     return days[date.getDay()];
//   }
  
//   let date = new Date(2003,4,7); // 
//   console.log( getWeekDay(date) ); // FR

// task-03

// function getLocalDay(date) {

//     let day = date.getDay();
  
//     if (day == 0) 
//       day = 7;
//     }
  
//     return day;
//   }