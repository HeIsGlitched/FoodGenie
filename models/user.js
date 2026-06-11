const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

//create schema
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please enter your name"],
        maxlength : [30, "Name cannot exceed 30 characters"]
    },
    email : {
        type: String,
        required : [true, "Please enter your emailid"],
        unique : [true],
        lowercase : [true],
        validate : [validator.isEmail,"Enter valid email"]
    },
    password : {
        type : String,
        required : [true, "Enter password"],
        minlength : 8,
        select : false,
    },
    passwordConfirm : {
        type : String,
        required : [true, "Confirm password"],
        validate : {
            validator : function(el){
                return el === this.password;
            },
            message : "Password is incorrect"
        }
    },
    phoneNumber : {
        type : String,
        required : true,
        match : [/^[0-9]{10}$/, "Enter valid phone number"]
    },
    role : {
        type : String,
        enum : ["user", "admin"],
        default : "user"
    },
    avatar: {
        public_id: String,
        url: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date

},
{timestamps:true}
);


//hash password 
//pre("save") => runs before the data is saved

userSchema.pre("save", async function(){
    if(!this.isModified("password"))return;

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
})

//pass compare at the login time
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);

}

//checks whether the user's pass was changed after getting jwt token, if yes the old token is invalid and user must log in again
userSchema.methods.changePasswordAfter = function(JWTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime()/1000,10);
        return JWTimestamp < changedTimestamp
    }
    return false;
}

//custom method to generate jwt token
userSchema.methods.getJWTToken = function(){
    return jwt.sign(
        {id: this._id},
        process.env.JWT_SECRET,
        {expiresIn : process.env.JWT_EXPIRES}
    )
}

module.exports = mongoose.model("User", userSchema)


