// fn main() {
//     println!("Hello, world!");
//     ownership();
// }

// fn ownership() {
//     let num = 40;
    
//     let new_num = num; 
//     println!("{} {}", new_num,num);

//     let s1 = String::from("hello RAHUL");

//     let s2 = & s1;

//     // let len = calculate_lenght(&s1);
//     println!("The length of '{}' is {}.", s1,s2);
// }

// fn calculate_lenght(s: &String) -> usize {
//     s.len()
// }



// fn main() {
//     let s1 = String::from("hello");

//     let (s2, len,num) = calculate_length(s1);

//     println!("The length of '{s2}' is {len}. {num}");
// }

// fn calculate_length(s: String) -> (String, usize,i32) {
//     let length = s.len(); // len() returns the length of a String

//     (s, length,100)
// }



// fn main() {
//     let s1 = gives_ownership();         // gives_ownership moves its return
//                                         // value into s1

//     let s2 = String::from("hello");     // s2 comes into scope

//     let s3 = takes_and_gives_back(s2);  // s2 is moved into
//                                         // takes_and_gives_back, which also
//       println!("{} {} {}", s1, s2, s3);                                   // moves its return value into s3
// } // Here, s3 goes out of scope and is dropped. s2 was moved, so nothing
//   // happens. s1 goes out of scope and is dropped.

// fn gives_ownership() -> String {             // gives_ownership will move its
//                                              // return value into the function
//                                              // that calls it

//     let some_string = String::from("yours"); // some_string comes into scope

//     some_string                              // some_string is returned and
//                                              // moves out to the calling
//                                              // function
// }

// // This function takes a String and returns one
// fn takes_and_gives_back(a_string: String) -> String { // a_string comes into
//                                                       // scope

//     a_string  // a_string is returned and moves out to the calling function
// }



