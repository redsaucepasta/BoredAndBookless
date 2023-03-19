import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useContext } from "react";
import AddBookModal from "./AddBookModal/AddBookModal";
import { AddBookContext } from "../GlobalContext";
import { Link } from "react-router-dom";

const CustomNavbar = () => {
  const {
    showModal,
    setShowModal,
    wantToRead,
    setwantToRead,
    currentlyReading,
    setcurrentlyReading,
    completed,
    setcompleted,
    isLoading,
    setIsLoading,
  } = useContext(AddBookContext);

  const handleClick = () => {
    setShowModal(!showModal);
  };

  return (
    <AddBookContext.Provider
      value={{
        showModal,
        setShowModal,
        wantToRead,
        setwantToRead,
        currentlyReading,
        setcurrentlyReading,
        completed,
        setcompleted,
        isLoading,
        setIsLoading,
      }}>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>BoredAndBookless</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/" className="text-link">
                  Home
                </Link>
              </Nav.Link>

              <NavDropdown title="Browse Lists" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/want-to-read" className="text-link">
                    Want to Read
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  {" "}
                  <Link to="/currently-reading" className="text-link">
                    Currently Reading
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  {" "}
                  <Link to="/completed" className="text-link">
                    Finished Reading
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button variant="light" onClick={handleClick}>
                {/* <i class="bi bi-plus-circle"></i> */}
                <h4>
                  <i class="bi bi-journal-plus"></i>
                </h4>
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showModal && <AddBookModal />}
    </AddBookContext.Provider>
  );
};

export default CustomNavbar;
