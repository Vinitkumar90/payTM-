const mongoose = require("mongoose")
const {mongoConnect} = require("./config")

mongoose.connect(mongoConnect);

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true,
        trime: true,
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    }
});

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true
    },

})


//Models for above schemas
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account",accountSchema)
// two collections in paytm db


module.exports = {
    User,
    Account,
};