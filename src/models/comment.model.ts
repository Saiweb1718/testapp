import mongoose ,{Schema,Document} from "mongoose";

export interface Comment extends Document{
    postId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    comment: string;
}

export const CommentSchema: Schema<Comment> = new Schema({
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    comment:{
        type:String,
        required:true,
    }
});

export const Comment = (mongoose.models.Comment as mongoose.Model<Comment>)||(mongoose.model<Comment>("Comment",CommentSchema));