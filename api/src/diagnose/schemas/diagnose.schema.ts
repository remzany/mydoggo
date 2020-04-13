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
    comments:Array,
    likeArray:Array,
    likeCount:Number,
    tag:String,
    }, 
    {
  timestamps: true
});