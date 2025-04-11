import mongoose , {Schema,Document} from "mongoose";

export interface Tag extends Document{
    postId: mongoose.Schema.Types.ObjectId;
    tag: string;
}

export const TagSchema: Schema = new Schema({
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true,
    },
    tag:{
        type:String,
        required:true,
    }
})