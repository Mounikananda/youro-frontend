import React, { useState, useEffect } from 'react';
import "../../styles/Doctor-ui/Searchbar.css";
import PatientDetails from './DA-PatientDetails';
import { FaChevronLeft } from 'react-icons/fa';
import { BrowserRouter, Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";
import { API_DETAILS, COOKIE_KEYS } from '../../App';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');

  const [showdetails, setshowdetails] = useState(false);

  const [patientData, setPatientData] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [consulted, setConsulted] = useState(false);
  const [myPats, setMyPats] = useState([]);


  const navigate = useNavigate();
  let { patientId } = useParams();

  const handleViewMore = (id) => {
    navigate(`${id}`)
    setSearchInput('');
  };

  const handlesearchdetails = (e) => {
    if (e.key === 'Enter') {
      alert("handle search deets by me ");
      setshowdetails(false)
    }
  };

  const hitback = () => {
    setshowdetails(false);
  }

  useEffect(() => {
    if (!patientId) {
      fetchUsers()
    }
  }, [])

  useEffect(() => {
    if (patientId) {
      setshowdetails(true)
    } else {
      setshowdetails(false)
    }
  }, [patientId])

  const fetchUsers = async () => {
    const url = API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + `/getAllUsers/PATIENT`;
    try {
      const res = await axios.get(url);
      console.log(res)
      setUserDetails(res.data);
    }
    catch (err) {
      console.error(err);
    }
  }


  const handleConsultByMe = async () => {

    console.log("consult by me axios :: ");
    const uId = Cookies.get(COOKIE_KEYS.userId).trim();
    const url = API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + `/getPatientsByDoctor/${uId}`;
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.get(url, config);
      console.log(res);
      setMyPats(res.data);
    }
    catch (err) {
      console.error(err);
    }
  }

  const handleChange = (e) => {
    // console.clear();
    alert("handle consult by me ");
    console.log(e);
    setSearchInput(e.target.value);
  };

  // const filteredpatients = patientdetails.filter((patientdetails) => {
  //   const nameMatch = patientdetails.name.toLowerCase().includes(searchInput.toLowerCase());
  //   const gmailMatch = patientdetails.gmail.toLowerCase().includes(searchInput.toLowerCase());
  //   return nameMatch;
  // });

  return (<>
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
        <div className={consulted ? 'btn-outlined-selected' : 'btn-outlined'} onClick={() => { setConsulted(!consulted); handleConsultByMe(); }}>Consulted by me</div>
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
          <>
            {
              consulted ?
                <div>
                  {myPats.map((patient) => (
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
                </div> :
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
            }
          </>
        )}
      </div>
    </div>
  </>

  );
};

export default SearchBar;
