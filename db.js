const mongoose=require("mongoose");
dbconnect();
async function dbconnect() {
    try{
        await mongoose.connect('mongodb+srv://"*********":"*************"@cluster0.o68pw.mongodb.net/FindJob',{useNewUrlParser: true});
        console.log("MongoDB connection Successfull..");
    }catch(err){
        console.log("Connection Failed!!");
    }
}

module.exports=mongoose
