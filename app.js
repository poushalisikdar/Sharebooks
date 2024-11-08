if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");

// Custom imports
const MongoStore = require("connect-mongo");
const User = require("./model/user.js");
const ExpressError = require("./utils/ExpressError.js");
const wrapasync = require("./utils/wrapasync.js");

// Route imports
const sharebookRoutes = require("./routes/sharebook.js");
const navoptionRoutes = require("./routes/navoption.js");
const userRoutes = require("./routes/user.js");

// Configuration imports
const { connectDB } = require("./config/database.js");
const sessionConfig = require("./config/session.js");

// Initialize express app
const app = express();

// Set view engine and views path
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Connect to MongoDB
connectDB();

// Session and flash middleware
app.use(session(sessionConfig));
app.use(flash());

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set local variables for flash messages and current user
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Routes
app.use("/sharebook/books", sharebookRoutes);
app.use("/sharebook/nav", navoptionRoutes);
app.use("/", userRoutes);

// Default route
app.get("/", wrapasync(async (req, res) => {
  const Homepagemodel = require('./model/homeModel.js');
  const books = await Homepagemodel.find({});
  res.render("books/homepage", { books });
}));

// Error handling for undefined routes
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

// Error handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong, please check it out!" } = err;
  res.status(status).render("subjectsection/error.ejs", { message });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
