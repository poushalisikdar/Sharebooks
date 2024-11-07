const mongoose = require("mongoose");
const bookModel = require("../model/books");
const homeModel = require("../model/homeModel.js");
const data = require("./data.js");
const homedata = require("./homedata.js");

const mongoUrl = "mongodb://127.0.0.1:27017/sharebooks";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongoUrl);
}

const datainit = async () => {
  await bookModel.deleteMany({});
  data.data = data.data.map((obj) => ({
    ...obj,
    owner: "671c9fd78f1c35d8d75fbbc1",
  }));
  await bookModel.insertMany(data.data);
  console.log("data1 was initialized");
  //     await homeModel.insertMany(homedata.data);
  //    console.log("data2 was initialized");
};
datainit();
