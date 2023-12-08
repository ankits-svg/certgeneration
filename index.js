const express=require("express");
const { certRouter } = require("./routes/cert.routes");
const { connection } = require("./config/db");
const app=express();
require("dotenv").config();
const port=process.env.port || 3300;

app.use(express.json())
app.get("/",(req,res)=>{
    res.send({"msg":"Getting the result"})
})

app.use("/cert",certRouter)

app.listen(port,async()=>{
    try {
        await connection
        console.log(`Mongodb databases is connected to server which is running at port ${port}`)
    } catch (error) {
        console.log(`Mongodb databases is not connected to server`)
    }
    console.log(`Server is running at ${port}`)
})