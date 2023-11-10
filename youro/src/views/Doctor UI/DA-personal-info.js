import {React, useState ,useEffect} from 'react';
import "../../styles/Doctor-ui/Doctor-appointment/Personalinfo.css";

const PersonalInfo =({data})=>
{
   console.log(data);
   return(
    <div>
    <div className='p-data-row-p' >
       <div className='p-data-row-p1'>
          <div className='p-data-col-p'>
          <h3> Personal Details</h3>
          <label className='label-info'>First Name: {data.firstName}</label>
          <label className='label-info'>Last Name: {data.lastName} </label>
          <label className='label-info'>Email: {data.email}</label> 
          <label className='label-info'>Date of birth: {data.dateOfBirth}</label>
          <label className='label-info'>Has Insurance: {data.hasInsurance ? 'Yes' : 'No'}</label> 
          </div>
         </div>
        <div className='p-data-row-p1'>
        <div className='p-data-col-p'>
          <h3> Contact Details</h3>
          <label className='label-info'>Address: {data.address}</label>
          <label className='label-info'>City: {data.city}</label>
          <label className='label-info'>State: {data.state}</label>
          <label className='label-info'>Zip Code: {data.zipCode}</label> 
          <label className='label-info'>gender: {data.gender}</label>
      </div>
      </div>
      </div>
     </div>
   );
}

export default PersonalInfo;