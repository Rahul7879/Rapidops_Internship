pub fn main()  {
    println!("Exerices!");
    convert_temp("c_2_f",55);
    convert_temp("f_2_c",64);

    let vec = gen_n_fabonacci(5);
    println!("{:?}",vec);
}

fn convert_temp(con_type: &str,temp:i32){
    if con_type == "c_2_f"{
        let f = (temp * 9/5) + 32;
        println!("{} C to F is {}",temp,f);
    }else if con_type == "f_2_c"{
        let c = (temp - 32) * 5/9;
        println!("{} F to C is {}",temp,c);
    }
}


fn gen_n_fabonacci(num:i32) -> i32{
    let mut vec = 0;
    for i in 0..num{
        vec = vec + i;
    }
    return vec;
}