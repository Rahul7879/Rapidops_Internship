pub fn main(){
    println!("Hello, world! from variable_mutability" );


    let mut x = 5;
    // let x = 6; // error
    println!("The value of x is: {x}");
    x = 6;
    println!("The value of x is: {x}");
    
    // option without mut
    let y = 5;
    let y = y + 12;
    // let y = "rahulsingh rahut"; // also valid

    {
        let y = y * 2;
        println!("The value of y in the inner scope is: {y}");
    }

    println!("The value of y is: {y}");


    let mut z = 100;
    println!("The value of z is: {z}");
    // z = "hundred"; // error
    println!("The value of z is: {z}");
}