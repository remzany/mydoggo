import * as mongoose from 'mongoose';

export const DiagnoseSchema = new mongoose.Schema({
  text:String,
  upvote: Number,
  comments: Array
  }, {
timestamps: true
});