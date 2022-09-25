const express= require("express");
const router= express.Router();
const UserModel= require("../models/userModel");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");


// Registering New User
router.post("/register", async(req,res,next)=> {

      // accepting data from client
       const {name, email, password,user_name,gender,mobile_num,profile}= req.body;
       // generating new hashed password
        try {

                  const salt = await bcrypt.genSalt(10);
                  const hashPassword = await bcrypt.hash(password, salt);
                  const user=  new UserModel({
                  name: name,
                  email: email,
                  password: hashPassword,
                  user_name: user_name,
                  gender: gender,
                  mobile_num: mobile_num,
                  profile: profile
                })

            // saving and sending response
            const new_user=  await user.save();
            res.status(200).json(new_user);

        } catch (err){
         console.log(err);
        }
         
})


router.post("/login", async(req,res,next)=> {

       try {
 
            
            const {email, password}= req.body;

            if(email && password)
            {

                  const user = await UserModel.findOne({ email: email });

                  if (user != null) {
                    const isMatch = await bcrypt.compare(password, user.password);
            
                    if (email === user.email && isMatch) {
                      //Generatejwt token
                      const token = jwt.sign(
                        { UserID: user._id },
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: "15d" }
                      );
                      res.send({
                        status: "success",
                        message: "Login Success",
                        token: token,
                      });
                    } else {
                      res.send({
                        status: "failed",
                        message: "Email or password is incorrect",
                      });
                    }
                  } else {
                    res.send({
                      status: "failed",
                      message: "This email is not registered with us",
                    });
                  }

            }

            else {

                  res.send({status: "failed", message: "All fields are required"});
            }




       }

       catch (err) {
            console.log(err);
       }

})


module.exports= router;