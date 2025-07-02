const express= require("express");
const path = require("path");

const app=express();

let port =8080;

const { v4:uuidv4 }=require('uuid');
const methodOverride =require("method-override");

// app.set(express.urlencoded({extended:true}))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

// app.set(express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname, "public")));


let posts=[
    {
        id:uuidv4(),
        username:"Kallu kalia",
        content:"I'm a part-time legend, full-time chai addict ."
    },
     {
        id:uuidv4(),
        username:"Hashvardhan Rane ",
        content:"hey Guys i am harsh vardhan. sanam teri kasam"
    }, {
        id:uuidv4(),
        username:"Mitthu Don",
        content:"hey, I am Mitthu Don i like to Code bhau"
    }
];
app.get("/",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/");//by default get req 

});
app.get("/posts/:id",(req,res)=>{
        let {id}=req.params;
        // console.log(id);
        let post=posts.find((p)=> id===p.id);
        console.log(post);
        res.render("show.ejs",{post});
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    if (post) {
        post.content = newContent;
        res.redirect("/");
    } else {
        res.status(404).send("Post not found");
    }
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
   let { id } = req.params; 
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/");
})
app.listen(port,()=>{
    console.log("APp sunra hai");
});