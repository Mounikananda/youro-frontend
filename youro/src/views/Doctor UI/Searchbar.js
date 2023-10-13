import React, { useState } from 'react';
import "../../styles/Doctor-ui/Searchbar.css";
import PatientDetails from './PatientDetails';


const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');

  const [showdetails,setshowdetails] = useState(false);

  const [patientData, setPatientData] = useState(null);


  const handleViewMore = (data) => 
  {
    setshowdetails(true);
    setPatientData(data);
    
  };

  const handlesearchdetails =(e) =>
  {
    if (e.key === 'Enter') {
      setshowdetails(false);
    }
  };




  const patientdata = [
  {
    firstName: "Noah",
    lastName: "Hernandez",
    address: "789 Elm St",
    city: "San Diego",
    pincode: "12345",
    state: "CA",
    hasInsurance: true,
    email: "noah@example.com",
    dateOfBirth: "5/19/1991",
    sex: "Male",
    patientId: "123456",
  },
];


  const patientdetails = [
    { name: 'A', gmail: 'A@gmail.com' },
    { name: 'B', gmail: 'B@gmail.com' },
    { name: 'C', gmail: 'C@gmail.com' },
    { name: 'D', gmail: 'D@gmail.com' },
    { name: 'E', gmail: 'E@gmail.com' },
    { name: 'F', gmail: 'F@gmail.com' },
    { name: 'G', gmail: 'G@gmail.com' },
    { name: 'H', gmail: 'H@gmail.com' },
    { name: 'I', gmail: 'I@gmail.com' },
    { name: 'J', gmail: 'J@gmail.com' },
    { name: 'K', gmail: 'K@gmail.com' },
    { name: 'L', gmail: 'L@gmail.com' },
    { name: 'M', gmail: 'M@gmail.com' },
    { name: 'N', gmail: 'N@gmail.com' },
    { name: 'O', gmail: 'O@gmail.com' },
    { name: 'P', gmail: 'P@gmail.com' },
    { name: 'Q', gmail: 'Q@gmail.com' },
    { name: 'R', gmail: 'R@gmail.com' },
    { name: 'S', gmail: 'S@gmail.com' },
    { name: 'T', gmail: 'T@gmail.com' },
    { name: 'U', gmail: 'U@gmail.com' },
    { name: 'V', gmail: 'V@gmail.com' },
    { name: 'W', gmail: 'W@gmail.com' },
    { name: 'Z', gmail: 'Z@gmail.com' },
];

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredpatients = patientdetails.filter((patientdetails) => {
    const nameMatch = patientdetails.name.toLowerCase().includes(searchInput.toLowerCase());
    const gmailMatch = patientdetails.gmail.toLowerCase().includes(searchInput.toLowerCase());
    return nameMatch;
  });

   return (
    <div className='search-bar'>
      <div className='search-input'>
        <input
          className='search-input-field' 
          type="search"
          placeholder="Search here by name,email id"
          onChange={handleChange}
          onKeyDown={handlesearchdetails}
          value={searchInput}
        />
      </div>
      <div className='patient-details'>
        {showdetails ? (
          <div className='details-container'>
             <PatientDetails data={patientData} />
          </div>
        ) : (
          <div>
            {filteredpatients.map((patient) => (
              <div key={patient.name} className='patient-details-1'>
                <div className='column-details'>
                  <label className='label-pd'>patientid</label>
                  <label className='label-pd'>{patient.name}</label>
                  <label className='label-pd'>{patient.gmail}</label>
                </div>
                <div className='view-more'>
                  <button className='btn-filled' onClick={() => handleViewMore(patientdata)}>View More</button>
                </div>   
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
