import {model,Schema} from 'mongoose'
import mongoose from 'mongoose'
import validator from 'validator'

const studentSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
    },
    name:{
        type:String,
        required:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    age:{
        type:Number,
        required:true,
        validate(value){
            if(value<=0){
                throw new Error("Enter correct age");
            }
        }
    },
}) 

// we will create new collection
const Student=new mongoose.model("Student",studentSchema);

export default Student;