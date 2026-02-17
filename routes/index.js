const express = require("express");
const userRouter = require("./user");
const habitRouter = require("./habit")

const router = express.Router();

router.use("/user",userRouter);
router.use("/habit",habitRouter);



module.exports = router;