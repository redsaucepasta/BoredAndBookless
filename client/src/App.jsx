import React, { useState } from "react";
import "./App.css";
import Home from "./Components/Home/Home";
import CustomNavbar from "./Components/Navbar";
import { AddBookContext } from "./GlobalContext";
import { Route, Routes } from "react-router-dom";
import List from "./Components/List";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [wantToRead, setwantToRead] = useState([]);
  const [currentlyReading, setcurrentlyReading] = useState([]);
  const [completed, setcompleted] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="App">
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
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/want-to-read" element={<List status={1} />}></Route>
          <Route
            path="/currently-reading"
            element={<List status={2} />}></Route>
          <Route path="/completed" element={<List status={3} />}></Route>
        </Routes>
      </AddBookContext.Provider>
    </div>
  );
};

export default App;
