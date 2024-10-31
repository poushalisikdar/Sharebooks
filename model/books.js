const { Schema, model } = require("mongoose");

const BooksSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  authorname: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  edition: {
    type: Number,
    required: true,
  },
  
  stream:{
    type:String,
    required:true,
  },
  
  image: {
   url:String,
   filename:String,
   
  },
  location: {
    type: String,
    required: true,
  },
  emailid: {
    type: String,
    required: true,
  },
  whatsappno: {
    type: Number,
    
  },
  condition:{
    type:String,
    required:true,
  },
  city:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },
});

const Bookmodel = model("Book", BooksSchema);

module.exports = Bookmodel;
