import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../styles/Doctor-ui/Doctor-appointment/DA-orders.css";
import Popup from 'reactjs-popup';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../utils/loader';
import { API_DETAILS } from '../../App';
import { COOKIE_KEYS, USER_TYPES } from "../../App";
import Cookies from "js-cookie";

const Orders = (props) => {

 
  const [selectedOption, setSelectedOption] = useState(props.diag);
  const [diagnosisNames, setDiagnoses] = useState([]);
  const [carePlan, setCarePlan] = useState([]);
  const [carePlanDetails, setCarePlanDetails] = useState({}); // []
  const [editCarePlan, setEditCarePlan] = useState(false);
  //const [showItems, setShowItems] = useState(['vitamins', 'medicines', 'lifeStyle']);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [careplanVersion, setCareplanVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState('');
  const [notes, setNotes] = useState('');
  const [followUp, setFollowUp] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  

  useEffect(() => {
    fetchAllDiagnoses();
    fetchVersions();
    if(props.diag){
      fetchMedicines(props.diag)
    }   
  }, [])



  const handleSubmitDosage = async () => {
    const url = `${API_DETAILS.baseUrl}${API_DETAILS.PORT}/youro/api/v1/saveCarePlanDetails`;
    let filteredPrescriptions = {};

    // Assuming carePlanDetails is structured with presTypes nested within
    if (carePlanDetails.presTypes) {
        Object.entries(carePlanDetails.presTypes).forEach(([typeId, prescriptions]) => {
            // Filter prescriptions that have their indicator set to true
            const filtered = prescriptions.filter(prescription => prescription.indicator);
            if (filtered.length > 0) {
                // Add filtered prescriptions to the corresponding type in the new object
                // The API expects the keys to be the names of the types (converted from typeId if necessary)
                //const typeName = prescriptions[0]?.type?.presTypeId; // Adjust based on actual API expectations
                filteredPrescriptions[typeId] = filtered;
            }
        });
    }

    // Prepare the data object for submission
    var data = {
        carePlanDetails: {presTypes: filteredPrescriptions},
        apptId: props.apptId,
        diagID: selectedOption,
        notes: notes,
        doctorId: Cookies.get(COOKIE_KEYS.userId),
        followUp: followUp
    };

    console.log("handleSubmitDosage: ", data);

    // Submit the data
    axios.post(url, data).then(res => {
        props.handleToast(true);
    }).catch(err => {     
        props.handleToast(false);     
    });

    // Close the popup and navigate as necessary
    setOpen(false);
    props.closePopup(false);
    props.nav();
};



  // const handleSubmitDosage = async () => {
  //   const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + `/youro/api/v1/saveCarePlanDetails`;
  //   var data = {};
  //   var dupData = [...carePlanDetails][0]
  //   var dupData2 = {}
  //   dupData2['vitamins'] = dupData.vitamins.filter((i) => i.indicator)
  //   dupData2['lifeStyle'] = dupData.lifeStyle.filter((i) => i.indicator)
  //   dupData2['medicines'] = dupData.medicines.filter((i) => i.indicator)
  //   dupData2['labs'] = dupData.labs.filter((i) => i.indicator)
  //   dupData2['imaging'] = dupData.imaging.filter((i) => i.indicator)
  //   data['carePlanDetails'] = dupData2;
  //   data['apptId'] = props.apptId;
  //   data['diagID'] = selectedOption;
  //   data['notes'] = notes;
  //   data['doctorId'] = Cookies.get(COOKIE_KEYS.userId);
  //   data['followUp'] = followUp;
  //   console.log(data)
  //   axios.post(url, data).then(res => {
  //     props.handleToast(true)
  //   }).catch(err => {     
  //     props.handleToast(false)     
  //   })
  //   setOpen(false)
  //   props.closePopup(false)
  //   props.nav()
  // }

  const fetchAllDiagnoses = async () => {
    const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + `/youro/api/v1/getAllDiagnoses`;
    try {
      const res = await axios.get(url);
      console.log("fetchAllDiagnoses: ",res.data);
      setDiagnoses(res.data);
    }
    catch (err) {
      console.error(err);
    }
  };

  const fetchVersions = async () => {
    const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + `/youro/api/v1/getCarePlanVersions/${props.apptId}`;
    try {
      const res = await axios.get(url);
      console.log("fetchVersions: ", res);
      if(res.data && res.data.length){
        setCareplanVersions(res.data);
        setSelectedVersion(res.data[0].cId);
        getCarePlanDetails(res.data[0].cId, false);//false
      }else{
        setEditCarePlan(true) //true
        props.setCarePlanView(false)
      }
    }
    catch (err) {
      console.error(err);
    }
  };

  const getCarePlanDetails = async (cId, edit) => {
    const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + `/youro/api/v1/getCarePlanDetails/${cId}?edit=${edit}`;
    try {
      console.log("url: ", url);
      const res = await axios.get(url);
      console.log("getCarePlanDetails: ",res);
      if (!edit) {
        console.log("inside !edit");
        setCarePlan(res.data);
      }
      if (edit) {
        setCarePlanDetails(res.data.carePlan); 
        //console.log("diagnosisNames: ", diagnosisNames);
        console.log("res.data", res.data);
        //console.log("inside edit", diagnosisNames.filter(val => val.name == res.data.diagName)[0].diagId);
        setSelectedOption(diagnosisNames.filter(val => val.name == res.data.diagName)[0].diagId);
        //setSelectedOption(res.data.diagId);
        setNotes(res.data.notes); 
        setFollowUp(res.data.followUp)
      }
    }
    catch (err) {
      console.error(err);
    }
  }


  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    fetchMedicines(event.target.value);
  };


  const fetchMedicines = async(diagId) => {
    const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + `/youro/api/v1/getCarePlanDetailsById/${diagId}`;
    try {
      setIsLoading(true)
      const res = await axios.get(url);
      console.log("fetchMedicines : ",res);
      setIsLoading(false);
      console.log("res.data: ", res.data);
      setCarePlanDetails(res.data);
      console.log("carePlanDetails set are: ", carePlanDetails);
      setNotes(res.data.notes)
    }
    catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  // const handleItemSelection = (item) => {
  //   const shwItems = [...showItems]
  //   if(showItems.includes(item)){
  //     const index = shwItems.indexOf(item);
  //     shwItems.splice(index, 1);
  //   } else {
  //     shwItems.push(item)
  //   }

  //   setShowItems(shwItems)
  // }



  const handleCheckboxChange = (i, presType) => {
    // Assuming carePlanDetails is structured with presTypes nested within an array at the first index
    let dupUserRes = { ...carePlanDetails }; // Create a shallow copy of the carePlanDetails object
    
    // Dynamically find the right prescription type array and update the indicator for the matched prescription ID
    if(dupUserRes.presTypes && dupUserRes.presTypes[presType]) {
      dupUserRes.presTypes[presType] = dupUserRes.presTypes[presType].map(item =>
        // add log here to see if the item is being updated
        item.presId === i.presId ? { ...item, indicator: !item.indicator } : item
      );
    }
  
    // Update state with the modified object
    console.log("handleCheckboxChange: ", dupUserRes);
    setCarePlanDetails(dupUserRes);
  };
  



  // const handleCheckboxChange = (i, presType) => {
  //   var dupUserRes = [...carePlanDetails]
  //   switch (presType) {
  //     case 'lifestyle':
  //       dupUserRes[0]['lifeStyle'] = dupUserRes[0]['lifeStyle'].map((item) =>
  //           item.presId === i.presId ? { ...item, indicator: !item.indicator } : item
  //         )
  //       break;
  //     case 'vitamins':
  //       dupUserRes[0]['vitamins'] = dupUserRes[0]['vitamins'].map((item) =>
  //           item.presId === i.presId ? { ...item, indicator: !item.indicator } : item
  //         )
  //       break;
  //     case 'medicines':
  //       dupUserRes[0]['medicines'] = dupUserRes[0]['medicines'].map((item) =>
  //           item.presId === i.presId ? { ...item, indicator: !item.indicator } : item
  //         )
  //       break;
  //      case 'labs':
  //       dupUserRes[0]['labs'] = dupUserRes[0]['labs'].map((item) =>
  //           item.presId === i.presId ? { ...item, indicator: !item.indicator } : item
  //         )
  //       break;
  //     case 'imaging':
  //       dupUserRes[0]['imaging'] = dupUserRes[0]['imaging'].map((item) =>
  //           item.presId === i.presId ? { ...item, indicator: !item.indicator } : item
  //         )
  //       break;
     
  //     default:
  //       break;
  //   }

  //   setCarePlanDetails(dupUserRes)
  // };

  const handleDosage = (presType, prescription, value) => {
    // Assuming carePlanDetails is structured with presTypes
    let dupCarePlanDetails = { ...carePlanDetails }; // Create a shallow copy of the carePlanDetails object
    
    // Dynamically find the right prescription type array and update the dosage for the matched prescription ID
    if(dupCarePlanDetails.presTypes && dupCarePlanDetails.presTypes[presType]) {
      dupCarePlanDetails.presTypes[presType] = dupCarePlanDetails.presTypes[presType].map(item =>
        item.presId === prescription.presId ? { ...item, dosage: value } : item
      );
    }
  
    // Update state with the modified object
    console.log("handleDosage: ", dupCarePlanDetails);
    setCarePlanDetails(dupCarePlanDetails);
};




  // const handleDosage = (presType, i, value) => {
  //   console.log(i)
  //   var dupUserRes = [...carePlanDetails]
  //   switch (presType) {
  //     case 'lifeStyle':
  //       dupUserRes[0]['lifeStyle'] = dupUserRes[0]['lifeStyle'].map((item) =>
  //           item.presId === i.presId ? { ...item, dosage: value } : item
  //         )
  //       break;
  //     case 'vitamins':
  //       dupUserRes[0]['vitamins'] = dupUserRes[0]['vitamins'].map((item) =>
  //           item.presId === i.presId ? { ...item, dosage: value } : item
  //         )
  //       break;
  //     case 'medicines':
  //       dupUserRes[0]['medicines'] = dupUserRes[0]['medicines'].map((item) =>
  //           item.presId === i.presId ? { ...item, dosage: value } : item
  //         )
  //       break;
  //      case 'labs':
  //       dupUserRes[0]['labs'] = dupUserRes[0]['labs'].map((item) =>
  //           item.presId === i.presId ? { ...item, dosage: value } : item
  //         )
  //       break;
  //     case 'imaging':
  //       dupUserRes[0]['imaging'] = dupUserRes[0]['imaging'].map((item) =>
  //           item.presId === i.presId ? { ...item, dosage: value } : item
  //         )
  //       break;
     
  //     default:
  //       break;
  //   }

  //   setCarePlanDetails(dupUserRes)
  // };


  const handleSub = () => {
    setOpen(true)
  }

  const handleSelectVersionChange = (e) => {
    setSelectedVersion(e.target.value);
    getCarePlanDetails(e.target.value, false)
  }

  const handleEdit = () => {
    setEditCarePlan(true);
    getCarePlanDetails(selectedVersion, true)
    props.setCarePlanView(false)
    // fecthMedicinesV2()
  }


  return (
    <div>
      <ToastContainer />
      {!editCarePlan && carePlan && carePlan['carePlan'] && <div style={{overflow: 'auto', height: '80vh', width: '500px'}}>
      <select id="s" name="s" style={{marginLeft: '0px'}} className='dropdown-chart' value={selectedVersion} onChange={handleSelectVersionChange}>
        {
          careplanVersion.map((result) => (<option value={result.cId}>{result.version}</option>))
        }
      </select>
      {Object.keys(carePlan['carePlan'].presTypes).map(presType => (
        carePlan['carePlan'].presTypes[presType].filter(item => item.indicator).map(item => (<div key={presType}> {/* should check 0 */}
          <h4 style={{margin: '15px 0px'}}>{item.type.name}</h4>
          <h5 style={{margin: '0px 10px'}}>{item.categoryName}</h5>
          <ul style={{margin: '0px'}}>
            { carePlan['carePlan'].presTypes[presType].map(item => (
              item.indicator && <>
                <li key={item.presId}>
                {item.presName}
                {item.dosage ? ` - ${item.dosage}` : ''}
                {/* {item.indicator ? ' (Indicator)' : ''} */}
              </li>
                </>
              
            ))}
          </ul>
        </div>      
      ))))} <br /><br />
      {carePlan.followUp ? <div style={{display: 'flex', alignItems: 'center'}}><span class="material-symbols-outlined">
                            sync
                            </span><strong>&nbsp;&nbsp;Follow-up required</strong></div> :
                             <div style={{display: 'flex', alignItems: 'center'}}><span class="material-symbols-outlined">
                             select_check_box
                             </span><strong>&nbsp;&nbsp;Follow-up not required</strong></div>} <br /> <br />
      <strong>Notes : </strong><p style={{wordWrap: 'break-word'}}>{carePlan.notes}</p> <br /><br /><br />
      {console.log(selectedVersion, careplanVersion.filter(val => val.cId == selectedVersion && val.edit))}{careplanVersion.filter(val => val.cId == selectedVersion && val.edit)[0] && <div className='btn-filled' onClick={() => handleEdit()}>Edit</div>}</div>}

      {editCarePlan && <div className='order-div'>

<div className='orders-row'>
  <div className='dropdown-list' style={{width: 'fit-content'}}>

 <select id="d" name="d" className='dropdown-chart' style={{marginLeft: '0px'}} value={selectedOption} onChange={handleSelectChange}>
  <option>Select Diagnosis</option>
  {
    diagnosisNames.map((result) => (<option value={result.diagId}>{result.name}</option>))
  }
</select>
</div>

  {/* {selectedOption && <> {carePlanDetails && carePlanDetails[0] && Object.keys(carePlanDetails[0]).slice(0, 3).map((title) =>  <>
      <button className={showItems.includes(title) ? 'btn-outlined-selected' : 'btn-outlined'} onClick={() => handleItemSelection(title)}>{title}</button></>
  )}
    
  </>} */}

  
</div>

{selectedOption && <>

<></>


<div className="orders-checklist">
  <div className='orders-3' style={{width: '60%'}}>
    {carePlanDetails.presTypes && Object.keys(carePlanDetails.presTypes).map((typeKey) => (
      <div key={typeKey} className="orders-name" style={{width: '33.3%'}}>
        <p className='order-label'><strong>{carePlanDetails.presTypes[typeKey][0].type.name}</strong></p>
        {/* Group by category */}
        {Object.values(carePlanDetails.presTypes[typeKey].reduce((acc, item) => {
          // Create a group for each category if it doesn't exist
          if (!acc[item.category.name]) {
            acc[item.category.name] = [];
          }
          // Add the item to the category group
          acc[item.category.name].push(item);
          return acc;
        }, {})).map((categoryItems, index) => (
          <div key={index} style={{marginLeft: '10px'}}>
            <p style={{fontSize: '0.8rem'}}>{categoryItems[0].category.name}</p>
            {categoryItems.map(item => (
              <div key={item.presId} style={{marginLeft: '20px'}}>
                <input
                  type="checkbox"
                  id={`item-${item.presId}`}
                  checked={item.indicator}
                  onChange={() => handleCheckboxChange(item, item.type.presTypeId)} // name changes to type.presTypeId
                />
                <label htmlFor={`item-${item.presId}`} style={{fontSize: '0.8rem'}}><i>{item.presName}</i></label>
              </div>
            ))}
          </div>
        ))}
      </div>
    ))}
  </div>
</div>

<div style={{width: '95%', margin: '0px auto'}}>
<textarea style={{width: '100%', height: '50px'}} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder='Enter your notes here...'></textarea>
</div>
<br />
<input id='followUp' checked={followUp ? true : false} onChange={e => setFollowUp(followUp ? null : true)} type='checkbox'></input>
<label for='followUp'>Follow-up required</label>

<div className='submit-button'>
<button className='btn-filled ' onClick={handleSub} style={{padding: '10px 15px'}}>Submit order</button>
</div>
</>}

{!selectedOption && <>
<div style={{ width: '100%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h3><i>Please select a diagnosis to complete order</i></h3>
            </div>
</>}


<Popup open={open} modal closeOnDocumentClick={false} onClose={() => setOpen(false)} className="congrats-popup">
    <div style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} onClick={() => setOpen(false)}>
        <span class="material-symbols-outlined">close</span>
    </div>

    <h1 style={{color: 'black', padding: '20px'}}>Dosage Instructions & Notes</h1>

    <div style={{padding: '0px 20px 20px 20px'}} className='popup-height'>
        {carePlanDetails.presTypes && Object.entries(carePlanDetails.presTypes).map(([typeId, prescriptions]) => {
            const presType = prescriptions[0]?.type?.name;
            const hasIndicator = prescriptions.some(prescription => prescription.indicator);

            return hasIndicator && (
                <>
                    <h3>{presType}</h3>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: '10px'}}>
                        {prescriptions.map((prescription, i) => prescription.indicator && (
                            <div style={{width: '45%'}} key={i}>
                                <label>{prescription.presName} :</label>
                                <input 
                                    className="input-field input-border" 
                                    type="text" 
                                    value={prescription.dosage || ''} 
                                    onChange={(e) => handleDosage(prescription.type.presTypeId, prescription, e.target.value)} //presType.toLowerCase()
                                />
                            </div>
                        ))}
                    </div>
                    <hr style={{marginTop: '20px'}}></hr>
                </>
            );
        })}
        
        <div className='btn-filled' style={{padding: '10px 15px'}} onClick={handleSubmitDosage}>Submit</div>
    </div>
</Popup>


{/* <Popup open={open} modal closeOnDocumentClick={false} onClose={() => setOpen(false)} className="congrats-popup">
    <div style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} onClick={() => { setOpen(false) }}>
        <span class="material-symbols-outlined">
            close
        </span>
    </div>

    <h1 style={{color: 'black', padding: '20px'}}>Dosage Instructions & Notes </h1>

    <div style={{padding: '0px 20px 20px 20px'}} className='popup-height'>
      
        {(open && carePlanDetails[0].vitamins.map((item, i) => {return item.indicator && 1}).includes(1)) && <>
          <h3>Vitamins/Supplements</h3>
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: '10px'}}>
              
                {open && carePlanDetails[0] && carePlanDetails[0].vitamins.map((item, i) => {return item.indicator && <>
                  <div style={{width: '45%'}} key={i}>
                  <label>{item.presName} :</label>
                    <input className="input-field input-border" type="text" value={item.dosage} onChange={(e) => handleDosage('vitamins', item, e.target.value)}/>
                    </div>
                    </>})}
                  
                
            </div>
            <hr style={{marginTop: '20px'}}></hr>
        </>}

        {(open && carePlanDetails[0].lifeStyle.map((item, i) => {return item.indicator && 1}).includes(1)) && <>
          <h3>life Style</h3>
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
              
                {open && carePlanDetails[0] && carePlanDetails[0].lifeStyle.map((item, i) => {return item.indicator && <>
                  <div style={{width: '45%'}} key={i}>
                  <label>{item.presName} :</label>
                    <input className="input-field input-border" type="text" value={item.dosage} onChange={(e) => handleDosage('lifeStyle', item, e.target.value)}/>
                    </div>
                    </>})}
                  
                
            </div>
            <hr style={{marginTop: '20px'}}></hr>
        </>}
      
        {(open && carePlanDetails[0].medicines.map((item, i) => {return item.indicator && 1}).includes(1)) && <>
          <h3>Medicines</h3>
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
              
                {open && carePlanDetails[0] && carePlanDetails[0].medicines.map((item, i) => {return item.indicator && <>
                  
                  <div style={{width: '45%'}} key={i}><label>{item.presName} :</label>
                    <input className="input-field input-border" type="text" value={item.dosage} onChange={(e) => handleDosage('medicines', item, e.target.value)}/>
                    </div>
                    </>})}
                
            </div>
            <hr style={{marginTop: '20px'}}></hr>
        </>}
      
        {(open && carePlanDetails[0].labs.map((item, i) => {return item.indicator && 1}).includes(1)) && <>
          <h3>Labs</h3>
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
              
                {open && carePlanDetails[0] && carePlanDetails[0].labs.map((item, i) => {return item.indicator && <>
                  <div style={{width: '45%'}} key={i}>
                  <label>{item.presName} :</label>
                    <input className="input-field input-border" type="text" value={item.dosage} onChange={(e) => handleDosage('labs', item, e.target.value)}/>
                    </div>
                    </>})}
                  
                
            </div>
            <hr style={{marginTop: '20px'}}></hr>
        </>}
      
        {(open && carePlanDetails[0].imaging.map((item, i) => {return item.indicator && 1}).includes(1)) && <>
          <h3>Imaging</h3>
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
              
                {open && carePlanDetails[0] && carePlanDetails[0].imaging.map((item, i) => {return item.indicator && <>
                  <div style={{width: '45%'}} key={i}>
                  <label>{item.presName} :</label>
                    <input className="input-field input-border" type="text" value={item.dosage} onChange={(e) => handleDosage('imaging', item, e.target.value)}/>
                    </div>
                    </>})}
                  
                
            </div>
            <hr style={{marginTop: '20px'}}></hr>
        </>}
      

        <div className='btn-filled' style={{padding: '10px 15px'}} onClick={handleSubmitDosage}>Submit</div>

    </div>

</Popup> */}


</div>}
    
   <Loader active={isLoading} />
   </div>
  );
};

export default Orders;
