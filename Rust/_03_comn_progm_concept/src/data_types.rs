pub fn main(){
    // scaller_data_types()
    compound_data_types()
}

fn scaller_data_types() {

    println!("Scaler Data Types!");

    let guess: u32 = "42".parse().expect("Not a number rahul!");
    println!("Number is {guess}");

    // signed vs unsigned

    // signed
    let num = 20; // range -128 to 127
    println!("Number is {num}");

    // unsigned
    let num = 200u8; //  range 0 to 255 (if we need to store large number that can not be negative)
    println!("Number is {num}");

    // float // 32 bit floating point
    let f = 100/3;
    println!("Number is {f}");
    let f = 100.0/3.0;
    println!("Number is floating {f}");
    let f_32 : f32 = 64.03344;
    println!("Number is {f_32}");

    let c = 'R';
    let ch: char = 'a';
    println!("Character is {c} {ch}");

    let b = false;
    let bb: bool = false;
    println!("Boolean is {b} {bb}");
}

fn compound_data_types() {
 println!("Compound Data Types!");

//  tuple 

let x: (i32, f64, u8) = (500, 6.4, 1);
let five_hundred = x.0;
let six_point_four = x.1;
let one = x.2;

println!("Number is {five_hundred} {six_point_four} {one}");

//  array

let a = [1, 2, 3, 4, 5];
let first = a[0];
let second = a[1];
println!("Number is {first} {second}");

let a = [3; 5];
let first = a[2];
let second = a[3];
println!("Number is {first} {second}");

let a : [i32; 5] = [1, 2, 3, 4, 5];
let first = a[0];
let second = a[4];
println!("Number is {first} {second}");

}

// pub fn main() {
//     println!("Data Types!");
// // Data Types are two Types

// // 1. Scalar-  we can store only single value
// // Integer, Floating Point, Boolean, Character, String,char

// // lenght (8bit 16,32,64,128 bit) signed(i)-i32/unsigned(u)-u32
   
//  let num = 20;
//  println!("Number is {num}");

// //  boolean 

// let isRaining = true;
// println!("Is raining {isRaining}");

// // mutable 

// let mut isRaining = true;
// println!("Is raining {isRaining}");
// isRaining = false;
// println!("Is raining {isRaining}");

// // Floating

// let num = 2.0;
// println!("Number is {num}");

// let num = 3.0;
// println!("Number is {num}");


// // 2. Compound-  we can store multiple values
// // Tuple, Array, dictionary

// // tuple 

// let tup = (10, 20, 30.5);
// println!("Tuple {:?}", tup);

// println!("first index of tuple {} h",tup.1);

// // mutable 
// let mut tup: (i32,u8,char) = (10,20,'a');
// println!("Tuple {:?}", tup);

//  tup.0 = 20;
// println!("Tuple {:?}", tup);


// // Array 

// let a= [10,20,30];
// println!("Array {:?}", a);
// println!("first index of array {} h",a[1]);


// // mutable 

// let mut a= [10,20,30];
// println!("Array {:?}", a);
// a[0] = 20;
// println!("Array {:?}", a);  

// }

