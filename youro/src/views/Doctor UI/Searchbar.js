import React, { useState, useEffect } from 'react';
import "../../styles/Doctor-ui/Searchbar.css";
import PatientDetails from './DA-PatientDetails';
import { FaChevronLeft } from 'react-icons/fa';
import { BrowserRouter, Link, Route, Routes,useNavigate, useParams  } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');

  const [showdetails,setshowdetails] = useState(false);

  const [patientData, setPatientData] = useState(null);
  const [userDetails, setUserDetails] = useState([])
  const navigate = useNavigate();
  let {apptId, patientId} = useParams();

  const handleViewMore = (id) => 
  {
    navigate(`${id}`)
    setSearchInput('');
  };

  const handlesearchdetails =(e) =>
  {
    if (e.key === 'Enter') {
      setshowdetails(false)
    }
  };

  const hitback =()=>
  {
    setshowdetails(false);
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    if(patientId) {
      setshowdetails(true)
    }
  }, [patientId])

  const fetchUsers = async () => {
    const url = `http://52.14.33.154:9093/youro/api/v1/getAllUsers/PATIENT`;
    try {
      const res = await axios.get(url);
      console.log(res)
      setUserDetails(res.data);
    }
    catch (err) {
      console.error(err);
    }
  }



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

   return ( <>
  <div className='search-bar'>
      <div className='search-input'>
        <>
         <div className='back-button'>
         {showdetails && (
            <button className="back-button-1" onClick={() => hitback()}>
            <FaChevronLeft /> Back
            </button>
            )}
         </div>
        </>
        <input
          className='search-input-field' 
          type="search"
          placeholder="Search here by name"
          onChange={handleChange}
          onKeyDown={handlesearchdetails}
          value={searchInput}
        />
         {/* <span class="icon">🔍</span> */}
      </div>
      <div className='patient-details'>
        {showdetails ? (
          <div className='details-container'>
             <PatientDetails />
          </div>
        ) : (
          <div>
            {userDetails.map((patient) => (
              <div key={patient.name} className='patient-details-1'>
                <div className='column-details'>
                  <label className='label-pd'>{patient.firstName}</label>
                  <label className='label-pd'>{patient.email}</label>
                </div>
                <div className='view-more'>
                  <button className='btn-filled' onClick={() => handleViewMore(patient.userId)}>View More</button>
                </div>   
              </div>
            ))}
          </div>
        )}
      </div>
    </div> 
   </>
    
  );
};

export default SearchBar;
