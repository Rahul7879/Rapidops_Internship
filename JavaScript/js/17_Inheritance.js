class User{
    constructor(username,id){
        this.username = username;
        this.id = id;
    }
    LogMe(){
        console.log(`User Name is in Parent ${this.username}`);
    }
    static ShowId(){
        console.log(this.id) //its not accessible outside of class
    }
}

class NewUser extends User{
    constructor(username,password,email){
        super(username),
        this.email = email,
        this.password = password
    }
    addUser(){
        console.log(`NewUser Created ${this.username} `)
    }
}

let user1 = new NewUser("rahul","pass1234","rahul@gmail.com")
user1.addUser();
let user2 = new User("Rahul Singh Rajput",7879);
user2.ShowId();

console.log(user1 instanceof User);