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

    
  }
);

const Homepagemodel = model("HOMEPAGE", HomeSchema);

module.exports = Homepagemodel;


