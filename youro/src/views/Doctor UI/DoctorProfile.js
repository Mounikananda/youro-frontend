import {React,useState} from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Hamburger from 'hamburger-react';
import { FaHome,FaCalendar,FaFacebookMessenger,FaPrescription,FaPowerOff,FaHamburger } from "react-icons/fa";
import { BrowserRouter, Link, Route, Routes,useNavigate  } from 'react-router-dom';
import "../../styles/Doctor-ui/Doctor-Profile.css";
import { FaPen } from "react-icons/fa";
import DoctorSideBar from './Doctor-Sidebar';
import { useForm } from "react-hook-form";
// import SideBar from '../Patient UI/SideBar';





const DoctorProfile=()=>
{
  
  const [isPopupVisible, setPopupVisible] = useState(false);
  

  const showPopup = (data) => {
    console.log(data);
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
  };

  const handleYes = () => {
    // Handle 'Yes' button action
    hidePopup();
  };

  const handleNo = () => {
    // Handle 'No' button action
    hidePopup();
  };
 
  
  const apiData = {
  image: new File([''], 'Screenshot 2023-09-28 at 6.19.28 PM.png', {
    type: 'image/png',
  }),
  firstName: 'vamshi',
  lastName: 'j',
  email: 'vamshivj12@gmail.com',
  licensenumber: '12345678',
  Address: '123456',
  City: 'vamshivj1208',
  dob: '2023-10-20',
  state: 'NY',
  zipcode: '14214',
  password: 'vamshivj1208',
};

   const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm();


  const showdata =(data) =>
  {
    console.log(data);
  }


   const [imagePreview, setImagePreview] = useState(null);

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Set the file value in the form data
      setValue('image', file);
      // Create a preview URL for the selected image
      const previewURL = URL.createObjectURL(file);
      // print(previewURL,"this is the url created");
      setImagePreview(previewURL);

    }
  };


  
  // const onsubmit = (data) =>
  // {
  //   // const allData = Object.assign(values, props.data)
  //   console.log("All data:",data);
  // }


   return (
      <div className='d-profile'>
       <div className='profile-side-bar'>
         <DoctorSideBar data={'doctor-profile'}/>
      </div>
      <div className="d-container">
        <div className='profile-column'>
        <h1>youro</h1>
        <div className='profile-details'>
          <div className='my-profile'>
            <h1>My Profile</h1>
            
              <div>
               {/* <img  src={'https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20210415093010/ri/673/picture/2021/4/shutterstock_1170639043.jpg'} alt="My Image" width="200" height="150" /> */}
                {/* {!imagePreview && <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  {...register('image', { required: true })}
                   onChange={handleImageChange}
                />
                {errors?.image?.type === "required" && <p className="error-text">This field is required</p>}
                } */}
                {!imagePreview && (
                   <>
                   <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    {...register('image', { required: 'Image is required' })}
                    onChange={handleImageChange}
                    />
                    {errors.image && <p className="error-text">{errors.image.message}</p>}
                    </>
                    )}
                 {imagePreview && <img src={imagePreview} alt="Preview" width="150" height="150" />}
              </div>
          </div>
          <div className='p-col'> 
            {/* <div className='p-fields'>  
            <h3>Edit Info</h3>
            </div> */}
            <div className='p-fields'>
            <label>First Name(Legal first name)</label>
            <input  defaultValue={apiData.firstName} className='input-field' type='text' 
              {...register("firstName", {
                    required: true,
                    maxLength: 32,
                  })} />
                  {errors?.firstName?.type === "required" && <p className="error-text">This field is required</p>}
                  {errors?.firstName?.type === "maxLength" && <p className="error-text">First name cannot exceed 32 characters</p>}
            </div>
            <div className='p-fields'>
            <label>Last Name</label>
             <input defaultValue={apiData.lastName} className="input-field input-border" type="text" {...register("lastName", {
                    required: true,
                    maxLength: 32,
                  })} />
                  {errors?.lastName?.type === "required" && <p className="error-text">This field is required</p>}
                  {errors?.lastName?.type === "maxLength" && <p className="error-text">Last Name cannot exceed 32 characters</p>}
           </div>
          </div>
          <div className='p-col'>
            <div className='p-fields'>
            <label>Email</label>
            <input defaultValue={apiData.email} className="input-field input-border" type="text" {...register("email", {
                    required: true,
                    maxLength: 32,
                    pattern: /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/
                  })} />
                  {errors?.email?.type === "required" && <p className="error-text">This field is required</p>}
                  {errors?.email?.type === "maxLength" && <p className="error-text">Email cannot exceed 32 characters</p>}
                  {errors?.email?.type === "pattern" && <p className="error-text">Please enter valid email</p>}
            </div> 
            <div className='p-fields'>
            <label>License Number</label>
            {/* <input className='input-field' type='text'></input> */}
             <input defaultValue={apiData.licensenumber} className="input-field" type="text" {...register("licensenumber", {
                    required: true,
                    maxLength: 32,
                    minLength: 8 
                  })} ></input>
                  {errors?.licensenumber?.type === "required" && <p className="error-text">This field is required</p>}
                  {errors?.licensenumber?.type === "maxLength" && <p className="error-text">License number cannot exceed 32 characters</p>}
                  {errors?.licensenumber?.type === "minLength" && <p className="error-text">L.Number must be more than 8 characters</p>}
            </div>
          </div>
          <div className='p-col'>
           <div className='p-fields'>
            <label>Address</label>
             <input defaultValue={apiData.Address} className="input-field input-border" type="text" {...register("Address", {
                                  required: true,
                                  maxLength: 50,
                                })} />
                                {errors?.Address?.type === "required" && <p className="error-text">This field is required</p>}
                                {errors?.Address?.type === "maxLength" && <p className="error-text">Address cannot exceed 40 characters</p>}
            {/* <input className='input-field' type='text'></input> */}
            </div>
            <div className='p-fields'>
            <label>City </label>
             <input defaultValue={apiData.City} className="input-field input-border" type="text" {...register("City", {
                                  required: true,
                                  maxLength: 32,
                                })}/>
                {errors?.City?.type === "required" && <p className="error-text">This field is required</p>}
                {errors?.City?.type === "maxLength" && <p className="error-text">Last Name cannot exceed 32 characters</p>}
            </div> 
          </div>
          <div className='p-col'>
           <div className='p-fields'>
           <label>State</label>
           {/* <input className='input-field' type='text'></input> */}
            <input defaultValue={apiData.state} className="input-field input-border" type="text" {...register("state", {
                                  required: true,
                                  maxLength: 32,
                                })} />
             {errors?.state?.type === "required" && <p className="error-text">This field is required</p>}
             {errors?.state?.type === "maxLength" && <p className="error-text">Email cannot exceed 32 characters</p>}
           </div>
           <div className='p-fields'>
            <label>Zipcode</label>
            <input defaultValue={apiData.zipcode} className="input-field input-border" type="text" {...register("zipcode", {
               required: true,
               maxLength: 32,
               })} />
            {errors?.zipcode?.type === "required" && <p className="error-text">This field is required</p>}
            {errors?.zipcode?.type === "maxLength" && <p className="error-text">Email cannot exceed 32 characters</p>}
          </div>
          </div>
          <div className='p-col'>
            <div className='p-fields'>
            <label>Date of Birth</label>
            {/* <input className='input-field' type='text'></input> */}
            {/* <input type="date" className='input-field'
             max={new Date().toISOString().split('T')[0]} 
            /> */}
             <input type="date" className="input-field" {...register("dob", { required: "Date of Birth is required",
               max: {
               value: new Date().toISOString().split("T")[0], 
              message: "Date of Birth cannot be in the future",
               },
               })}
               defaultValue={apiData.dob}// Replace with your desired default value
             />
             {errors?.dob?.type === "required" && ( <p className="error-text">{errors?.dob?.message}</p>
             )}
            {errors?.dob?.type === "validate" && ( <p className="error-text">{errors?.dob?.message}</p> )}
            </div>
          </div>
            <div className='p-col'>
            <div className='p-fields'>
           <label>Your Password</label>
             <input defaultValue={apiData.password} className="password-input" type="password" {...register("password", {
                    required: true,
                    maxLength: 32,
                    minLength: 8
                  })} ></input>
                  {errors?.password?.type === "required" && <p className="error-text">This field is required</p>}
                  {errors?.password?.type === "maxLength" && <p className="error-text">Password cannot exceed 32 characters</p>}
                  {errors?.password?.type === "minLength" && <p className="error-text">Password length must be more than 8 characters</p>}
            </div> 
          </div>
         
         {/* {handleSubmit((onsubmit))} */}
          <div className='p-buttons-col'>
           <button className='btn-filled' onClick={handleSubmit(showdata)}>Update</button>
           {/* <button className='cancel-button'>Cancel</button> */}
          </div>

      {isPopupVisible && (
        <div className="popup-container">
           <div className="popup-background"></div>
          <div className="popup-content">
            <p>Do you want to make changes to your profile?</p>
            <div className='popup-button'>
            <div>
            <button onClick={handleYes} className='btn-filled'>Yes</button></div>
            <div>
            <button onClick={handleNo} className='cancel-button'>No</button></div>
            </div>
          </div>
        </div>
      )}

        </div>
        </div> 
        </div>
     </div>
   );
}

export default DoctorProfile;
