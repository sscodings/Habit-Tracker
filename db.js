const express = require("express");
const mongoose = require("mongoose");
const { date } = require("zod");
const app = express();
app.use(express.json());
mongoose.connect("mongodb+srv://sscodings:ssrockstar.11@sscodings.mvywr1x.mongodb.net/HabitTracker");
const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
})

const HabitSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    habit:{
        type:String,
        required:true,
    },
    completedDates:{
        type:[Date]
    }

})

const User = mongoose.model('User',UserSchema);
const Habit = mongoose.model('Habit',HabitSchema);

module.exports = {
    User,
    Habit
}