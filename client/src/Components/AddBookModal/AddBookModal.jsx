import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Axios from "axios";

import { AddBookContext } from "../../GlobalContext";
import "./AddBookModal.css";

const AddBookModal = () => {
  const {
    showModal,
    setShowModal,
    wantToRead,
    setwantToRead,
    currentlyReading,
    setcurrentlyReading,
    completed,
    setcompleted,
  } = useContext(AddBookContext);

  const [bookDetails, setBookDetails] = useState({
    name: "",
    author: "",
    description: "",
    thumbnailURL: "",
    status: 1,
  });
  const [image, setImage] = useState(
    process.env.PUBLIC_URL + "/book-placeholder.png"
  );
  const [showSuccessModal, setshowSuccessModal] = useState(false);

  const handleSubmit = () => {
    // console.log(bookDetails);
    let url;
    if (bookDetails.status === 1) {
      url = "/api/want-to-read";
    } else if (bookDetails.status === 2) {
      url = "/api/currently-reading";
    } else if (bookDetails.status === 3) {
      url = "/api/completed";
    }

    Axios({
      method: "POST",
      data: bookDetails,
      url: url,
    }).then((res) => {
      if (res.status === 201) {
        // console.log(res);
        setshowSuccessModal(true);
        setTimeout(() => {
          setshowSuccessModal(false);
          setShowModal(false);
          if (bookDetails.status === 1) {
            setwantToRead([...wantToRead, res.data.book]);
          } else if (bookDetails.status === 2) {
            setcurrentlyReading([...currentlyReading, res.data.book]);
          } else if (bookDetails.status === 3) {
            setcompleted([...completed, res.data.book]);
          }
        }, 2500);
      }
    });

    setBookDetails({
      name: "",
      author: "",
      description: "",
      thumbnailURL: "",
      status: 1,
    });
    setImage(process.env.PUBLIC_URL + "/book-placeholder.png");
  };

  const handleThumbnail = (url) => {
    setImage(url);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        {showSuccessModal && (
          <Alert variant={"success"}>Book Added Successfully</Alert>
        )}
        {!showSuccessModal && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Add Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col xl={8} lg={7}>
                    <Form.Group className="mb-4">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter book name"
                        value={bookDetails.name}
                        onChange={(e) => {
                          setBookDetails({
                            ...bookDetails,
                            name: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label>Author</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter author"
                        value={bookDetails.author}
                        onChange={(e) => {
                          setBookDetails({
                            ...bookDetails,
                            author: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Enter description"
                        value={bookDetails.description}
                        onChange={(e) => {
                          setBookDetails({
                            ...bookDetails,
                            description: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label>Thumbnail URL</Form.Label>
                      <Form.Control
                        type="url"
                        placeholder="Enter thumbnail URL"
                        value={bookDetails.thumbnailURL}
                        onChange={(e) => {
                          setBookDetails({
                            ...bookDetails,
                            thumbnailURL: e.target.value,
                          });
                          handleThumbnail(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col xl={4} lg={5}>
                    <img src={image} alt="" />
                    <Form.Select
                      onChange={(e) => {
                        setBookDetails({
                          ...bookDetails,
                          status: Number(e.target.value),
                        });
                      }}>
                      <option value={1}>Want to read</option>
                      <option value={2}>Currently reading</option>
                      <option value={3}>Finished Reading</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                <i class="bi bi-x-square"></i> Close
              </Button>
              <Button onClick={handleSubmit} variant="primary">
                <i class="bi bi-plus-square"></i> Add Book
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default AddBookModal;
