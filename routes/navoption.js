const express = require("express");
const router = express.Router();





// about route
router.get("/about",(req,res)=>{
    res.render("books/aboutpage");
})
// contact route

router.get("/contact",(req,res)=>{
    res.render("books/contactpage");
})

// term & condition
router.get("/terms",(req,res)=>{
    res.render("termCondition/terms")
})
router.get("/privacy",(req,res)=>{
    res.render("termCondition/privacy")
});

module.exports=router;