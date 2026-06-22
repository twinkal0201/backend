const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    fs.readdir("./files", function (err, files) {
        if (err) {
            return res.send("Error reading files");
        }

        res.render("index", { files });
    });
});

app.post("/create", function(req, res) {

    console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.detail,function(err){
        res.redirect("/");
    });
   
});

app.get("/file/:filename", function(req, res) {

    console.log(req.body);
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,data)=>{
        if (err) {
        console.log(err);
        return res.send("Error reading file");
    }
        
        res.render("show",{filename:req.params.filename,filedata: data});
    });  
});
app.get("/edit/:filename", function(req, res) {
        
        res.render("edit",{filename:req.params.filename});  
});

app.post("/edit", function(req, res) {
        console.log(req.body);
        fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
            res.redirect("/");
        })
        // res.render("edit",{filename:req.params.filename});  
});

app.listen(3000, function () {
    console.log("Server running on port 3000");
});