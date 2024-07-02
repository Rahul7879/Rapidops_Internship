pub fn main() {
    println!("Hello, world!");

    first_function();
    second_function(10);
    third_function(10, 'A');

    let x = return_function(10);
    println!("Expression function {x}");

    let y = {
        let x = 3;
        x + 1
    };

    println!("The value of y is: {y}");
}


// simple function

fn first_function() {
    println!("First function");
}

// pass single parameter

fn second_function(x: i32) {
    println!("Second function {}", x);
}

// multi paramerter function

fn third_function(x: i32, y: char)  {
    println!("Third function integer {x} character {y}");
}

// expressions 

fn return_function(x: i32) -> i32 {
    x + 1
    // expression function are used to return value
    // while returning value we have to declare returing data type
}

