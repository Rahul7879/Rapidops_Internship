struct User {
    name : String,
    company: String,
    age: u32
}
fn main() {
    println!("Struct Practice!");

    let user_one = User {
        name : String::from("Rahul Singh Rajput"),
        company: String::from("RapidOps"),
        age: 21
    };

    println!("Name : {} Company : {} Age : {}", user_one.name, user_one.company, user_one.age);

    
}
