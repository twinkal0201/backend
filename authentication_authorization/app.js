const express=require('express');
const app=express();
const userModel=require('./models/user')

const bcrypt=require('bcrypt');
const cookieParser=require('cookie-parser');
const jwt = require('jsonwebtoken');
const path=require("path");
const { log } = require('console');


app.set("view engine",'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


app.get('/',function(req,res){
    res.render('index')
})

app.get('/read',function(req,res){
    let data=jwt.verify(req.cookies.token,"screartkey")
    console.log(data);
})


app.post('/create',async(req,res)=>{
    let {username,email,password,age}=req.body;

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
            let createuser=await userModel.create({username,email,password:hash,age});

            let token=jwt.sign({email},"shhh");
            res.cookie("token",token);
            res.send(createuser)
        })
    })
})

app.get('/login',function(req,res){
    res.render('login')
})



app.post('/login',async(req,res)=>{
    let user=await userModel.findOne({email:req.body.email});
    if(!user) return res.send("somthing went wrong");

    bcrypt.compare(req.body.password,user.password,function(err,reslut){
        if(reslut){
            
            let token=jwt.sign({email:user.email},"shhh");
            res.cookie("token",token);

            return res.send("login done")
        }
        return res.send("wrongg")
        
    })
});

app.get("/logout",function(req,res){
    res.cookie("token",'')
    res.redirect("/")
})

app.listen(3000);
