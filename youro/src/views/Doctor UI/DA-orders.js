import React, { useState } from 'react';
import "../../styles/Doctor-ui/Doctor-appointment/DA-orders.css";

const Orders = () => {

 
  const [selectedOption, setSelectedOption] = useState('');
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [lifestyleItems, setLifestyleItems] = useState([
    { id: 1, text: 'Double voiding', checked: false },
    { id: 2, text: 'Timed voiding', checked: false },
    { id: 3, text: 'Restrict water intake', checked: false },
  ]);

  const [vitaminsItems, setVitaminsItems] = useState([
    { id: 1, text: 'Vitamin A', checked: false },
    { id: 2, text: 'Vitamin B', checked: false },
    { id: 3, text: 'Vitamin C', checked: false },
  ]);

  const [medicinesItems, setMedicinesItems] = useState([
    { id: 1, text: 'Medicine 1', checked: false },
    { id: 2, text: 'Medicine 2', checked: false },
    { id: 3, text: 'Medicine 3', checked: false },
  ]);

 const [labsItems, setLabsItems] = useState([
    { id: 2, text: 'СВC', checked: false },
    { id: 3, text: 'BMP', checked: false },
    { id: 4, text: 'CMP', checked: false },
    { id: 5, text: 'UA', checked: false },
    { id: 6, text: 'UCx', checked: false },
    { id: 7, text: 'PSA', checked: false },
    { id: 8, text: 'Semen analysis', checked: false },
    { id: 9, text: 'Testosterone', checked: false },
    { id: 10, text: 'FSH/LH', checked: false },
    { id: 11, text: '24hr urine', checked: false },
    { id: 12, text: 'Lactate', checked: false },
    { id: 13, text: 'Other (specify)', checked: false },
  ]);


 
  const [imagingItems, setImagingItems] = useState([
    { id: 1, text: 'US', checked: false },
    { id: 2, text: 'Renal', checked: false },
    { id: 3, text: 'Bladder', checked: false },
    { id: 4, text: 'Scrotal', checked: false },
    { id: 5, text: 'CT abd/pel', checked: false },
    { id: 6, text: 'W/ contrast', checked: false },
    { id: 7, text: 'W/o contrast', checked: false },
    { id: 8, text: 'Urogram', checked: false },
    { id: 9, text: 'X-ray', checked: false },
    { id: 10, text: 'KUB', checked: false },
    { id: 11, text: 'Chest', checked: false },
    { id: 12, text: 'Other (specify)', checked: false },
  ]);

  const handleCheckboxChange = (id, category) => {
    switch (category) {
      case 'lifestyle':
        setLifestyleItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
          )
        );
        break;
      case 'vitamins':
        setVitaminsItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
          )
        );
        break;
      case 'medicines':
        setMedicinesItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
          )
        );
        break;
       case 'labs':
        setLabsItems((prevItems) =>
         prevItems.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
          )
	); 
        break;
      case 'imaging':
        setImagingItems((prevItems) => 
           prevItems.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
          )
	); 
        break;
     
      default:
        break;
    }
  };

  const getCategoryItems = (category) => {
    switch (category) {
      case 'lifestyle':
        return lifestyleItems;
      case 'vitamins':
        return vitaminsItems;
      case 'medicines':
        return medicinesItems;
      // Define cases for other categories
      default:
        return [];
    }
  };

  return (
    <div>
    <div className='order-div'>

      <div className='orders-row'>
        <div className='dropdown-list'>
       <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
       <option value="">diagnosisname</option>
         <option value="option1">Diagnosis-1 </option>
         <option value="option2">Diagnosis-2</option>
         <option value="option4">Diagnosis-3</option>
        <option value="option5">Diagnosis-4</option>
        <option value="option6">Diagnosis-5</option>
        <option value="option7">Diagnosis-6</option>
       </select>
     </div>
      
        <button className='button-style'>LifeStyle</button>
        <button className='button-style'>Vitamins/Supplements</button>
         <button className='button-style'>Medicines</button>
         <button className='button-style'>Favourites</button>
      
       {/* <div className='order-options'>
       <button className='button-style'>
         <h4>Vitamins/Supplements</h4>
        </button>
       </div>
       <div className='order-options'>
       <button className='button-style'>
       <h4>Medicines</h4>
       </button>
      </div>
      <div className='order-options'>
       <button className='button-style'>
        <h4>Favourites</h4>
      </button>
     </div> */}

     </div>

      <div className="orders-checklist">
        <div className='orders-3'>
        <div className="orders-name">
          <p className='order-label'>LifeStyle</p>
          <div>
            {lifestyleItems.map((item) => (
              <div key={item.id}>
                <input
                  type="checkbox"
                  id={`lifestyle-item-${item.id}`}
                  checked={item.checked}
                  onChange={() => handleCheckboxChange(item.id, 'lifestyle')}
                />
                <label htmlFor={`lifestyle-item-${item.id}`}>{item.text}</label>
              </div>
            ))}
          </div>
          </div>
     
      
        <div className="orders-name">
          <p className='order-label'>Vitamins/Supplements</p>
          <div>
            {vitaminsItems.map((item) => (
              <div key={item.id}>
                <input
                  type="checkbox"
                  id={`vitamins-item-${item.id}`}
                  checked={item.checked}
                  onChange={() => handleCheckboxChange(item.id, 'vitamins')}
                />
                <label htmlFor={`vitamins-item-${item.id}`}>{item.text}</label>
              </div>
            ))}
          </div>
          </div>
 

        <div className="orders-name">
          <p className='order-label'>Medicines</p>
          <div>
            {medicinesItems.map((item) => (
              <div key={item.id}>
                <input
                  type="checkbox"
                  id={`medicines-item-${item.id}`}
                  checked={item.checked}
                  onChange={() => handleCheckboxChange(item.id, 'medicines')}
                />
                <label htmlFor={`medicines-item-${item.id}`}>{item.text}</label>
              </div>
            ))}
          </div>
        </div>
        </div>


	 <div className='orders-3'>
        <div className="orders-name">
          <p className='order-label'>Labs</p>
          <div>
            {labsItems.map((item) => (
              <div key={item.id}>
                <input
                  type="checkbox"
                  id={`labs-item-${item.id}`}
                  checked={item.checked}
                  onChange={() => handleCheckboxChange(item.id, 'labs')}
                />
                <label htmlFor={`labs-item-${item.id}`}>{item.text}</label>
              </div>
            ))}
          </div>
        </div>


   
        <div className="orders-name">
          <p className='order-label'>Imaging</p>
          <div>
            {imagingItems.map((item) => (
              <div key={item.id}>
                <input
                  type="checkbox"
                  id={`imaging-item-${item.id}`}
                  checked={item.checked}
                  onChange={() => handleCheckboxChange(item.id, 'imaging')}
                />
                <label htmlFor={`imaging-item-${item.id}`}>{item.text}</label>
              </div>
            ))}
          </div>
       </div>
       </div>
   </div>
     <div className='submit-button'>
     <button className='btn-filled '>Submit order</button>
     </div>
   </div>
   </div>
  );
};

export default Orders;
