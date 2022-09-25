const mongoose= require("mongoose");



const connectDb= async(MONGO_URL)=> {

    try {

         const DB_OPTIONS= {
            dbName: "social-media",
         }

        await mongoose.connect(MONGO_URL,DB_OPTIONS);
         console.log("Database connected Successfully");
    }

    catch (err){

        console.log(err);
    }
}


module.exports= connectDb;