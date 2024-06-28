fn main() {
    println!("Loops");
    // types of loops in rust

    // 1. while loop
    while_loop(10);
    // 2. for loop
    for_loop(100);
    // 3. loop - "not recommeded"
    loop_normal(10);
}

fn loop_normal(mut count: i32) {
   loop {
    println!("count is {count} using normal loop");
    count -= 1;
    if count == 0 {
        break;
    }
   }
}

fn while_loop(mut count: i32) {
    while count > 0 {
        println!("count is {count} using while loop");
        count -= 1;
    }
}

fn for_loop(mut count: i32) {
    for count in 0..10 {
        println!("count is {count} using for loop");
    }
}
