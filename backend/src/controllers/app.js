import  express from "express";
import cors from "cors";

const app=express()
app.use(cors());
app.use(express.json());

app.get("/" ,(req,res)=>{
    res.send("api is running");
})
app.get("/login", (req,res)=>{
    res.send("login sucessfully")
})
app.post("/regester",(req,res)=>{
    res.send("regester deatials")
})


app.listen(5000,()=>console.log("server is runing"))
