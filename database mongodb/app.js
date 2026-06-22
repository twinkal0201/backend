const express=require('express');
const app=express();
const userModel=require("./model/usermodel");
const postModel=require("./model/postmodel");
const path=require('path');


app.set("view engine","ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',async (req,res)=>{
    const users = await userModel.find();
    res.render("index", { users });
});

   
app.get("/read", async (req, res) => {
    const users = await userModel.find();

    res.render("read", {
        users
    });
});

app.post('/create', async (req,res)=>{
    let {name,email,image}=req.body;
    let user=await userModel.create({
        name,email,image
    });
    res.redirect('/read');
});
app.get('/create',async (req,res)=>{
    let user=await userModel.create({
        username:"isha",
        email:"isha@12gmail.com",
        age:12
    })
    res.send(user);
});

app.get('/post/create',async (req,res)=>{
    let post=await postModel.create({
        postdata:"potres",
        user:"id"
    })
    let user=await userModel.findOne({_id:""})
    user.posts.push(post._id);
    await user.save();
    
    res.send(post);
});

app.get('/edit/:id',async (req,res)=>{
    let user=await userModel.findOne({_id:req.params.id});
    res.render("edit",{user});
    
})

app.post('/update/:userid',async (req,res)=>{
    let {name,email,image}=req.body;
    await userModel.findOneAndUpdate({_id:req.params.userid},{name,email,image});
    res.redirect('/read');
})


app.get("/delete/:id", async (req,res)=>{
    let user=await userModel.findOneAndDelete({_id:req.params.id});
    console.log(user);
    res.redirect('/read');

})
app.listen(3000);
