import mongoose from 'mongoose'

// mongodb://127.0.0.1:27017/database_name
const connectToDb=async ()=>{
    await mongoose.connect("mongodb+srv://admin:admin12345@collection.kspzcld.mongodb.net/userData")
    .then(() => {
        console.log("Connection is successful");
    }).catch((e) => {
        console.log("Connection failed");
    })
}


export default connectToDb;

