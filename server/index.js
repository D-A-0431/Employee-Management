const express = require("express");
const dbConnect = require("./dbConnect");
const mainRouter = require("./routers/index");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/",mainRouter);

dbConnect();

app.listen(3000, ()=>{
    console.log(`Listening on PORT: 3000`);
});