fn main() {
    println!("Control Flow!");

    control_flow()
}

fn control_flow() {
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