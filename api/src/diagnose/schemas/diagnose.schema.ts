import * as mongoose from 'mongoose';

export const DiagnoseSchema = new mongoose.Schema({
        title: {
            type: String,
            unique: true,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        ownership: {
            type: String,
            required: true
        },
        comments:[{"content": String, "owner": String, "_ownerid": String}],
        likeArray:[String],
        likeCount:Number,
        tag:String
    }, 
    {
  timestamps: true
});