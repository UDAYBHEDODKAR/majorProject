const express = require('express');
const app = express();
const users=require("./routes/user.js");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const path= require('path');




const sessionOptions ={
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true
};


app.use("/user",users);
app.use(cookieParser("mysupersecretstring"));
app.use(session(sessionOptions));
app.use(flash());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));





app.use((req,res,next)=>{
    res.locals.error=req.flash("error");
    res.locals.messages=req.flash("success");
    next();
});



app.get("/register",(req,res)=>{
    let {name="Unknown"}=req.query;
    req.session.name=name;
    if(name=="Unknown"){
    req.flash("error","user is not registered");
    }else{
    req.flash("success","user registered successfully");
    }
    res.redirect("/hello");
});


app.get("/hello",(req,res)=>{
    res.render("page.ejs", {name:req.session.name});
});











app.listen(3000,()=>{
    console.log("listening on port 3000");
});