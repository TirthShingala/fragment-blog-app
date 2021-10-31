const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/fragment", {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDb"))
  .catch((error) => console.log(error));
