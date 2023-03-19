import { useEffect } from "react";
import { Container } from "react-bootstrap";
import BookCard from "./Book/BookCard";
import { useState, useContext } from "react";
import { AddBookContext } from "../GlobalContext";
import Loader from "./Loader";

const List = (props) => {
  const { isLoading, setIsLoading, wantToRead, currentlyReading, completed } =
    useContext(AddBookContext);

  useEffect(() => {
    setIsLoading(true);
    if (props.status === 1) {
      setBooks(wantToRead);
    } else if (props.status === 2) {
      setBooks(currentlyReading);
    } else if (props.status === 3) {
      setBooks(completed);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.status, wantToRead, currentlyReading, completed]);

  const [books, setBooks] = useState([]);

  return (
    <>
      {!isLoading && (
        <Container>
          {props.status === 1 && <h3>Want to Read</h3>}
          {props.status === 2 && <h3>Currently Reading</h3>}
          {props.status === 3 && <h3>Finished reading</h3>}
          <div className="home">
            {books.map((book, index) => {
              return <BookCard book={book} key={index} />;
            })}
          </div>
        </Container>
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default List;
