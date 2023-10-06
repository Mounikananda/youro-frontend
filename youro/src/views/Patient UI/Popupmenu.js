import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../../styles/Popmenu.css";

const Popmenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openPopup}>Verify your email</button>

      <Popup
        open={isOpen}
        closeOnDocumentClick
        onClose={closePopup}
        modal // Add modal prop to make it a modal dialog
       >
        <div className="popup-content">
          {/* <button className="popup-close" onClick={closePopup}>
            X
          </button> */}
          <h3>Please verify OTP that has been sent to your email</h3>
          <input type="text" />
          <br/>
          <br/>
          <button>Submit</button>
        </div>
      </Popup>
    </div>
  );
};

export default Popmenu;
