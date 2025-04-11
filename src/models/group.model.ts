import mongoose ,{Document, Schema} from "mongoose";

export interface Group extends Document {
    name: string;
    description: string;
    members: mongoose.Schema.Types.ObjectId[];
    admins: mongoose.Schema.Types.ObjectId[];
    posts: mongoose.Schema.Types.ObjectId[];
    tags?: mongoose.Schema.Types.ObjectId[];
    category?: mongoose.Schema.Types.ObjectId[];
    image?: string;
    // slug: string;
}

const GroupSchema : Schema<Group> = new mongoose.Schema({
        name :{
            type:String,
            required:true,
            unique:true,
            trim:true,
        },
        description:{
            type:String,
            required:true,
        },
        members:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }],
        admins:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }],
        posts:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post",
        }],
        tags:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Tag",
        }],
        category:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category",
        }],
        image:{
            type:String,
        },
});

export const Group = (mongoose.models.Group as mongoose.Model<Group>) ||(mongoose.model<Group>("Group",GroupSchema));