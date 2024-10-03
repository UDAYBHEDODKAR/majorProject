const express=require('express');
const router=express.Router();


router.get("/",(req,res)=>{
    res.send("hii user");
});

router.get("/:id",(req,res)=>{
    res.send("User with Id");
});

module.exports=router;