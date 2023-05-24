require("dotenv").config();
const express=require("express");
const app=express();
app.use(express.json());

const connectDB=require("./db/connect");
const PORT=process.env.PORT || 5001;

const user_routes=require("./routes/routes");


// middleware or to set router
app.use("/api/user",user_routes);

const start=async()=>{
    try{
     await connectDB(process.env.PROJECT_MO_DB);
     app.listen(PORT,()=>{
        console.log(`PORT No:${PORT} is connected !`);
     })
    }catch(error){
        console.log(error);
    }
}
start();