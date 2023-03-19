import { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./BookCard.css";
import Axios from "axios";
import { AddBookContext } from "../../GlobalContext";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const BookCard = (props) => {
  let book = props.book;
  const [showBookDetail, setShowBookDetail] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const {
    wantToRead,
    setwantToRead,
    currentlyReading,
    setcurrentlyReading,
    completed,
    setcompleted,
  } = useContext(AddBookContext);

  const handleBookDetailClick = () => {
    setShowBookDetail(true);
  };

  const handleClose = () => {
    setShowBookDetail(false);
  };

  const handleBookDelete = () => {
    const bookID = book._id;

    Axios({
      method: "DELETE",
      url: "/api/action/" + bookID,
    }).then((res) => {
      // console.log(res);
      if (res.status === 200) {
        setShowBookDetail(false);
        setShowDeleteModal(false);
        if (book.status === 1) {
          let arr = wantToRead.filter((item) => item._id !== bookID);
          setwantToRead(arr);
        } else if (book.status === 2) {
          let arr = currentlyReading.filter((item) => item._id !== bookID);
          setcurrentlyReading(arr);
        } else if (book.status === 3) {
          let arr = completed.filter((item) => item._id !== bookID);
          setcompleted(arr);
        }
      }
    });
  };

  return (
    <>
      <div className="card" onClick={handleBookDetailClick}>
        <img src={book.thumbnailURL} alt="" style={{ width: "100%" }} />
        <div className="container">
          <h6>
            <b>{book.name}</b>
          </h6>
          <p>{book.author}</p>
        </div>
      </div>
      {showBookDetail && (
        <Modal show={showBookDetail} onHide={handleClose} size="xl" centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {book.name} <span className="small"> - {book.author}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col xl={8} lg={7}>
                  <Form.Group className="mb-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter book name"
                      value={book.name}
                      disabled={!isEditing}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter author"
                      value={book.author}
                      disabled={!isEditing}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={8}
                      placeholder="Enter description"
                      value={book.description}
                      disabled={!isEditing}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Thumbnail URL</Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="Enter thumbnail URL"
                      value={book.thumbnailURL}
                      disabled={!isEditing}
                    />
                  </Form.Group>
                </Col>
                <Col xl={4} lg={5}>
                  <img src={book.thumbnailURL} alt="" className="modal-img" />
                  <Form.Select value={book.status} disabled={!isEditing}>
                    <option value={1}>Want to read</option>
                    <option value={2}>Currently reading</option>
                    <option value={3}>Finished Reading</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              style={{ "margin-right": "auto" }}
              onClick={() => {
                setShowDeleteModal(true);
              }}>
              <i class="bi bi-trash"></i> Delete
            </Button>
            <ButtonGroup aria-label="Basic example">
              <Button variant="secondary">Left</Button>
              <Button variant="secondary">Middle</Button>
              <Button variant="secondary">Right</Button>
            </ButtonGroup>
            <Button variant="secondary" onClick={handleClose}>
              <i class="bi bi-x-square"></i> Close
            </Button>
            <Button variant="warning">
              <i class="bi bi-pencil-square"></i> Edit
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {showDeleteModal && (
        <Modal
          size="md"
          show={showDeleteModal}
          onHide={() => {
            setShowDeleteModal(false);
          }}
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              "{book.name} <span className="small"> - {book.author}</span>"
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Are you sure you want to delete the following book?</h5>
            <p>
              {book.name} <span className="small"> - {book.author}</span>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowDeleteModal(false);
              }}>
              <i class="bi bi-x-square"></i> Cancel
            </Button>
            <Button variant="danger" onClick={handleBookDelete}>
              <i class="bi bi-trash"></i> Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default BookCard;
