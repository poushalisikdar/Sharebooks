const express = require("express");
const router = express.Router();
const Wrapasync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const Bookmodel = require("../model/books.js");
const Homemodel = require("../model/homeModel.js");
const { BookSchema } = require("../schema.js");
const { IsLoggedIn, isOwner } = require("../loggedinmiddleware.js");
const multer = require('multer');
const {storage} = require("../cloudconfig.js");
const upload= multer({storage});

const validateBooks = (req, res, next) => {
  let { error } = BookSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

router.get(
  "/",
  Wrapasync(async (req, res) => {
    const books = await Homemodel.find({});
    res.render("books/homepage", { books });
  })
);



router.get(
  "/stream/:stream",
  Wrapasync(async (req, res) => {
    let sectionData = req.params.stream;
    let data = await Bookmodel.find({ stream: sectionData });

    // If no books found, send a 404 response
    if (!data || data.length === 0) {
      return res.status(404).send("Page not found");
    }

    // If books are found, render the page
    res.render("subjectsection/subsection", {
      books: data,
      stream: sectionData,
    });
  })
);


// show route
router.get(
  "/book/:id",
  Wrapasync(async (req, res) => {
    let { id } = req.params;
    let data = await Bookmodel.findById(id).populate("owner");;

    res.render("subjectsection/show", { data });
  })
);

// new form route
router.get("/add", IsLoggedIn, (req, res) => {
  res.render("subjectsection/create");
});

// create route
router.post(
  "/",
  IsLoggedIn,
  
  upload.single("book[image]"),
  validateBooks,
  Wrapasync(async (req, res) => {
    let url=req.file.path;
    let filename=req.file.filename;
    let data = new Bookmodel(req.body.book);
    let stream = req.body.book.stream;
    data.owner=req.user._id;
    data.image={url,filename};
    await data.save();
    req.flash("success", "Your book is added successfully!");
    res.redirect(`/sharebook/stream/${stream}`);
  })
);

// edit form
router.get(
  "/:id/edit",
  IsLoggedIn,
  isOwner,
  
  Wrapasync(async (req, res) => {
    let { id } = req.params;
    let data = await Bookmodel.findById(id)
    if (!data) {
      req.flash("error", "the book you requested for doesn't exist!");
      res.redirect(`/sharebook/home`);
    }

    res.render("subjectsection/edit", { data });
  })
);

// update route
router.put(
  "/:id",
  IsLoggedIn,
  isOwner,
  upload.single("book[image]"),
  validateBooks,
  Wrapasync(async (req, res) => {
    
    let { id } = req.params;
   let bookdata= await Bookmodel.findByIdAndUpdate(id, { ...req.body.book });
    if(typeof req.file != "undefined"){
      let url=req.file.path;
      let filename=req.file.filename;
      bookdata.image={filename,url};
      await bookdata.save();
    }
   
    req.flash("success", "Your book is updated successfully!");
    res.redirect(`/sharebook/book/${id}`);
  })
);

// DELETE route

router.delete(
  "/:id/:stream",
  IsLoggedIn,
  isOwner,
  Wrapasync(async (req, res) => {
    let { id, stream } = req.params;
    let result = await Bookmodel.findByIdAndDelete(id);
    req.flash("success", "Your book is deleted successfully!");
    res.redirect(`/sharebook/stream/${stream}`);
  })
);

module.exports = router;
// const express = require("express");
// const router = express.Router();
// const Wrapasync = require("../utils/wrapasync.js");
// const { isLoggedIn, isOwner } = require("../middleware/auth.js");
// const { validateBooks } = require("../middleware/validation.js");
// const Bookmodel = require("../model/books.js");
// const Homemodel = require("../model/homeModel.js");
// const multer = require("multer");
// const { storage } = require("../cloudconfig.js");
// const upload = multer({ storage });

// // Routes
// router.get("/", Wrapasync(async (req, res) => {
//   const books = await Homemodel.find({});
//   res.render("books/homepage", { books });
// }));

// router.get("/stream/:stream", Wrapasync(async (req, res) => {
//   const data = await Bookmodel.find({ stream: req.params.stream });
//   if (!data.length) return res.status(404).send("Page not found");
//   res.render("subjectsection/subsection", { books: data, stream: req.params.stream });
// }));

// router.post("/", isLoggedIn, upload.single("book[image]"), validateBooks, Wrapasync(async (req, res) => {
//   const data = new Bookmodel({ ...req.body.book, owner: req.user._id, image: { url: req.file.path, filename: req.file.filename } });
//   await data.save();
//   req.flash("success", "Your book is added successfully!");
//   res.redirect(`/sharebook/stream/${req.body.book.stream}`);
// }));

// router.delete("/:id/:stream", isLoggedIn, isOwner, Wrapasync(async (req, res) => {
//   await Bookmodel.findByIdAndDelete(req.params.id);
//   req.flash("success", "Your book is deleted successfully!");
//   res.redirect(`/sharebook/stream/${req.params.stream}`);
// }));

// module.exports = router;
