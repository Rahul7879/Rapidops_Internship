fn main() {

    hello_world();
}

fn hello_world() {
    print!("Hello, world! print ");
    println!("Hello, world! println");
    // format!("Hello, world! format");
    eprint!("Hello, world! eprint ");

    println!("one {1} zero {0} two {2} one{1} zero {0} two {2}", "zero", "one", "two");

    println!("{subject} {verb} {object}",object="the lazy dog",subject="the quick brown fox",verb="jumps over");
    
    println!("Base 10:               {}",   69420);
    println!("Base 2 (binary):       {:b}", 8); 
    println!("Base 8 (octal):        {:o}", 69420); 
    println!("Base 16 (hexadecimal): {:x}", 69420); 



    println!("{number:>8}", number=1876);

    println!("{number:0>5}", number=1);
  
    println!("{number:0<5}", number=1); // 10000

    println!("{number:0>width$}", number=1, width=5);

    let number: f64 = 1.0;
    let width: usize = 5;
    println!("{number:>width$}");
}