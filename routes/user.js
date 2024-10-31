const express = require("express");
const wrapasync = require("../utils/wrapasync");
const router = express.Router();
const User = require("../model/user.js");
const passport = require("passport");
const { saveurl } = require("../loggedinmiddleware.js");

router.get("/signup", (req, res) => {
  res.render("user/signup.ejs");
});

router.post(
  "/signup",
  wrapasync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registereduser = await User.register(newUser, password);
      req.login(registereduser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash(
          "success",
          "Welcome! Share your books, support students in need, and make a difference!"
        );
        res.redirect("/sharebook/home");
  
    })
     
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  })
);


// login route
router.get("/login", (req, res) => {
  res.render("user/login.ejs");
});

router.post(
  "/login",
  saveurl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome back to sharebook!");
    let redirecturl = res.locals.pathurl || "/sharebook/home"
    res.redirect(redirecturl);
  }
);


router.get("/logout",(req,res,next)=>{
  req.logout((err)=>{
      if(err){
          return next(err);
      }
      req.flash("success","you are logged out!");
      res.redirect("/sharebook/home");

  })
})

module.exports = router;
