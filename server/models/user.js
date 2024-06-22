const mongoose = require('mongoose')


// mongoose.connect("mongodb://127.0.0.1:27017/project")
mongoose.connect("mongodb+srv://ankitprajapati1012:ymxeZo3gaIxbo7DR@acoding.liwhddt.mongodb.net/project")

const userSchema = mongoose.Schema({
    
    name:String,
    email:String,
    phone:Number,
    website:String
})


module.exports = mongoose.model('user',userSchema);