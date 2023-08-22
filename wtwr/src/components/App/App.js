import React, { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function App() {
  const tempvalue = "75° F";
  const [openModal, setOpenModal] = useState("");
  const handleOpenModal = () => {
    setOpenModal("Open");
  };
  const handleCloseModal = () => {
    setOpenModal("");
  };
  return (
    <>
      <Header onOpenModal={handleOpenModal} />
      <Main tempvalue={tempvalue} />
      <Footer />{" "}
      {openModal === "Open" && (
        <ModalWithForm
          title="New garment"
          name="addnewgarment"
          buttonText="Add garmet"
          onClose={handleCloseModal}
        >
          <div className="form__field">
            <label>
              Name
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input-field"
                ></input>
              </div>
            </label>
          </div>
          <div className="form__field">
            <label>
              Image
              <div>
                <input
                  type="text"
                  name="link"
                  placeholder="ImageURL"
                  className="input-field"
                ></input>
              </div>
            </label>
          </div>
          <div className="form__field">
            <p className="form__field-text">Select weather type: </p>
            <div>
              <div>
                <input type="radio" value="Hot" checked={true} />
                <label>Hot</label>
              </div>
              <div>
                <input type="radio" value="Warm" checked={false} />
                <label>Warm</label>
              </div>
              <div>
                <input type="radio" value="Cold" checked={false} />
                <label>Cold</label>
              </div>
            </div>
          </div>
        </ModalWithForm>
      )}
    </>
  );
}

export default App;
