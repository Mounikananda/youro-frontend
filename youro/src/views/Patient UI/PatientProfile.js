import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { COOKIE_KEYS } from "../../App";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Youroheader from "../Youro-header";
import { ToastContainer, toast } from 'react-toastify';

const PatientProfile = () => {

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();


  const [initEmail, setInitEmail] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    const uID = Cookies.get(COOKIE_KEYS.userId);
    const url = `http://localhost:9092/youro/api/v1/getUser/${uID}`;
    try {
      const res = await axios.get(url);
      console.log(res.data);
      setValue("firstName", res.data.firstName);
      setValue("lastName", res.data.lastName);
      setValue("email", res.data.email);
      setInitEmail(res.data.email);
      // setValue("license", res.data.license);
      // setValue("address", res.data.address);
      // setValue("city", res.data.city);
      // setValue("state", res.data.state);
      // setValue("zipCode", res.data.zipCode);
      // setValue("dateOfBirth", res.data.dateOfBirth);
      // setValue("password", res.data.password);
      // setValue("newPassword", '');
    }
    catch (err) {
      console.error(err);
    }
  }

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


  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove(COOKIE_KEYS.userId);
    Cookies.remove(COOKIE_KEYS.token);
    Cookies.remove(COOKIE_KEYS.userType);
    navigate('/');
  }

  const showdata = (data) => {
    console.log("TEST log");
    console.log(data);
    updateProfileData(data);
    // api call here
    //setImagePreview
  }


  const updateProfileData = async (data) => {
    const url = `http://localhost:9092/youro/api/v1/provider/updateProfile`;
    let temp = data;
    temp.newPassword == '' ? delete temp.password : temp.password = temp.newPassword;
    delete temp.newPassword;
    temp.userId = Cookies.get(COOKIE_KEYS.userId);
    console.log(temp);
    try {
      if(initEmail == temp.email){
        delete temp.email;
        console.log("delete email attr from temp");
        console.log(temp);
      }
      const res = await axios.put(url, temp);
      console.log(res.data);
      if (initEmail != temp.email) {
        if (res.data.email == initEmail) {
          setValue("email", initEmail);
          toast.error("Changes saved successfully except for the email!! Try Again with another email");
        }
        else{
          toast.success("Changes saved!!");
        }
      }
      else {
        toast.success("Update success!!");
      }
    }
    catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div style={{ marginTop: '10px', marginLeft: '50px', width: '100%' }}>
        <Youroheader/>
      <ToastContainer />
        <h1>Profile Information</h1>
        <div>

          <div className="Form-myself-Container" style={{ width: '50%', margin: '50px auto' }}>

            <div>
              <>
                <label for='imgupload'>
                  <img src={imagePreview ? imagePreview : 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1697800963~exp=1697801563~hmac=a964f83412aeedf85e035a4192fe19e1c7001f7ec339ba51104c9372481f77c9'} className="profile-pic" alt="Preview" width="150" height="150" />
                </label>
                <input
                  type="file"
                  id="imgupload"
                  accept=".jpg, .jpeg, .png"
                  {...register('image')}
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />

              </>

            </div>


            <div className="required-fields">
              <div className="myself-input">
                <label>First Name</label>
                <input className="input-field input-border" type="text" {...register("firstName", {
                  required: true,
                  maxLength: 32,
                  value: 'Sri Sai Charan'
                })} />
                {errors?.firstName?.type === "required" && <p className="error-text">This field is required</p>}
                {errors?.firstName?.type === "maxLength" && <p className="error-text">First name cannot exceed 32 characters</p>}
              </div>

              <div className="myself-input">
                <label>Last Name</label>
                <input className="input-field input-border" type="text" {...register("lastName", {
                  required: true,
                  maxLength: 32,
                  value: 'Kachavarapu'
                })} />
                {errors?.lastName?.type === "required" && <p className="error-text">This field is required</p>}
                {errors?.lastName?.type === "maxLength" && <p className="error-text">Last Name cannot exceed 32 characters</p>}
              </div>
            </div>

            <div className="required-fields">
              <div className="myself-input">
                <label>Email</label>
                <input className="input-field1 input-border" type="text" {...register("email", {
                  required: true,
                  maxLength: 32,
                  value: 'charan@gmail.com',
                  pattern: /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/
                })} />
                {errors?.email?.type === "required" && <p className="error-text">This field is required</p>}
                {errors?.email?.type === "maxLength" && <p className="error-text">Email cannot exceed 32 characters</p>}
                {errors?.email?.type === "pattern" && <p className="error-text">Please enter valid email</p>}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', width: '94%', marginTop: '50px', marginLeft: '0px', marginRight: 'auto' }}>

              {/* <div style={{ marginLeft: '0px', color: 'var(--error-color)', display: 'flex', alignItems: 'center' }} onClick={handleLogout}>
                <span class="material-symbols-outlined" style={{ marginRight: '15px' }}>
                  logout
                </span>
                Logout
              </div> */}


              {/* <div className="next-button btn-filled" onClick={handleSubmit((onsubmit))}>Update</div> */}
              <div className="next-button btn-filled" onClick={handleSubmit(showdata)}>Update</div>
            </div>




            {/* <div className="bottom-fields">
                   <p>Already youro member? <span>Login</span></p>      
		</div>
                
		 <div className="button-container">
                   <button className="next-button">Next</button>
                </div> */}
          </div>
        </div>



      </div>
    </>
  )
}

export default PatientProfile;