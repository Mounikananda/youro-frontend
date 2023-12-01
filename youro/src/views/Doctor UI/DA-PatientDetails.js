import React, { useState,useEffect, useRef } from 'react';
import "../../styles/Doctor-ui/Doctor-appointment/Doctor-patient-data.css";
import IncompleteEncounters from './IncompleteEncounters';
import PersonalInfo from './DA-personal-info';
import FileUpload from './DA-Results';
import Notes from './DA-notes';
import Orders from './DA-orders';
import ReactQuillWrapper from './DA-takenote';
import { Routes, Route, useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../utils/loader';
import { API_DETAILS } from '../../App';
import Popup from 'reactjs-popup';
import { ToastContainer, toast } from 'react-toastify';
import { COOKIE_KEYS, USER_TYPES } from "../../App";
import Cookies from "js-cookie";
import 'react-quill/dist/quill.snow.css';
import { FaPlus} from 'react-icons/fa';

const PatientDetails = (props) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [overviewTab, setOverviewTab] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(false);
  const [results, setResults] = useState(false);
  const [notes, setNotes] = useState(false);
  const [orders, setOrders] = useState(false);
  const [followup, setFollowup] = useState(false);
  const [prevAppts, setPrevAppts] = useState([]);
  const [upComingAppts, setUpcomingAppts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let {patientId, apptId} = useParams();
  const [patDetails, setPatDetails] = useState();
  const [isOpenCreatePopUp, setOpenCreatePopUp] = useState(false);
  const [diagName, setDiagName] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [carePlanView, setCarePlanView] = useState(true);


  const handleOverview = (data) => {
    setActiveTab(data);
  }

  useEffect(() => {
    console.log(patientId);
    fetchAppointments();
    getPatientDetails();
    fetchPatientPicture();
  }, []);

  useEffect(() => {
    if (apptId){
      setOpenCreatePopUp(true)
    }
    
  }, [apptId])



  const getPatientDetails = async() => {
    const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + `/youro/api/v1/getUser/${patientId}`;
    try {
      setIsLoading(true)
      const res = await axios.get(url);
      setPatDetails(res.data)
      setIsLoading(false)
    }
    catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }




  const fetchPatientPicture = async () => {
    const get_url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/getDp/${patientId}`;
    try {
      const response = await axios.get(get_url,{ responseType: 'arraybuffer' });

      if (response.status === 200) {
        console.log("came ",response);
        const arrayBuffer = new Uint8Array(response.data);
        if(arrayBuffer.length!=0)
       {
        const base64Image = btoa(
          new Uint8Array(arrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        setImagePreview(`data:image/jpeg;base64,${base64Image}`);
       }
      }
    }catch (err) {
      console.log("getting get_api error pic ");
      console.error(err);
    }
  }

  const fetchAppointments = async() => {
    const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + `/youro/api/v1/appointments/${patientId}?timeZone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
    console.log(url)
    try {
      setIsLoading(true)
      const res = await axios.get(url);
      setPrevAppts(res.data.previousAppointments);
      setUpcomingAppts(res.data.upComingAppointments);
      setIsLoading(false)
    }
    catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  const TodayAppointmentList = () => {
  

  return (
    <div>
        {
          (upComingAppts==null || upComingAppts.length == 0) && <>
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h3><i>No record of appointments</i></h3>
            </div>
          </>
        }

          {upComingAppts && upComingAppts.length!= 0 && upComingAppts.map((item) => (
            <div className='previous-appointment'> 
             <div>
             <h3 style={{display: 'inline-block'}}>{new Date(item.apptStartTime).toLocaleDateString()}, {item.apptStartTime.split(' ')[4].split(':').slice(0, 2).join(":")}</h3>{item.status == 'CANCELED' && <div className='cancel-tag'>cancelled</div>}
              <div style={{ display: 'flex',flexDirection:'row',height:'30px',marginTop:'1.5%'}}>
                  <img
                src={item.picture? `data:image/png;base64,${item.picture}`: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1697800963~exp=1697801563~hmac=a964f83412aeedf85e035a4192fe19e1c7001f7ec339ba51104c9372481f77c9'}
                // src={item.picture!=null ? ImagePrev(item.picture): 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1697800963~exp=1697801563~hmac=a964f83412aeedf85e035a4192fe19e1c7001f7ec339ba51104c9372481f77c9'}
                className="profile-pic" alt="Patient Image" width="25" height="25"/>
              <h3 style={{marginTop:'3%',marginLeft:'2%'}}>
                <Link style={{ textDecoration: 'none' }} to={`/doctor-view-profile/${item.patientId}`}>{item.doctorName}</Link>
              </h3>
            </div>
            </div>
            <ul key={item.apptId}>
              {item.status != 'CANCELED' && <>
              <li onClick={() => setDiagName(item.diagId)} style={{ textDecoration: 'underline', color: '#9CB189', cursor: 'pointer' }}><Link style={{ textDecoration: 'none' }} to={`${item.apptId}`}>View/edit the care plan</Link></li>
            <li style={{ textDecoration: 'underline', color: '#9CB189', cursor: 'pointer' }} onClick={() => setShowEditor(item)}>Add note for doctors</li>
              </>}
            
              <li>Diagnosisname: <strong>{item.diagName}</strong></li>
              {/* <li>Symptom score: {item.symptomscore}</li> */}
              {item.status != 'CANCELED' && <li>Symptom score: <strong>{item.symptomScore}</strong></li>}
              {/* <p>{item.meetup}</p> */}
            </ul>
          </div>
        ))
        
        }
      </div>
  );
};

const PreviousAppointmentList = () => {
  

  return (
    <div>
        {
          (prevAppts==null || prevAppts.length == 0) && <>
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h3><i>No record of previous appointments</i></h3>
            </div>
          </>
        }

          {prevAppts && prevAppts.length!= 0 && prevAppts.map((item) => (
            <div className='previous-appointment'> 
             <div>
             <h3 style={{display: 'inline-block'}}>{new Date(item.apptStartTime).toLocaleDateString()}, {item.apptStartTime.split(' ')[4].split(':').slice(0, 2).join(":")}</h3>{item.status == 'CANCELED' && <div className='cancel-tag'>cancelled</div>}
              <div style={{ display: 'flex',flexDirection:'row',height:'30px',marginTop:'1.5%'}}>
                  <img
                src={item.picture? `data:image/png;base64,${item.picture}`: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1697800963~exp=1697801563~hmac=a964f83412aeedf85e035a4192fe19e1c7001f7ec339ba51104c9372481f77c9'}
                // src={item.picture!=null ? ImagePrev(item.picture): 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1697800963~exp=1697801563~hmac=a964f83412aeedf85e035a4192fe19e1c7001f7ec339ba51104c9372481f77c9'}
                className="profile-pic" alt="Patient Image" width="25" height="25"/>
              <h3 style={{marginTop:'3%',marginLeft:'2%'}}>
                <Link style={{ textDecoration: 'none' }} to={`/doctor-view-profile/${item.patientId}`}>{item.doctorName}</Link>
              </h3>
            </div>
            </div>
            <ul key={item.apptId}>
            {item.status != 'CANCELED' && <><li onClick={() => setDiagName(item.diagId)} style={{ textDecoration: 'underline', color: '#9CB189', cursor: 'pointer' }}><Link style={{ textDecoration: 'none' }} to={`${item.apptId}`}>View/edit the care plan</Link></li>
            <li style={{ textDecoration: 'underline', color: '#9CB189', cursor: 'pointer' }} onClick={() => setShowEditor(item)}>Add note for doctors</li></>}
              <li>Diagnosisname: <strong>{item.diagName}</strong></li>
              {/* <li>Symptom score: {item.symptomscore}</li> */}
              {item.status != 'CANCELED' && <li>Symptom score: <strong>{item.symptomScore}</strong></li>}
              {/* <p>{item.meetup}</p> */}
            </ul>
          </div>
        ))
        
        }
      </div>
  );
};

  const [showEditor, setShowEditor] = useState(false);
  

  const handleCreateNoteClick = () => {
    setShowEditor(!showEditor);
  };

 const handlenoteclickclose =()=> {
   setShowEditor(false);
  }

  const handleToast = (val) => {
    if (val) toast.success('Prescription saved successfully')
    if(!val) toast.error('Error saving prescription')
  }

  const navigate = useNavigate();
  const closeElement = React.useRef();

  const handleNotesSubmit = () => {
    const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + `/youro/api/v1/saveNotes`;
    var data = {};
    data['apptId'] = showEditor.apptId ? showEditor.apptId : 3;
    data['patientId'] = parseInt(showEditor.patientId ? showEditor.patientId : patientId);
    data['doctorId'] = parseInt(Cookies.get(COOKIE_KEYS.userId));
    data['notes'] = notes
    console.log("notes data",data);
    axios.post(url, data).then(res => {
      toast.success('Notes saved successfully')
      setShowEditor(null);
    }).catch(err => {   
      toast.error("Error saving Notes")    
    })
  }



  return (
    <div className='p-data'>

      <div className='p-all-data'>
        <div className='p-data-col' style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <div>
          <img style={{margin: '0px 20px 0px 0px', borderRadius: '100%', minWidth: '100px'}} src={imagePreview? imagePreview : 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1697800963~exp=1697801563~hmac=a964f83412aeedf85e035a4192fe19e1c7001f7ec339ba51104c9372481f77c9'} className="profile-pic" alt="Preview" height="100" />
          </div>
          
          <div>
            {patDetails && <><p className='label-p-data' ><strong>Name: </strong><i>{patDetails.firstName + ' ' + patDetails.lastName}</i></p>
            <p className='label-p-data'><strong>DOB: </strong><i>{'12/12/1999'}</i></p></> }
          </div>
          
        </div>
        <div className='p-data-row'>
          {/* <div >Message</div> */}
            <Link style={{ textDecoration: 'none' }} to={`/doctor-chat?patientId=${patDetails?.userId}`}>Message</Link>
          {/* {showEditor && (
        <div className="floating-editor">
            <ReactQuillWrapper/>
        </div> */}
      {/* )} */}
        </div>
      </div>
      <div className='p-div-row'>
        <div
          className={`p-tabs ${activeTab === 'overview' ? 'active-tab' : ''}`}
          onClick={() => handleOverview('overview')}
        >
          Overview
        </div>
        <div
          className={`p-tabs ${activeTab === 'personalinfo' ? 'active-tab' : ''}`}
          onClick={() => handleOverview('personalinfo')}
        >
          Personal Info
        </div>
        <div
          className={`p-tabs ${activeTab === 'results' ? 'active-tab' : ''}`}
          onClick={() => handleOverview('results')}
        >
          Results
        </div>
        <div
          className={`p-tabs ${activeTab === 'notes' ? 'active-tab' : ''}`}
          onClick={() => handleOverview('notes')}
        >
          Notes
        </div>
        {/* <div
          className={`p-tabs ${activeTab === 'orders' ? 'active-tab' : ''}`}
          onClick={() => handleOverview('orders')}
        >
          Orders
        </div> */}
       </div>
       {activeTab === 'overview' && (
           <div className='all-plans-patient'>
          <div className='care-plan-details-doctor-apt'>
          <h2>Upcoming Appointments</h2>
          <TodayAppointmentList/></div>
           <div className='care-plan-details-doctor-apt'>
           <h2>Previous Appointments</h2>
           <PreviousAppointmentList/>
           </div>
          <div className='care-plan-details-doctor-apt'>
          <h2>Incomplete Encounters</h2>
           <IncompleteEncounters/>
          </div>
          </div>
           )}

      {activeTab === 'personalinfo' && (
        // <div className="tab-content">
         <PersonalInfo data={patDetails}/>
      //  </div>
      )}

      {activeTab === 'results' && (
        // <div className="tab-content">Results Content Goes Here</div>
        <FileUpload data={patientId}/>
      )}
     
      {activeTab === 'notes' && (
       <Notes patId={patientId} showEditor={setShowEditor}/>
      )}

      {/* {activeTab === 'orders' && (
        <Orders patId={patientId}/>
      )} */}




        {showEditor && (
        <div className="floating-editor">
            {/* <button >Minimize</button>
            <button >Maximize</button> */}
            <div className='notes-title'>
            <label>Notes</label>
            <button onClick={() => setShowEditor(null)}>X</button>
           </div>
          {/* <ReactQuillWrapper /> */}
            <ReactQuillWrapper  val={setNotes}/>
            <div className='notes-title'>
            <button onClick={() => handleNotesSubmit()} style={{right: '0px', position: 'absolute', bottom: '0px'}}>Submit</button>
            </div>
        </div> )}
      
        <Popup className={!carePlanView ? 'order-popup': 'congrats-popup'} closeOnEscape={false} open={isOpenCreatePopUp} modal closeOnDocumentClick={false} onClose={() => setOpenCreatePopUp(false)}>
                  <div style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} onClick={() => { setOpenCreatePopUp(false); navigate("..", { relative: "path" })}}>
                    {/* <Link to='..' relative="path"> */}
                      <span class="material-symbols-outlined">
                      close
                    </span>
                    {/* </Link> */}
                  </div>

                  <div style={{ padding: '50px 20px' }}>
                    
                  <Orders setCarePlanView={setCarePlanView} patId={patientId} apptId={apptId} diag={diagName} closePopup={setOpenCreatePopUp} handleToast={handleToast} nav={() => {navigate("..", { relative: "path" })}}/>
                  </div>



                </Popup>

    <Loader active={isLoading} />
    <ToastContainer />
    </div>
  );
}

export default PatientDetails;
