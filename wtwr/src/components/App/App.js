import React from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function App() {
  const tempvalue = "75° F";
  return (
    <>
      <Header />
      <Main tempvalue={tempvalue} />
      <Footer />
    </>
  );
}

export default App;
