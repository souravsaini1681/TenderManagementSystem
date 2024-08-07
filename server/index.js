const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const tendersRoute = require("./routes/tender");

dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL).then(() => console.log("db conected"))
    .catch((err) => console.log(err))
;

app.get("/",(req,res)=>{
    res.send("hey there im confused");
})

app.use("/api/tenders",tendersRoute);


app.listen(5000, () => {
    console.log("listening on port 5000");
})
