const express=require("express");
const app=express();
const conn=require("./connection/connect");
const mainRouter=require("./Routes/offer");
const regLogRoute=require("./Routes/regLog");
const cors=require("cors");
conn();
app.use(cors())
app.use("/api/v1",mainRouter);
app.use("/api/v1/user",regLogRoute);
app.listen(3600,()=>{console.log("server is up")})