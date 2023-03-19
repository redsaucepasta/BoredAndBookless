const mongoose = require("mongoose");
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
  .route("/:bookID")
  .get((req, res) => {
    const bookID = mongoose.Types.ObjectId(req.params.bookID);
    Book.findById(bookID, (foundBook, err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (foundBook) {
          res.status(200).json(foundBook);
        } else {
          res.status(204).send();
        }
      }
    });
  })
  .put((req, res) => {
    const bookID = mongoose.Types.ObjectId(req.params.bookID);
    Book.findById(bookID, (err, foundBook) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (foundBook) {
          foundBook.name = req.body.name;
          foundBook.author = req.body.author;
          foundBook.description = req.body.description;
          foundBook.thumbnailURL = req.body.thumbnailURL;
          foundBook
            .save()
            .then((savedBook) => {
              res.status(200).json({
                message: "Book Updated Successfully",
                book: savedBook,
              });
            })
            .catch((savedBookError) => {
              res.status(500).send(savedBookError);
            });
        } else {
          res.status(204).send();
        }
      }
    });
  })
  .delete((req, res) => {
    const bookID = mongoose.Types.ObjectId(req.params.bookID);
    Book.findByIdAndDelete(bookID, (err, deletedBook) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (deletedBook) {
          res
            .status(200)
            .json({ message: "Book Deleted Successfully", book: deletedBook });
        } else {
          res.status(204).send();
        }
      }
    });
  });

module.exports = router;
