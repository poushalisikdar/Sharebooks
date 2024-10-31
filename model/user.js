const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        require:true,
    },
});






userSchema.plugin(passportLocalMongoose);// it helps to define username,password,salted fiels automatitically

module.exports = mongoose.model("User",userSchema);