if (process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

const MongoStore = require('connect-mongo');
const Bookmodel = require("./model/books.js");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const path = require("path");
const ejsmate = require("ejs-mate");
const methodOverride = require("method-override");

const ExpressError = require("./utils/ExpressError.js");
const wrapasync = require("./utils/wrapasync.js");
const expressSession = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const Localstrategy = require("passport-local");
const User = require("./model/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsmate);

const mongoUrl = process.env.ATLASDB_URL;

const store = MongoStore.create({
  mongoUrl: mongoUrl,
  crypto: { secret: "mysupersecretcode" },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOption = {
  store,
  secret: process.env.SECRET || "fallbackSecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};

app.use(expressSession(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Routes
const sharebook = require("./routes/sharebook.js");
app.use("/sharebook", sharebook);

const navoption = require("./routes/navoption.js");
app.use("/sharebook", navoption);

const user = require("./routes/user.js");
app.use("/", user);

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

app.get("/sharebook/address", wrapasync(async (req, res) => {
  let data = req.query;
  const city = capitalizeFirstLetter(data.address);

  const booksdata = await Bookmodel.find({ city: city });

  if (booksdata.length === 0) {
    req.flash("error", "Oops! It seems we don't have books at the moment. Please check another one! Thank you!");
    res.redirect("/sharebook/home");
  } else {
    res.render("subjectsection/address.ejs", { book: booksdata });
  }
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

async function main() {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to DB");
  } catch (err) {
    console.log("Database connection error:", err);
  }
}

main();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Something went wrong, please check it out!"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong, please check it out!" } = err;
  res.status(status).render("subjectsection/error.ejs", { message });
});
