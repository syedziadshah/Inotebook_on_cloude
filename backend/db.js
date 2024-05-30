const mongoose =require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebook";
const connectToMongo = () => {
    mongoose.connect(mongoURI, { 
        useNewUrlParser: true,
         useUnifiedTopology: true 
        })
        .then(() => {
            console.log("mongoose is connected successfully");
        })
        .catch(err => {
            console.error("Error connecting to MongoDB:", err);
        });
}
module.exports =connectToMongo;