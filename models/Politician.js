const { Schema, model } = require('mongoose');

const politicianSchema = new Schema(
    {
    fullName: String,
    state: String,
    municipy: String,
    }
  );
  
  module.exports = model("Politician", politicianSchema);