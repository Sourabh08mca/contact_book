const mongoose = require ('mongoose')

const UserSchema = new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    tags: [String],
    filterTag:[String]
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel