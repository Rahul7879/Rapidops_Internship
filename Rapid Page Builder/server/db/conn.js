import mongoose from "mongoose";

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://rahul:Rahul%4078@cluster0.hcsja8k.mongodb.net/');
}

main().then((ms)=>{
    console.log("Db connecred successfully");
})