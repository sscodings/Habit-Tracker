const express  = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


const Mainrouter = require("./routes/index");

app.use("/api/v1",Mainrouter);

app.listen(3000);