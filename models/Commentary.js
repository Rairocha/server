const { Schema, model } = require('mongoose');


const commentarySchema = new Schema(
    {
    content: { type:String, required: true },
    owner: { type: Schema.Types.ObjectId, ref:'User'},
    politician: {type: Schema.Types.ObjectId, ref: 'Politician'}
    }
  );
  
  module.exports = model("Commentary", commentarySchema);