const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const root_dir = path.join(__dirname, "..");
const indexHTMLPath = "/client/public/index.html";

//----------------------------------------- MIDDLEWARE ---------------------------------------------------

// mongoose.connect(
//   "mongodb://localhost:27017/boredandBooklessDB",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   () => {
//     console.log("boredandBooklessDB Connected");
//   }
// );

mongoose.connect(
  "mongodb+srv://admin-amit:sonunandini@cluster0.k902j.mongodb.net/boredAndBooklessDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("boredandBooklessDB Connected");
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);

//----------------------------------------- CONTROLLERS ---------------------------------------------------

const wantToRead = require("./Controllers/wantToRead");
const currentlyReading = require("./Controllers/currentlyReading");
const completed = require("./Controllers/completed");
const action = require("./Controllers/action");

//----------------------------------------- ROUTES ---------------------------------------------------

// Root
app.get("/", (req, res) => {
  res.sendFile(root_dir + indexHTMLPath);
});

// Books
app.use("/api/want-to-read", wantToRead);
app.use("/api/currently-reading", currentlyReading);
app.use("/api/completed", completed);
app.use("/api/action", action);

//----------------------------------------- START SERVER ---------------------------------------------------

app.use((req, res, next) => {
  res.status(404).json({ error: "page not found" });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log("PORT:", PORT);
});
