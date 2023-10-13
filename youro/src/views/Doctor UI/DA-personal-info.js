import {React, useState ,useEffect} from 'react';
import "../../styles/Doctor-ui/Doctor-appointment/Personalinfo.css";

const PersonalInfo =()=>
{
   return(
    <div>
    <div className='p-data-row-p' >
       <div className='p-data-row-p1'>
          <div className='p-data-col-p'>
          <h3> Personal Details</h3>
          <label className='label-info'>First Name:{'Steven'}</label>
          <label className='label-info'>Last Name:{'Fleming'} </label>
          <label className='label-info'>Email:{'steve@gmail.com'}</label> 
          <label className='label-info'>Date of birth:{'12/08/1988'}</label>
          <label className='label-info'>Has Insurance:{'yes'}</label> 
          </div>
         </div>
        <div className='p-data-row-p1'>
        <div className='p-data-col-p'>
          <h3> Contact Details</h3>
          <label className='label-info'>Address:{'englewood avenue'}</label>
          <label className='label-info'>City:{'NYC'}</label>
          <label className='label-info'>State:{'NY'}</label>
          <label className='label-info'>Zip Code:{'14214'}</label> 
          <label className='label-info'>gender:{'male'}</label>
      </div>
      </div>
      </div>
     </div>
   );
}

export default PersonalInfo;