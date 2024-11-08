if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const MongoStore = require('connect-mongo');
const Bookmodel = require("./model/books.js");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsmate = require("ejs-mate");
const methodOverride = require("method-override");

const ExpressError = require("./utils/ExpressError.js");
const wrapasync = require("./utils/wrapasync.js");
const expressSession = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./model/user.js");

const app = express();

// Set view engine and views path
app.engine("ejs", ejsmate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// MongoDB connection URL
const mongoUrl = process.env.ATLASDB_URL;

// Configure MongoDB session store
const store = MongoStore.create({
  mongoUrl: mongoUrl,
  crypto: { secret: process.env.SECRET },
  touchAfter: 24 * 3600, // 24 hours
});

store.on("error", (err) => {
  console.log("ERROR in MONGO SESSION STORE", err);
});

// Session configuration
const sessionOptions = {
  store,
  secret: process.env.SECRET || "fallbackSecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};

app.use(expressSession(sessionOptions));
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

// Import routes
const sharebookRoutes = require("./routes/sharebook.js");
const navoptionRoutes = require("./routes/navoption.js");
const userRoutes = require("./routes/user.js");

// Route handlers
app.use("/sharebook/books", sharebookRoutes); // for book-related routes
app.use("/sharebook/nav", navoptionRoutes); // for navigation-related routes
app.use("/", userRoutes); // for user-related routes

// Utility function
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Specific routes
app.get("/sharebook/address", wrapasync(async (req, res) => {
  let data = req.query;
  const city = capitalizeFirstLetter(data.address);
  const booksdata = await Bookmodel.find({ city: city });

  if (booksdata.length === 0) {
    req.flash("error", "Oops! It seems we don't have books at the moment. Please check another one! Thank you!");
    return res.redirect("/sharebook/home");
  } 
  res.render("subjectsection/address.ejs", { book: booksdata });
}));

app.get("/sharebook/:stream", wrapasync(async (req, res) => {
  const stream = req.params.stream;
  const data = await Bookmodel.find({ stream: stream });

  if (!data || data.length === 0) {
    return res.status(404).send("Page not found");
  }

  res.render("subjectsection/subsection", {
    books: data,
    stream: stream,
  });
}));

// Connect to MongoDB
async function main() {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to DB");
  } catch (err) {
    console.log("Database connection error:", err);
  }
}

main();

// Default route to redirect to the homepage
// app.get("/", (req, res) => {
//   res.redirect("/sharebook/home");
// });

// 404 Error handling for undefined routes
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
