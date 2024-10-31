const { Schema, model } = require("mongoose");
const HomeSchema = new Schema(
  {
    stream: {
      type: String,
      required: true,
    },

    section: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default:
        "https://unsplash.com/photos/pile-of-assorted-title-books-xY55bL5mZAM",
      set: (v) =>
        v === ""
          ? "https://unsplash.com/photos/pile-of-assorted-title-books-xY55bL5mZAM"
          : v,
    },
  }
);

const Homepagemodel = model("HOMEPAGE", HomeSchema);

module.exports = Homepagemodel;


