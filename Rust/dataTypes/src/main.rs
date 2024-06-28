fn main() {
    println!("Data Types!");
// Data Types are two Types

// 1. Scalar-  we can store only single value
// Integer, Floating Point, Boolean, Character, String,char

// lenght (8bit 16,32,64,128 bit) signed(i)-i32/unsigned(u)-u32
   
 let num = 20;
 println!("Number is {num}");

//  mutable 

 let mut num = 2;
 println!("Number is {num}");
 num = 3;
 println!("Number is {num}");

//  boolean 

let isRaining = true;
println!("Is raining {isRaining}");

// mutable 

let mut isRaining = true;
println!("Is raining {isRaining}");
isRaining = false;
println!("Is raining {isRaining}");

// Floating

let num = 2.0;
println!("Number is {num}");

let num = 3.0;
println!("Number is {num}");


// 2. Compound-  we can store multiple values
// Tuple, Array, dictionary

// tuple 

let tup = (10, 20, 30.5);
println!("Tuple {:?}", tup);

println!("first index of tuple {} h",tup.1);

// mutable 
let mut tup: (i32,u8,char) = (10,20,'a');
println!("Tuple {:?}", tup);

 tup.0 = 20;
println!("Tuple {:?}", tup);


// Array 

let a= [10,20,30];
println!("Array {:?}", a);
println!("first index of array {} h",a[1]);
}

// mutable 

let mut a= [10,20,30];
println!("Array {:?}", a);
a[0] = 20;
println!("Array {:?}", a);  

