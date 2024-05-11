const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser=require("../middleware/fetchuser")

const JWT_SECRET = "Aayushisagood$oy";

//Create new User

router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }
      
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      success=true;
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success,authToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Something went wrong");
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false
        return res
          .status(500)
          .json({ success,error: "Please try to login using correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false
        return res
          .status(500)
          .json({ success,error: "Please try to login using correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true
      res.json({ success,authToken });
    } catch (error) 
    {
        console.error(err.message);
        res.status(500).send("Internal Sever Error");
    }
  }
);

router.post(
    "/getuser",fetchuser,
    async (req, res) => {
        try {
            const userId=req.user.id;
            const user=await User.findById(userId).select("-password")
            res.send(user)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error")
        }
    });


module.exports = router;
