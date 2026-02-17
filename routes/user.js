const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const mongoose = require("mongoose");
const router = express.Router();
const { User,Habit } = require("../db");
const { JWT_secret } = require("../config"); 

const signupBody = zod.object({
    firstname:zod.string(),
    lastname:zod.string(),
    username:zod.string(),
    password:zod.string()
})

router.post("/signup", async(req,res)=>{
    const { success } = signupBody.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            message:"Invalid inputs"
        })
    }
    const existingUser = await User.findOne({
        username:req.body.username
    })
    if(existingUser){
        return res.status(400).json({
            message:"User already Exists"
        })
    }
    const user = await User.create({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        username:req.body.username,
        password:req.body.password
    });
    const userId = user._id;

    const token = jwt.sign({userId},JWT_secret);

    res.json({
        message:"User successfully created",
        token:token
    })

})

const signinBody = zod.object({
    username:zod.string(),
    password:zod.string()
})

router.post("/signin", async(req,res)=>{
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }

    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    if(user){
        const token = jwt.sign({
            userId:user._id
        },JWT_secret)
        return res.json({
            token:token
        })
        return;
    }

})

router.get("/bulk", async(req,res)=>{
    const filter = req.query.filter || "";
    const habit = await Habit.find({
        $or:[{
            habit:{
                "$regex":filter
            }
        }]
    })
    
    res.json({
        habits:habit.map(habits=>({
            _id:habits._id,
            habit:habits.habit,
            completedDates:habits.completedDates

        }))
    })
})


module.exports = router;