const Book = require("./model/books");

module.exports.IsLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in to add your book!");
       return res.redirect("/login");
    }
    next();
};

module.exports.saveurl = (req,res,next)=>{
    if( req.session.redirectUrl){
        res.locals.pathurl =  req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let data = await Book.findById(id);
    if(data&&!data.owner.equals(res.locals.currUser._id)){
        req.flash("error","you can't do anything!");
        return res.redirect(`/sharebook/book/${id}`);
    }
    next();
}