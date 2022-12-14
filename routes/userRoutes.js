const express= require("express");
const router= express.Router();
const UserModel= require("../models/userModel");
// get user detail
router.get("/:id", async(req,res)=> {

      try {

            const user= await UserModel.findById(req.params.id);
            const {password,updatedAt,...other}= user._doc;
            res.status(200).json(other);
            res.send(other);

      }

      catch (err) {

            res.status(500).json(err);
      }

})

// follow a user

router.put("/:id/follow", async (req, res) => {

      if (req.body.userId !== req.params.id) {
        try {
          const user = await UserModel.findById(req.params.id);
          const currentUser = await UserModel.findById(req.body.userId);
          if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({ $push: { followers: req.body.userId } });
            await currentUser.updateOne({ $push: { followings: req.params.id } });
            res.status(200).json("user has been followed");
          } else {
            res.status(403).json("you allready follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant follow yourself");
      }
    });

// unfollow a user
    router.put("/:id/unfollow", async (req, res) => {
      if (req.body.userId !== req.params.id) {
        try {
          const user = await UserModel.findById(req.params.id);
          const currentUser = await UserModel.findById(req.body.userId);
          if (user.followers.includes(req.body.userId)) {
            await user.updateOne({ $pull: { followers: req.body.userId } });
            await currentUser.updateOne({ $pull: { followings: req.params.id } });
            res.status(200).json("user has been unfollowed");
          } else {
            res.status(403).json("you dont follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant unfollow yourself");
      }
    });


module.exports= router;
