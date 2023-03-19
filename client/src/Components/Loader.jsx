// import { Container } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

const Loader = (props) => {
  return (
    <>
      <div style={{ textAlign: "center", margin: "100px" }}>
        <Spinner animation="border" variant="secondary" />;
      </div>
    </>
  );
};

export default Loader;
