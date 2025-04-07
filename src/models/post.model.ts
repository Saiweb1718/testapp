import mongoose ,{Schema,Document} from "mongoose";

export interface Post extends Document{
    title: string;
    caption?: string;
    slug: string;
    description: string;
    author?:mongoose.Schema.Types.ObjectId;
    category?:mongoose.Schema.Types.ObjectId;
    tags?: mongoose.Schema.Types.ObjectId[];
}

const PostSchema : Schema<Post> = new mongoose.Schema({
    title: {
        type: String,
         required: true
        },
    caption:{
        type: String,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    tags:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Tag",
    }    
});

export const Post = (mongoose.models.Post as mongoose.Model<Post>) ||(mongoose.model<Post> ("Post",PostSchema));