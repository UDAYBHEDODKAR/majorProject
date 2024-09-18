const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Listing=require('./models/listing.js');
const path=require('path')
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
const wrapAsync=require('./utils/wrapAsync.js');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{console.log("Connected to DB");
}).catch((err)=>{console.log(err);});
async function main() {
    await mongoose.connect(MONGO_URL);
}

app.get("/",(req,res)=>{
    res.send("Welcome");
});

//index Route
app.get("/listings",async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

//New Listing route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

//Create New Listing
app.post("/listings",wrapAsync(async(req,res,next)=>{
    // let {title,description,image,price,country,location}=req.body;
    // let listing=req.body.listing;
        const newListing=new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
}));

//Edit Route
app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//Update Route
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});













app.use((err,req,res,next)=>{
    res.send("something went wrong");
});



app.listen(8080,()=>{
    console.log("Server is Listening to port 8080");
});