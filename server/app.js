require("dotenv").config();
const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const connection = require("./db/conn");

connection();

const port = 4000;
app.listen(() => {
  console.log(`Listening to port ${port}`);
});
