pub fn practice(){
    println!("Practice code");
    main();

}

// fn main() {
//     // let s1 = String::from("hello");
//     let s1 : &str = "hello";
//     let s2 = s1;
//     println!("s1: {}", s1);
//     println!("s2: {}", s2);
// }

// fn main() {
//     let s1 = String::from("hello");
//     let s2 = s1.clone();
//     println!("s1: {}", s1);
//     println!("s2: {}", s2);
// }

// fn main() {
//     let mut s = String::from("hello");
//     modify_string(& mut s);
//     println!("Modified string: {}", s);
//     print!("Original string:  {}",&s[3..4]);
// }
// fn modify_string(s: &mut String) {
//     s.push_str(", world!");
// }

// fn main() {
//     let s = String::from("hello");
//     let len = calculate_length(&s);
//     println!("The length of '{}' is {}.", s, len);
// }
// fn calculate_length(s: &String) -> usize {
//     s.len()
// }


// fn main() {
//     let mut s = String::from("hello");
//     let r1 = &s;
//     let r2 = &s;
//     let r3 = & mut s;
//     println!("r1: {}, r2: {}, r3: {}", r1, r2, r3);
// }


// fn main() {
//     let s1 = String::from("hello");
//     let r1 = &s1;
//     let r2 = &s1;
//     println!("r1: {}, r2: {}", r1, r2);
//     let s2 = s1.clone();
//     println!("s1: {}, s2: {}", s1, s2);
// }


fn main() {
    let mut s = String::from("hello");
    let r1 = &s;
    let r2 = &s;
    println!("r1: {}, r2: {}", r1, r2);
    println!("r1: {}, r2: {}", r1, r2);

    let r3 = &mut s;
    r3.push_str(", world!");
    println!("r3: {}", r3);
    // Uncommenting the following line would result in a compilation error:
    // println!("r1: {}, r2: {}", r1, r2);
}



