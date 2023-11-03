import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../styles/Doctor-ui/Doctor-appointment/DA-orders.css";
import Popup from 'reactjs-popup';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../utils/loader';

const Orders = (props) => {

 
  const [selectedOption, setSelectedOption] = useState('');
  const [diagnosisNames, setDiagnoses] = useState([]);
  const [carePlanDetails, setCarePlanDetails] = useState([]);
  const [showItems, setShowItems] = useState(['vitamins', 'medicines', 'lifeStyle']);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  

  useEffect(() => {
    fetchAllDiagnoses();

  
  }, [])

  const handleSubmitDosage = async () => {
    const url = `http://52.14.33.154:9093/youro/api/v1/saveCarePlanDetails`;
    var data = {};
    var dupData = [...carePlanDetails][0]
    var dupData2 = {}
    dupData2['vitamins'] = dupData.vitamins.filter((i) => i.indicator)
    dupData2['lifeStyle'] = dupData.lifeStyle.filter((i) => i.indicator)
    dupData2['medicines'] = dupData.medicines.filter((i) => i.indicator)
    dupData2['labs'] = dupData.labs.filter((i) => i.indicator)
    dupData2['imaging'] = dupData.imaging.filter((i) => i.indicator)
    data['carePlanDetails'] = dupData2;
    data['apptId'] = props.apptId;
    data['diagID'] = selectedOption;
    console.log(data)
    axios.post(url, data).then(res => {
      toast.success('Prescription saved succesfully')
      console.log(res)
    }).catch(err => {
      toast.error('Error saving prescription')
      console.log(err)
    })
    setOpen(false)
      
  }

  const fetchAllDiagnoses = async () => {
    // console.log("====^^^===");
    // console.log("fetchAllDiagnoses START");
    const url = `http://52.14.33.154:9093/youro/api/v1/getAllDiagnoses`;
    try {
      const res = await axios.get(url);
      setDiagnoses(res.data);
    }
    catch (err) {
      console.error(err);
    }
    // console.log("fetchAllDiagnoses END");
    // console.log("====^^^===");
  };


  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    fetchMedicines(event.target.value);
  };

  const fetchMedicines = async(diagId) => {
    const url = `http://52.14.33.154:9093/youro/api/v1/getCarePlanDetails?apptId=${props.apptId}&diagId=${diagId}`;
    try {
      setIsLoading(true)
      const res = await axios.get(url);
      // setPrevAppts(res.data.previousAppointments);
      // setUpcomingAppts(res.data.upComingAppointments);
      setIsLoading(false)
      setCarePlanDetails([res.data])
    }
    catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  const handleItemSelection = (item) => {
    const shwItems = [...showItems]
    if(showItems.includes(item)){
      const index = shwItems.indexOf(item);
      shwItems.splice(index, 1);
    } else {
      shwItems.push(item)
    }

    setShowItems(shwItems)
  }

  const handleCheckboxChange = (i, category) => {
    var dupUserRes = [...carePlanDetails]
    switch (category) {
      case 'lifestyle':
        dupUserRes[0]['lifeStyle'] = dupUserRes[0]['lifeStyle'].map((item) =>
            item.presId === i.presId ? { ...item, indicator: !item.indicator } : item
          )
        break;
      case 'vitamins':
        dupUserRes[0]['vitamins'] = dupUserRes[0]['vitamins'].map((item) =>
            item.presId === i.presId ? { ...item, indicator: !item.indicator } : item
          )
        break;
      case 'medicines':
        dupUserRes[0]['medicines'] = dupUserRes[0]['medicines'].map((item) =>
            item.presId === i.presId ? { ...item, indicator: !item.indicator } : item
          )
        break;
       case 'labs':
        dupUserRes[0]['labs'] = dupUserRes[0]['labs'].map((item) =>
            item.presId === i.presId ? { ...item, indicator: !item.indicator } : item
          )
        break;
      case 'imaging':
        dupUserRes[0]['imaging'] = dupUserRes[0]['imaging'].map((item) =>
            item.presId === i.presId ? { ...item, indicator: !item.indicator } : item
          )
        break;
     
      default:
        break;
    }

    setCarePlanDetails(dupUserRes)
  };

  const handleDosage = (category, i, value) => {
    console.log(i)
    var dupUserRes = [...carePlanDetails]
    switch (category) {
      case 'lifestyle':
        dupUserRes[0]['lifeStyle'] = dupUserRes[0]['lifestyle'].map((item) =>
            item.presId === i.presId ? { ...item, dosage: value } : item
          )
        break;
      case 'vitamins':
        console.log(dupUserRes[0]['vitamins'].map((item) =>
        item.presId === i.presId ? { ...item, dosage: value } : item
      ))
        dupUserRes[0]['vitamins'] = dupUserRes[0]['vitamins'].map((item) =>
            item.presId === i.presId ? { ...item, dosage: value } : item
          )
        break;
      case 'medicines':
        dupUserRes[0]['medicines'] = dupUserRes[0]['medicines'].map((item) =>
            item.presId === i.presId ? { ...item, dosage: value } : item
          )
        break;
       case 'labs':
        dupUserRes[0]['labs'] = dupUserRes[0]['labs'].map((item) =>
            item.presId === i.presId ? { ...item, dosage: value } : item
          )
        break;
      case 'imaging':
        dupUserRes[0]['imaging'] = dupUserRes[0]['imaging'].map((item) =>
            item.presId === i.presId ? { ...item, dosage: value } : item
          )
        break;
     
      default:
        break;
    }

    setCarePlanDetails(dupUserRes)
  };


  const handleSub = () => {
    setOpen(true)
  }


  return (
    <div>
      <ToastContainer />
    <div className='order-div'>

      <div className='orders-row'>
        <div className='dropdown-list'>

       <select id="d" name="d" className='dropdown-chart' value={selectedOption} onChange={handleSelectChange}>
        <option>Select Diagnosis</option>
        {
          diagnosisNames.map((result) => (<option value={result.diagId}>{result.name}</option>))
        }
      </select>
     </div>

        {selectedOption && <> {carePlanDetails && carePlanDetails[0] && Object.keys(carePlanDetails[0]).slice(0, 3).map((title) =>  <>
            <button className={showItems.includes(title) ? 'btn-outlined-selected' : 'btn-outlined'} onClick={() => handleItemSelection(title)}>{title}</button></>
        )}
          
        </>}
      
        
      
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

     {selectedOption && <>

     

     <></>
      <div className="orders-checklist">
        <div className='orders-3'>
        {(showItems.includes('vitamins') || showItems.includes('lifeStyle') || showItems.includes('medicines')) && <>
        
          
          {showItems.includes('lifeStyle') && <>
          <div className="orders-name">
          <p className='order-label'>LifeStyle</p>
          <div>
            {carePlanDetails[0] && carePlanDetails[0].lifeStyle.map((item) => (
              <div key={item.presId}>
                <input
                  type="checkbox"
                  id={`lifestyle-item-${item.id}`}
                  checked={item.indicator}
                  onChange={() => handleCheckboxChange(item, 'lifestyle')}
                />
                <label htmlFor={`lifestyle-item-${item.presId}`}>{item.name}</label>
              </div>
            ))}
          </div>
          </div>
          </>}

        
     
      
        
          {showItems.includes('vitamins') && <>
          <div className="orders-name">
          <p className='order-label'>Vitamins/Supplements</p>
          <div>
            {carePlanDetails[0] && carePlanDetails[0].vitamins.map((item) => (
              <div key={item.presId}>
                <input
                  type="checkbox"
                  id={`lifestyle-item-${item.id}`}
                  checked={item.indicator}
                  onChange={() => handleCheckboxChange(item, 'vitamins')}
                />
                <label htmlFor={`lifestyle-item-${item.presId}`}>{item.name}</label>
              </div>
            ))}
          </div>
          </div>
          </>}
 

        
          {showItems.includes('medicines') && <>
          <div className="orders-name">
          <p className='order-label'>Medicines</p>
          <div>
            {carePlanDetails[0] && carePlanDetails[0].medicines.map((item) => (
              <div key={item.presId}>
                <input
                  type="checkbox"
                  id={`lifestyle-item-${item.id}`}
                  checked={item.indicator}
                  onChange={() => handleCheckboxChange(item, 'medicines')}
                />
                <label htmlFor={`lifestyle-item-${item.id}`}>{item.name}</label>
              </div>
            ))}
          </div>
          </div>
          </>}
        </>}
        
        </div>


	 <div className='orders-3'>
          
          <div className="orders-name">
          <p className='order-label'>Labs</p>
          <div>
            {carePlanDetails[0] && carePlanDetails[0].labs.map((item) => (
              <div key={item.presId}>
                <input
                  type="checkbox"
                  id={`lifestyle-item-${item.id}`}
                  checked={item.indicator}
                  onChange={() => handleCheckboxChange(item, 'labs')}
                />
                <label htmlFor={`lifestyle-item-${item.id}`}>{item.name}</label>
              </div>
            ))}
          </div>
          </div>


   
          <div className="orders-name">
          <p className='order-label'>Imaging</p>
          <div>
            {carePlanDetails[0] && carePlanDetails[0].imaging.map((item) => (
              <div key={item.presId}>
                <input
                  type="checkbox"
                  id={`lifestyle-item-${item.id}`}
                  checked={item.indicator}
                  onChange={() => handleCheckboxChange(item, 'imaging')}
                />
                <label htmlFor={`lifestyle-item-${item.id}`}>{item.name}</label>
              </div>
            ))}
          </div>
          </div>
       </div>
   </div>
     <div className='submit-button'>
     <button className='btn-filled ' onClick={handleSub}>Submit order</button>
     </div>
     </>}

     {!selectedOption && <>
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h3><i>Please select a diagnosis to complete order</i></h3>
                  </div>
     </>}

     <Popup open={open} modal closeOnDocumentClick={false} onClose={() => setOpen(false)} className="congrats-popup">
          <div style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} onClick={() => { setOpen(false) }}>
              <span class="material-symbols-outlined">
                  close
              </span>
          </div>

          <h1 style={{color: 'black', padding: '20px'}}>Dosage Instructions</h1>

          <div style={{padding: '0px 20px 20px 20px'}} className='popup-height'>
            
              {(open && carePlanDetails[0].vitamins.map((item, i) => {return item.indicator && 1}).includes(1)) && <>
                <h3>Vitamins/Supplements</h3>
                  <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: '10px'}}>
                    
                      {open && carePlanDetails[0] && carePlanDetails[0].vitamins.map((item, i) => {return item.indicator && <>
                        <div style={{width: '45%'}} key={i}>
                        <label>{item.name} :</label>
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
                        <label>{item.name} :</label>
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
                        
                        <div style={{width: '45%'}} key={i}><label>{item.name} :</label>
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
                        <label>{item.name} :</label>
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
                        <label>{item.name} :</label>
                          <input className="input-field input-border" type="text" value={item.dosage} onChange={(e) => handleDosage('imaging', item, e.target.value)}/>
                          </div>
                          </>})}
                        
                      
                  </div>
                  <hr style={{marginTop: '20px'}}></hr>
              </>}
            

              <div className='btn-filled' onClick={handleSubmitDosage}>Submit</div>

          </div>

      </Popup>

      
   </div>
   <Loader active={isLoading} />
   </div>
  );
};

export default Orders;
