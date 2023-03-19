const express = require("express");
const bodyParser = require("body-parser");

//----------------------------------------- MIDDLEWARE ---------------------------------------------------

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.json());

//----------------------------------------- MODELS ---------------------------------------------------

const Book = require("../Models/book");
const bookStatus = require("../Models/bookStatus");

//----------------------------------------- ROUTES ---------------------------------------------------

router
  .route("/")
  .get((req, res) => {
    Book.find({ status: bookStatus.completed }, (err, foundBooks) => {
      res.status(200).json(foundBooks);
    });
  })
  .post((req, res) => {
    const newBook = new Book({
      name: req.body.name,
      description: req.body.description,
      author: req.body.author,
      thumbnailURL: req.body.thumbnailURL,
      status: bookStatus.completed,
    });
    newBook.save();
    res.status(201).json({ message: "Book Created", book: newBook });
  });

module.exports = router;
