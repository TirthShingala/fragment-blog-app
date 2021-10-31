const express = require("express");
require("./db/mongoose");
const blogRouter = require("./routers/blogRouter");
const userRouter = require("./routers/userRouter");
const port = 5000;

const app = express();

const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(userRouter);
app.use(blogRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
