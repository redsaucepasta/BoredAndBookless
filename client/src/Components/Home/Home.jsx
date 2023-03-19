import BookCard from "../Book/BookCard";
import { Container } from "react-bootstrap";
import "./Home.css";
import { useEffect, useContext, useState } from "react";
import Axios from "axios";
import { AddBookContext } from "../../GlobalContext";
import Loader from "../Loader";
import { Link } from "react-router-dom";

const Home = () => {
  const {
    wantToRead,
    setwantToRead,
    currentlyReading,
    setcurrentlyReading,
    completed,
    setcompleted,
  } = useContext(AddBookContext);

  const [isWTRLoading, setIsWTRLoading] = useState(false);
  const [isCRLoading, setIsCRLoading] = useState(false);
  const [isCompletedLoading, setIsCompletedLoading] = useState(false);

  useEffect(() => {
    setIsCRLoading(true);
    setIsWTRLoading(true);
    setIsCompletedLoading(true);
    let url = ["/api/want-to-read", "/api/currently-reading", "/api/completed"];
    Axios({
      method: "GET",
      url: url[0],
    }).then((res) => {
      // console.log(res);
      setwantToRead(res.data);
      setIsWTRLoading(false);
    });

    Axios({
      method: "GET",
      url: url[1],
    }).then((res) => {
      // console.log(res);
      setcurrentlyReading(res.data);
      setIsCRLoading(false);
    });

    Axios({
      method: "GET",
      url: url[2],
    }).then((res) => {
      // console.log(res);
      setcompleted(res.data);
      setIsCompletedLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {!isCRLoading && (
        <>
          <h3>
            Currently Reading
            <span className="see-all-link">
              <Link to="/currently-reading" className="text-link">
                See all
              </Link>
            </span>
          </h3>
          <div className="home">
            {currentlyReading.map((book, i) => {
              if (i >= 5) {
                return "";
              }
              return <BookCard book={book} key={i} />;
            })}
          </div>
        </>
      )}
      {isCRLoading && <Loader />}
      {!isWTRLoading && (
        <>
          <h3>
            Want to read
            <span className="see-all-link">
              <Link to="/want-to-read" className="text-link">
                See all
              </Link>
            </span>
          </h3>
          <div className="home">
            {wantToRead.map((book, i) => {
              if (i >= 5) {
                return "";
              }
              return <BookCard book={book} key={i} />;
            })}
          </div>
        </>
      )}
      {isWTRLoading && <Loader />}
      {!isCompletedLoading && (
        <>
          <h3>
            Finished Reading
            <span className="see-all-link">
              <Link to="/completed" className="text-link">
                See all
              </Link>
            </span>
          </h3>
          <div className="home">
            {completed.map((book, i) => {
              if (i >= 5) {
                return "";
              }
              return <BookCard book={book} key={i} />;
            })}
          </div>
        </>
      )}
      {isCompletedLoading && <Loader />}
    </Container>
  );
};

export default Home;
