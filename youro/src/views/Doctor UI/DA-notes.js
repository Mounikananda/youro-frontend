import {React, useState, useEffect} from 'react';
import "../../styles/Doctor-ui/Doctor-appointment/DA-notes.css";
import { API_DETAILS } from '../../App';
import axios from 'axios';
import { FaPlus} from 'react-icons/fa';


const Notes=(props)=>
{

  const [notes, setNotes] = useState([]);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    fetchNotes();
    // notes.map((note, i) => {document.getElementById(`notes-${i}`).innerHTML = note.notes})
  }, [])

  const fetchNotes = async () => {
    const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + `/youro/api/v1/getNotes/${props.patId}`;
    try {
      const res = await axios.get(url);
      setNotes(res.data);
    }
    catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    notes.map((note, i) => {document.getElementById(`notes-${i}`).innerHTML = note.notes})
  })


  const parser = new DOMParser();

  return (
  <div >
     <div className='notes-doctor'>
        <div style={{color:'#9CB189',alignSelf:'flex-end',cursor:'pointer'}}>
        <FaPlus />
          Add Notes
      </div>
      {notes && notes.length ? notes.map((note, i) => {return (
        <div className='notes-date'>
          <div className='date'>
          <h3>{new Date(note.lastUpdated).toLocaleDateString()}, {note.doctorName}</h3> 
          </div>
          <div className='description'>
            <div id={`notes-${i}`}></div>
        </div>
        </div>
      )}): <><div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h3><i>No record of notes</i></h3>
    </div></>} 

     
</div>
  </div>
);
}

export default Notes;
