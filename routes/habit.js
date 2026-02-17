const express = require("express");
const { User, Habit } = require("../db");
const { authenticate } = require("../Middleware");
const router = express.Router();

router.get("/all", authenticate, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId });

    const habitsWithStreak = habits.map((habit) => {
      const streak = calculateStreak(habit.completedDates);

      return {
        _id: habit._id,
        habit: habit.habit,
        completedDates: habit.completedDates,
        streak
      };
    });

    res.json(habitsWithStreak);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});


router.post("/add", authenticate, async (req,res)=>{
  try{
    const newHabit = await Habit.create({
        userId:req.userId,
        habit:req.body.habit,
        completedDates:[]
    })
    res.json({ message:"Habit added successfully" })
  }
  catch(err){
    console.log(err)
    res.status(500).json({message:err.message})
  }
})


router.put("/completed/:id", authenticate ,async(req,res)=>{
    const habit = await Habit.findOne({
        _id:req.params.id,
        userId:req.userId
    })
    if(!habit){
        return res.status(400).json({
            message:"habit doesn't exists"
        })
    }
    const today = new Date();
    today.setHours(0,0,0,0);

    const alreadyAdded = habit.completedDates.some(date=>{
        const d = new Date(date);
        d.setHours(0,0,0,0);
        return d.getTime()==today.getTime();
    })
    if(alreadyAdded){
        return res.status(400).json({
            message:"date already added"
        })
    }
    habit.completedDates.push(today);
    await habit.save();
    return res.json({
        message:"Date added"
    })
})

function calculateStreak(completedDates){
    if(!completedDates || completedDates.length==0){
        return 0;
    }

    const normalizedDates = completedDates.map(date=>{
        const d = new Date(date);
        d.setHours(0,0,0,0);
        return d;
    });

    normalizedDates.sort((a,b)=>b-a);

    const today = new Date();
    today.setHours(0,0,0,0);

    let streak = 0;
    for(let i=0;i<normalizedDates.length;i++){
        const diff = (today-normalizedDates[i])/(1000*60*60*24);
        if(diff==streak){
            streak++;
        }
        else{
            break;
        }
    }
    return streak;
}

router.get("/getstreak", authenticate,async(req,res)=>{
    const habit = await Habit.find({
        userId:req.userId
    })

    const habitstreak = habit.map(habit=>{
        const streak = calculateStreak(habit.completedDates);

        return {
            userId:habit._id,
            habit:habit.habit,
            completedDates:habit.completedDates,
            streak
        }
    })
    res.json(habitstreak);
})

router.delete("/delete/:id", authenticate, async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found"
      });
    }

    res.json({
      message: "Habit deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


module.exports = router;