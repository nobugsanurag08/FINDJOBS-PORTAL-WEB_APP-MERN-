const express=require("express");       //password  mongodb+srv://anuragnitp:<password>@cluster0.o68pw.mongodb.net/test
const app=express();
const db=require("./db.js");
const cors = require("cors")
const path=require("path")

const jobsRoute=require('./routes/jobsRoute')
const userRoute= require('./routes/usersRoute');
const { response } = require("express");


app.use(express.json())
app.use('/api/jobs/',jobsRoute)   

app.use('/api/users/',userRoute)

const port =process.env.port || 5000;
if(process.env.NODE_ENV==='production'){
    app.use('/',express.static('client/build'))

    app.get("*",(req,res)=>{
        response.sendFile(path.join(__dirname,'client/build/index.html'))
    })
}

app.listen(port,() => console.log("Node JS Server Started..." ));