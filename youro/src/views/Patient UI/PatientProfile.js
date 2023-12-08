import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { API_DETAILS, COOKIE_KEYS } from "../../App";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Youroheader from "../Youro-header";
import { ToastContainer, toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';
import Loader from "../../utils/loader";



const PatientProfile = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove(COOKIE_KEYS.userId);
    Cookies.remove(COOKIE_KEYS.token);
    Cookies.remove(COOKIE_KEYS.userType);
    navigate('/');
  }

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [insurance,setInsurance]= useState("yes");
  const [viewVal, setViewVal] = useState(0);

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


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm();


  useEffect(() => {
    console.log("Patient profile : landing");
    fetchProfileData();
    get_profile_pic();
  }, []);


  const doctor_id = Cookies.get(COOKIE_KEYS.userId);

  console.log("doctor details", doctor_id);


  const showdata = (data) => {
    console.log("TEST log");
    console.log(data);
    updateProfileData(data);
    // api call here
    //setImagePreview
  }



  const [imagePreview, setImagePreview] = useState(null);
  const [toggle_image, setToggle_image] = useState(false);
  const [activeLoader, setActiveLoader] = useState(false);


  const toggle_profile_image = () => {
    setToggle_image(!toggle_image);
  }

  // console.log("image preview length",imagePreview);

  const get_profile_pic = async () => {
    const doctor_id_1 = Cookies.get(COOKIE_KEYS.userId);
    console.log("came to profile pic method");
    const get_url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/getDp/${doctor_id_1}`;

    setActiveLoader(true)
    try {
      const response = await axios.get(get_url,{responseType: 'arraybuffer'});

      if (response.status === 200) {
        console.log("came profile pic",response);
      //  console.log(response.d)
        const arrayBuffer = new Uint8Array(response.data);
        console.log("array",arrayBuffer);
        if(arrayBuffer.length!=0)
        {
        const base64Image = btoa(
          new Uint8Array(arrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
      //    const base64Image = btoa(
      //   String.fromCharCode.apply(null, arrayBuffer)
      // );
         const contentType = response.headers['content-type'];
        setImagePreview(`data:${contentType};base64,${base64Image}`);
        // window.location.reload();
        // setImagePreview(`data:image/jpeg;base64,${base64Image}`);
        }
      }
      setActiveLoader(false)
    }

    catch (err) {
      console.log("getting get_api error pic ");
      console.error(err);
      setActiveLoader(false)
    }
  }


  const handleImageChange = async (e) => {

    const doctor_id_2 = Cookies.get(COOKIE_KEYS.userId);

    const file = e.target.files[0];
    if (file) {

      const options = {
        maxSizeMB: 5,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      }
      const compressedFile = await imageCompression(file, options);
      // Set the file value in the form data
      setValue('image', compressedFile);
      // const url=`http://52.14.33.154:9093/youro/api/v1/uploadDp`
      // const profile_pic= await 
      // // Create a preview URL for the selected image
      // const previewURL = URL.createObjectURL(file);

      console.log("doctor id in handle image change ", doctor_id_2);
      // let profile_pic = {
      //       "imageFile": file,
      //       "userId": doctor_id
      // }
      // const formData = {};
      // formData.append('userId', 2);
      // formData.append('imageFile', compressedFile);
       const requestData = {
             'userId': doctor_id_2, // Assuming 'userId' should be a string
             'image': compressedFile,
          };
      const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/uploadDp`;
      console.log("profile pic dp", file);
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
          // 'responseType': 'arraybuffer'
              // 'Access-Control-Allow-Origin': '*',
              // 'Access-Control-Allow-Methods': '*',
              // 'Content-Type': 'application/json',
        }
      };
      try {
        const res = await axios.post(url,requestData, config);
        console.log("uploading pic ",res);
        console.log(res.data);
        console.log("going to profile pic method");
        get_profile_pic();
        // usrData = res.data;
      }
      catch (err) {
        console.log("uploading pic error ");
        console.error(err);
      }



    };
    // // print(previewURL,"this is the url created");
    // setImagePreview(previewURL);

  }


  const fetchProfileData = async () => {
    // after getting the data -> set defaultValues in html
    // const emailId = 'doc2@gmail.com';
    console.log("came to fetch profile method");
    const uId = Cookies.get(COOKIE_KEYS.userId);
    const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/getUser/${uId}`;
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.get(url, config);
      console.log(res.data);
      setValue("firstName", res.data.firstName);
      setValue("lastName", res.data.lastName);
      setValue("email", res.data.email);
      setValue("hasInsurance", res.data.hasInsurance? "yes":"no");
      setValue("address", res.data.address);
      setValue("city", res.data.city);
      setValue("state", res.data.state);
      setValue("zipCode", res.data.zipCode);
      setValue("dateOfBirth", res.data.dateOfBirth);
      setValue("password", res.data.password);
      setValue("newPassword", '');
      // get the hook form current state
      // setInsurance(res.data.hasInsurance ? "yes" : "no");
      // console.log("checking insurance",insurance);
      // const hasInsuranceValue = res.data.hasInsurance ? "yes" : "no";
      setInitEmail(res.data.email);
    //  console.log("")
    }
    catch (err) {
      console.error(err);
    }
  };

  const [initEmail, setInitEmail] = useState('');

  const updateProfileData = async (data) => {
    const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/provider/updateProfile`;
    console.log(data.newPassword == '');
    data.hasInsurance=(data.hasInsurance=="yes"?true:false);
    console.log(data.hasInsurance,"checking insurance");
    let temp = data;
    console.log("temp data",temp);
    if (temp.newPassword == '') {
      delete temp.password;
    }
    else {
      temp.password = temp.newPassword;
    }
    temp.userId = Cookies.get(COOKIE_KEYS.userId);
    delete temp.newPassword;
    console.log(temp);
    if (initEmail == temp.email) {
      delete temp.email;
      console.log("delete email attr from temp");
      console.log(temp);
    }
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.put(url, temp, config);
      console.log(res.data);
      console.log(temp.email);
      if (initEmail != temp.email) {
        if (res.data.email == initEmail) {
          setValue("email", initEmail);
          toast.success("Changes saved!!");
          // toast.error("Changes saved successfully except for the email!! Try Again with another email");
        }
        else {
          toast.success("Changes saved!!");
        }
      }
      else {
        toast.success("Update success!!");
      }
      // toast.success("Update success!!");
    }
    catch (err) {
      console.error(err);
    }
  };


  // const onsubmit = (data) =>
  // {
  //   // const allData = Object.assign(values, props.data)
  //   console.log("All data:",data);
  // }


  return (
    <div className='d-profile1' style={{display:'flex',width:'100%'}}>
      <Loader active={activeLoader}/>
      <div className='profile-side-bar'>
        {/* <DoctorSideBar data={'doctor-profile'} /> */}
      </div>
      <div className="d-container">
        <div className='profile-column'>
        <div style={{width:"100%",margin:"0% 2%"}}>
          <Youroheader setView={setViewVal} />
        </div>
          <div className='profile-details'>
            <div className='my-profile'>
              <ToastContainer />
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
                <label for='imgupload'>
                  <img src={imagePreview? imagePreview : 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1697800963~exp=1697801563~hmac=a964f83412aeedf85e035a4192fe19e1c7001f7ec339ba51104c9372481f77c9'} className="profile-pic" style={{marginBottom: '50px'}} alt="Preview" width="150" height="150" />
                </label>
                <>
                  <input
                    type="file"
                    id="imgupload"
                    accept=".jpg, .jpeg, .png"
                    {...register('image')}
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                  {errors.image && <p className="error-text">{errors.image.message}</p>}
                </>

                {/* {imagePreview && <img src={imagePreview} alt="Preview" width="150" height="150" />} */}

              </div>
            </div>
            <div className='p-col'>
              {/* <div className='p-fields'>  
            <h3>Edit Info</h3>
            </div> */}
              <div className='p-fields'>
                <label>First Name(Legal first name)</label>
                <input defaultValue={""} className='input-field' type='text'
                  {...register("firstName", {
                    required: true,
                    maxLength: 32,
                    // validate: {
                    //   checkRequired: (value) => value !== "" || "This field is required",
                    // },
                  })} />

                {errors?.firstName?.type === "required" && <p className="error-text">This field is required</p>}
                {errors?.firstName?.type === "maxLength" && <p className="error-text">First name cannot exceed 32 characters</p>}
              </div>
              <div className='p-fields'>
                <label>Last Name</label>
                <input defaultValue={""} className="input-field input-border" type="text" {...register("lastName", {
                  required: true,
                  maxLength: 32,
                  // validate: {
                  //   checkRequired: (value) => value !== "" || "This field is required",
                  // },
                })} />
                {errors?.lastName?.type === "required" && <p className="error-text">This field is required</p>}
                {errors?.lastName?.type === "maxLength" && <p className="error-text">Last Name cannot exceed 32 characters</p>}
              </div>
            </div>
            <div className='p-col'>
              <div className='p-fields'>
                <label>Email</label>
                <input defaultValue={""} className="input-field input-border" type="text" {...register("email", {
                  required: true,
                  maxLength: 32,
                  pattern: /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/,
                  // validate: {
                  //   checkRequired: (value) => value !== "" || "This field is required",
                  // },
                })} />
                {errors?.email?.type === "required" && <p className="error-text">This field is required</p>}
                {errors?.email?.type === "maxLength" && <p className="error-text">Email cannot exceed 32 characters</p>}
                {errors?.email?.type === "pattern" && <p className="error-text">Please enter valid email</p>}
              </div>
              <div className='p-fields'>
                <label>Has Insurance</label>
                {/* <input className='input-field' type='text'></input> */}  
                 <select  defaultValue={""} style={{ width: '85%' }} className="input-field input-border" id="hasInsurance" {...register("hasInsurance", {
                    required: true,
                  })}>
                    {/* <option value="">Select</option> */}
                    <option value="yes">yes</option>
                    <option value="no">no</option>
                  </select>
                  {errors?.hasInsurance && <p className="error-text">This field is required</p>}
                {/* <input defaultValue={""} className="input-field" type="text" {...register("hasInsurance", {
                  required: true,
                  maxLength: 32,
                  minLength: 8,
                  // validate: {
                  //   checkRequired: (value) => value !== "" || "This field is required",
                  // },
                })} ></input>
                {errors?.hasInsurance?.type === "required" && <p className="error-text">This field is required</p>}
                {errors?.hasInsurance?.type === "maxLength" && <p className="error-text">License number cannot exceed 32 characters</p>}
                {errors?.hasInsurance?.type === "minLength" && <p className="error-text">L.Number must be more than 8 characters</p>} */}
              </div>
            </div>
            <div className='p-col'>
              <div className='p-fields'>
                <label>Address</label>
                <input defaultValue={""} className="input-field input-border" type="text" {...register("address", {
                  required: true,
                  maxLength: 50,
                  // validate: {
                  //   checkRequired: (value) => value !== "" || "This field is required",
                  // },
                })} />
                {errors?.address?.type === "required" && <p className="error-text">This field is required</p>}
                {errors?.address?.type === "maxLength" && <p className="error-text">Address cannot exceed 40 characters</p>}
                {/* <input className='input-field' type='text'></input> */}
              </div>
              <div className='p-fields'>
                <label>City </label>
                <input defaultValue={""} className="input-field input-border" type="text" {...register("city", {
                  required: true,
                  maxLength: 32,
                  // validate: {
                  //   checkRequired: (value) => value !== "" || "This field is required",
                  // },
                })} />
                {errors?.city?.type === "required" && <p className="error-text">This field is required</p>}
                {errors?.city?.type === "maxLength" && <p className="error-text">Last Name cannot exceed 32 characters</p>}
              </div>
            </div>
            <div className='p-col'>
              <div className='p-fields'>
                <label>State</label>
                {/* <input className='input-field' type='text'></input> */}
                <input defaultValue={""} className="input-field input-border" type="text" {...register("state", {
                  required: true,
                  maxLength: 32,
                  // validate: {
                  //   checkRequired: (value) => value !== "" || "This field is required",
                  // },
                })} />
                {errors?.state?.type === "required" && <p className="error-text">This field is required</p>}
                {errors?.state?.type === "maxLength" && <p className="error-text">Email cannot exceed 32 characters</p>}
              </div>
              <div className='p-fields'>
                <label>Zipcode</label>
                <input defaultValue={""} className="input-field input-border" type="text" {...register("zipCode", {
                  required: true,
                  maxLength: 32,
                  // validate: {
                  //   checkRequired: (value) => value !== "" || "This field is required",
                  // },
                })} />
                {errors?.zipCode?.type === "required" && <p className="error-text">This field is required</p>}
                {errors?.zipCode?.type === "maxLength" && <p className="error-text">Email cannot exceed 32 characters</p>}
              </div>
            </div>

            
            <div className='p-col'>
              <div className='p-fields'>
                <label>Date of Birth</label>
                {/* <input className='input-field' type='text'></input> */}
                {/* <input type="date" className='input-field'
             max={new Date().toISOString().split('T')[0]} 
            /> */}
                <input type="date" className="input-field" {...register("dateOfBirth", {
                  required: "Date of Birth is required",
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future",
                  },
                  // validate: {
                  //   checkRequired: (value) => value !== "" || "This field is required",
                  // },
                })}
                  defaultValue={""} // Replace with your desired default value
                />
                {errors?.dateOfBirth?.type === "required" && (<p className="error-text">{errors?.dateOfBirth?.message}</p>
                )}
                {errors?.dateOfBirth?.type === "validate" && (<p className="error-text">{errors?.dateOfBirth?.message}</p>)}
              </div>
            </div>
            <div className='p-col'>
              <div className='p-fields'>
                <label>Set New Password</label>
                <input defaultValue={""} className="password-input" type="password" {...register("newPassword", {
                  required: false,
                  maxLength: 32,
                  minLength: 8,
                  // validate: {
                  //   checkRequired: (value) => value !== "" || "This field is required",
                  // },
                })} ></input>
                {/* {errors?.password?.type === "required" && <p className="error-text">This field is required</p>} */}
                {errors?.newPassword?.type === "maxLength" && <p className="error-text">Password cannot exceed 32 characters</p>}
                {errors?.newPassword?.type === "minLength" && <p className="error-text">Password length must be more than 8 characters</p>}
              </div>
            </div>

            {/* {handleSubmit((onsubmit))} */}
            <div className='p-buttons-col'>
              <button className='btn-filled' onClick={handleSubmit(showdata)}>Update</button>

              {/* <div style={{ marginLeft: '0px', color: 'var(--error-color)', display: 'flex', alignItems: 'center' }} onClick={handleLogout}>
                <span class="material-symbols-outlined" style={{ marginRight: '15px' }}>
                  logout
                </span>
                Logout
              </div> */}
              {/* <button className='cancel-button'>Cancel</button> */}
            </div>

            {isPopupVisible && (
              <div className="popup-container">
                <div className="popup-background"></div>
                <div className="popup-content-local">
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

export default PatientProfile;
