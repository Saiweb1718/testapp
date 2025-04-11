import mongoose ,{ Schema,Document } from "mongoose";

export interface User extends Document{
    _id:string;
    username?: string;
    email: string;
    password?: string;
    verifycode?:string;
    codeExpiry?:Date;
    isVerified:boolean;
    groups?:mongoose.Schema.Types.ObjectId[];
    provider:"google" |"credentials";
}

const UserSchema: Schema<User> = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        validate:{
            validator: strongPassword,
            message: 'Password is not strong enough'
        }
    },
    verifycode:{
        type:String,
        required:[true,"Verifycode is must"]
    },
    codeExpiry:{
        type:Date,
        required:[true,"Code expiry is must"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    groups:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group",
    }],
    provider:{
        type:String,
        enum:["google","credentials"],
        default:"credentials"
    }

},{timestamps:true}); 

export const User =  (mongoose.models.User as mongoose.Model<User>)||mongoose.model<User>("User",UserSchema);


function strongPassword(value: string) {
    return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
  }
