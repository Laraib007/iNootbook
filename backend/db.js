const mongoose = require('mongoose');
const mongooseURI = 'mongodb+srv://mylaptop2334:Xg5jMIzojVIq2sUh@cluster0.axpbaoh.mongodb.net/inotebook';


const connectToMongose = ()=>{
    mongoose.connect(mongooseURI, console.log("database connected sucessfully"))
}
module.exports = connectToMongose;