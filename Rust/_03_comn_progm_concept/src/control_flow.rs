pub fn main() {
    println!("Control Flow!");
    control_flow()
}

fn control_flow() {

    let condition = true;
    let number = if condition { 5 } else { 6 };

    println!("The value of number is: {number}");

  let age = 16;

  
  let leap_year = if age%4 == 0 && age%100 != 0 || age%400 == 0 {
    true
  } else {
    false
  };
  
  if leap_year {
    println!("It's a leap year! {}", leap_year);
  }


  if age >= 21 {
    println!("You can drink!");
  } else if age >= 18 {
    println!("You can vote!");
  } else if age >= 14 {
    println!("You can drive!");
  } else {
    println!("You can wait!");
  }
}


// fn loop_normal(mut count: i32) {
//     loop {
//      println!("count is {count} using normal loop");
//      count -= 1;
//      if count == 0 {
//          break;
//      }
//     }
//  }
 
//  fn while_loop(mut count: i32) {
//      while count > 0 {
//          println!("count is {count} using while loop");
//          count -= 1;
//      }
//  }
 
//  fn for_loop(mut count: i32) {
//      for count in 0..10 {
//          println!("count is {count} using for loop");
//      }
//  }
 