const  mongoose = require('mongoose');

module.exports.connect =async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("ket noi tc")
    } catch (error) {
        console.log("that bai")
    }
}
mongoose.connect(process.env.MONGO_URL);