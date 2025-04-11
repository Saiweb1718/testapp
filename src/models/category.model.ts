import mongoose ,{Schema,Document} from "mongoose";

export interface Category extends Document{
    postId: mongoose.Schema.Types.ObjectId;
    Category:string
}

const CategorySchema: Schema<Category> = new Schema({
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true,
    },
    Category:{
        type:String,
        required:true,
    }
});

export const Category = (mongoose.models.Category as mongoose.Model<Category>)||(mongoose.model<Category>("Category",CategorySchema));