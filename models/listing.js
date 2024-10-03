const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Review = require("./reviews.js");


const listingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description: String,
    image:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzRKni2nZ5o_isZotHkFMrIGFfY3X8kqBQ4A&s",
        set:(v)=> v==""?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzRKni2nZ5o_isZotHkFMrIGFfY3X8kqBQ4A&s":v,
    },
    price: Number,
    location:String,
    country: String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ]
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});

const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;