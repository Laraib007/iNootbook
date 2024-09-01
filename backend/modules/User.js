const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
   name:{
    type: String,
    require: true,
   },
   email:{
    type: String,
    require: true,
    unique: true
   },
   password:{
    type: String,
    require: true
   },
   date:{
    type: Date,
    default: Date.now
   }
  });

  const users = mongoose.model('user', UserSchema)
  module.exports = users