const express=require('express');
const app=express()
const userModel=require('./models/userModel');
const postModel=require('./models/postModel');
const cookieParser = require('cookie-parser');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

app.set("view engine",'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/',function (req,res) {
    res.render('index')
})

app.post('/register',async function(req,res){
    let {email,name,username,age,password}=req.body;
    let user= await userModel.findOne({email})
    if(user) return res.send('already registered');

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
            let user=await userModel.create({username,name,age,email,password:hash})
            let token=jwt.sign({email:email,userid:user._id},'shh')
            res.cookie("token",token)
            res.send('regitserrrr done')
        })
    })

})

app.get('/login',function(req,res){
    res.render('login')
})

app.post('/login',async(req,res)=>{
    let {email,password}=req.body;
    let user=await userModel.findOne({email});
    if(!user) return res.status(500).send("somthing wrong")


    bcrypt.compare(password,user.password,function(err,reslut){
            if(reslut){
                
                let token=jwt.sign({email:user.email},"shhh");
                res.cookie("token",token);
    
                return res.redirect('/profile')
            }
            return res.send("wrongg")
            
        })
})

app.get('/profile',isLoggedIn,async(req,res)=>{
    let user=await userModel.findOne({email:req.user.email}).populate('posts'); 
    console.log(user);
    res.render('profile',{user})
})

app.post('/post',isLoggedIn,async(req,res)=>{
    let user=await userModel.findOne({email:req.user.email})
    let {content}=req.body;
    let post=await postModel.create({
        user:user._id,  
        content,
    });
    console.log(post);
    
    await user.posts.push(post._id);
    await user.save();
    res.redirect('/profile')
})


app.get('/logout',(req,res)=>{
    res.cookie('token','')
    res.redirect('/login')
})


app.get('/like/:id',isLoggedIn,async function (req,res){
    let post=await postModel.findOne({_id:req.params.id}).populate('user')
    
    if(post.likes.indexOf(req.user.userid)===-1){
        post.likes.push(req.user.userid);
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid),1)
    }

    await post.save()

    res.redirect('/profile')
})

function isLoggedIn(req,res,next) {
    if(req.cookies.token === "")  res.redirect('login')
    else{
        let data=jwt.verify(req.cookies.token,'shhh')
        req.user=data
        next()
    }    
}
app.listen(3000);