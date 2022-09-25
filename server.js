const express = require("express");
require("dotenv").config();
const app = express();
const connectdb= require("./config/connectdb");
const morgan= require("morgan");
const helmet= require("helmet");
const userRoutes= require("./routes/userRoutes");
const authRoutes= require("./routes/authRoutes");
const postsRoutes= require("./routes/postRoutes");
const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";
const cors = require("cors");

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use(helmet());


app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/post",postsRoutes)

app.get("/", (req,res)=> {

    res.send("<h1>Hi there. Please refer to my server.js and routes folder to access all the routes for this social media api.</h2");
})


app.listen(port, ()=> {

    connectdb(MONGO_URL);

    console.log(`Server running at http://localhost:${port}/`);
})