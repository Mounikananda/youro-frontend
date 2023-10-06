import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../../styles/Popmenu.css";

const Popmenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
  
    handleVerifyEmail();
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleVerifyEmail = () => {
   
    fetch('https://api.example.com/verify-email', {
      method: 'POST',
   
    })
      .then((response) => {
        if (response.ok) {
          
          closePopup();
        } else {
        
          alert('Email verification failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error verifying email:', error);
      });
  };

  const handleSubmit = () => {
   
    fetch('https://api.example.com/submit-form', {
      method: 'POST',
   
    })
      .then((response) => {
        if (response.ok) {
   
          alert('Form submitted successfully.');
        } else {
          
          alert('Form submission failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
      });
  };

  return (
    <div>
      <button onClick={openPopup}>Verify your email</button>

      <Popup
        open={isOpen}
        closeOnDocumentClick
        onClose={closePopup}
        modal
      >
        <div className="popup-content">
          <h3>Please verify OTP that has been sent to your email</h3>
          <input type="text" placeholder="Enter OTP" />
          <br />
          <br />
          <button onClick={handleSubmit}>Submit</button>
          {/* Removed the "Verify Email" button from here */}
        </div>
      </Popup>
    </div>
  );
};

export default Popmenu;
