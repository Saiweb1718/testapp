import mongoose , {Schema,Document} from "mongoose";

export interface Reaction extends Document{
    postId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    reaction: string;
}

const EMOJIS = ["👍", "❤️", "😂", "😢", "😠"] as const;

export const ReactionSchema: Schema<Reaction> = new Schema({
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
    reaction:{
        type:String,
        enum: EMOJIS,
        required:true,
    }
});

export const Reaction = (mongoose.models.Reaction as mongoose.Model<Reaction>)||(mongoose.model<Reaction>("Reaction",ReactionSchema));