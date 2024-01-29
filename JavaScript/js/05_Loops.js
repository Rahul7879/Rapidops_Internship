// Skipping parts
// Any part of for can be skipped.
// For example, we can omit begin if we don’t need to do anything at the loop start.


// let i = 0; // we have i already declared and assigned

// for (; i < 3; i++) { // no need for "begin"
//   console.log( i ); // 0, 1, 2
// }
// We can also remove the step part:



// for (; i < 3;) {
//     console.log( i++ );
// }


// This makes the loop identical to while (i < 3).

// We can actually remove everything, creating an infinite loop:

// for (;;) {
//   // repeats without limits
// }
// Please note that the two for semicolons ; must be present. Otherwise, there would be a syntax error.


// tasks

// let i = 4;

// while(i){
//     console.log(i--);
// }
// last value will be 1

// let i = 0;
// while (++i < 5) console.log( i ); // 1,2,3,4

// let i = 0;
// while (i++ < 5) console.log( i ); // 1,2,3,4,5

// for (let i = 2; i <= 10; i++) {
//     if (i % 2 == 0) {
//       console.log( i );
//     }
//   }
// let i = 2;
// while (i <= 10) {
//     if (i % 2 == 0) {
//       console.log(i++);
//     }
//   }


// task 

// let num = 0;

// while( num < 100){
//   num = prompt("enter Number");
//   if(num == "") break;
// }

// alert(num);

// task 

// let num = prompt("Enter Number");
// for(let i = 2; i<=num; i++){
//    let isPrime =  true;
//    for(let j = 2; j<=i/2; j++){
//       if(i%j == 0){
//          isPrime = false;
//          break;
//       }

//    }
//    if(isPrime){
//       document.write(i, " ");
//    }
// }

// rewrite into if else 

// let browser = prompt("Enter browser name");
// switch (browser) {
//    case 'Edge':
//      alert( "You've got the Edge!" );
//      break;
 
//    case 'Chrome':
//    case 'Firefox':
//    case 'Safari':
//    case 'Opera':
//      alert( 'Okay we support these browsers too' );
//      break;
 
//    default:
//      alert( 'We hope that this page looks ok!' );
//  }


// (browser == 'Edge') ?  alert( "You've got the Edge!" ) :
// (browser == 'Chrome' || browser == "Firefox" || browser == "Safari" || browser == "Opera") ?
// alert( 'Okay we support these browsers too' ) :
// alert( 'We hope that this page looks ok!' )


// let num = +prompt("Enter num 1 to 3");
// switch(num){
//    case 0:
//       alert( 0 );
//       break;
//    case 1:
//       alert( 1 );
//       break;
//    case 2:
//    case 3:
//       alert(2,3);
//       break;
// }

