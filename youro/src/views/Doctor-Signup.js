
import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import "../styles/DoctorSignup.css"
import { USER_TYPES } from "../App";
import PrivacyPolicy from "./PrivacyPolicies";
const DoctorSignup= () =>
{

  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
   
  const onsubmit = (data) =>
  {
    setStep(1)
    setData(data)
    console.log("All data:",data);
  }

   return (
          <div>
          {
            step === 0 && <>
           <div class="DoctorSignup-container">
             <h1>youro</h1>
             <p className="h3">Membership/Sign-up gives you direct access to our team of<br/> urological providers with same or next day appointments.  </p>
               <div className="Form-Doctorsignup">
                     <div className="doctor-fields">
                          <div className="doctor-input">
                               <label>First Name</label>
                               <input className="input-field-doctor input-border" type="text" {...register("firstName", {
                                  required: true,
                                  maxLength: 32,
                                })} />
                                {errors?.firstName?.type === "required" && <p className="error-text">This field is required</p>}
                                {errors?.firstName?.type === "maxLength" && <p className="error-text">First name cannot exceed 32 characters</p>}
                          </div>

    		     <div className="doctor-input">
                         <label>Last Name</label>
                        <input className="input-field-doctor input-border" type="text" {...register("lastName", {
                                  required: true,
                                  maxLength: 32,
                                })}/>
                                {errors?.lastName?.type === "required" && <p className="error-text">This field is required</p>}
                                {errors?.lastName?.type === "maxLength" && <p className="error-text">Last Name cannot exceed 32 characters</p>}
                     </div>
                </div>

                    <div className="doctor-fields">
                       <div className="doctor-input">
                        <label>Email</label>
                        <input className="input-field-doctor input-border" type="text" {...register("email", {
                                  required: true,
                                  maxLength: 32,
                                  pattern: /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/
                                })} />
                                {errors?.email?.type === "required" && <p className="error-text">This field is required</p>}
                                {errors?.email?.type === "maxLength" && <p className="error-text">Email cannot exceed 32 characters</p>}
                                {errors?.email?.type === "pattern" && <p className="error-text">Please enter valid email</p>}
                    </div>

                   <div className="doctor-input">
                        <label>Phone Number</label>
                        <input className="input-field-doctor input-border" type="text" {...register("phoneNumber", {
                                  required: true,
                                  maxLength: 10,
                                })}/>
                                {errors?.phoneNumber?.type === "required" && <p className="error-text">This field is required</p>}
                                {errors?.phoneNumber?.type === "maxLength" && <p className="error-text">Last Name cannot exceed 10 characters</p>}
                               
                   </div>
                   </div>

                  <div className="doctor-fields">
                  <div className="doctor-input">
                        <label>License Number</label>
                         <input className="input-field-doctor input-border" type="text" {...register("license", {
                                  required: true,
                                  maxLength: 32,
                                })}/>
                                {errors?.license?.type === "required" && <p className="error-text">This field is required</p>}
                                {errors?.license?.type === "maxLength" && <p className="error-text">Last Name cannot exceed 32 characters</p>}
              
                   </div> 

                     <div className="doctor-input">
                        <label>Address </label>
                         <input className="input-field-doctor input-border" type="text" {...register("address", {
                                  required: true,
                                  maxLength: 32,
                                })}/>
                                {errors?.address?.type === "required" && <p className="error-text">This field is required</p>}
                                {errors?.address?.type === "maxLength" && <p className="error-text">Address cannot exceed 32 characters</p>}
                  
                   </div>  
                     
                  </div>

                   <div className="doctor-fields">
                  <div className="doctor-input">
                        <label>City</label>
                         <input className="input-field-doctor input-border" type="text" {...register("city", {
                                  required: true,
                                  maxLength: 32,
                                })}/>
                                {errors?.city?.type === "required" && <p className="error-text">This field is required</p>}
                                {errors?.city?.type === "maxLength" && <p className="error-text">Last Name cannot exceed 32 characters</p>}
                   </div> 

                     <div className="doctor-input">
                        <label>State </label>
                         <input className="input-field-doctor input-border" type="text" {...register("state", {
                                  required: true,
                                  maxLength: 32,
                                })}/>
                                {errors?.state?.type === "required" && <p className="error-text">This field is required</p>}
                                {errors?.state?.type === "maxLength" && <p className="error-text">Last Name cannot exceed 32 characters</p>}
                   </div>  
                     
                  </div>

                  <div className="doctor-fields">
                  <div className="doctor-input">
                        <label>Zipcode</label>
                         <input className="input-field-doctor input-border" type="text" {...register("zipCode", {
                                  required: true,
                                  maxLength: 32,
                                })}/>
                                {errors?.zipCode?.type === "required" && <p className="error-text">This field is required</p>}
                                {errors?.zipCode?.type === "maxLength" && <p className="error-text">Last Name cannot exceed 32 characters</p>}
                   </div> 

                     <div className="doctor-input">
                        <label>Date of Birth</label>
                         <input placeholder="MM/DD/YYYY" className="input-field-doctor input-border" type="date" {...register("dateOfBirth", {
                                  required: true,
                                  maxLength: 32,
                                })}/>
                                {errors?.dateOfBirth?.type === "required" && <p className="error-text">This field is required</p>}
                                {errors?.dateOfBirth?.type === "maxLength" && <p className="error-text">Date Of Birth cannot exceed 32 characters</p>}
                   </div>  
                     
                  </div> 

                   <div className="doctor-fields">
                  <div className="doctor-input">
                        <label>Gender</label>
                          <select style={{width: '108%'}} className="input-field input-border" id="gender" {...register("gender", {
                                  required: true,
                                })}>
                          <option value="">Select</option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </select>
                        {errors?.gender && <p className="error-text">This field is required</p>}
                   </div> 
                   </div>
                   <div className="doctor-fields">
                    <div className="doctor-input">
                     <label >Create Password</label>
                       <input className="input-field-doctor input-border" type="password" {...register("password", {
                                  required: true,
                                  maxLength: 32,
                                  minLength: 8
                                })} ></input>
                        {errors?.password?.type === "required" && <p className="error-text">This field is required</p>}
                        {errors?.password?.type === "maxLength" && <p className="error-text">Password cannot exceed 32 characters</p>}
                        {errors?.password?.type === "minLength" && <p className="error-text">Password length must be more than 8 characters</p>}
	            </div>
                    <div className="doctor-input">
                     <label >Re-type Password</label>
                   <input className="input-field-doctor input-border" type="password" {...register("confirmPassword", {
                                  validate: val => watch('password') === val
                                })}  ></input>
                    {errors?.confirmPassword && <p className="error-text">Passwords must match</p>}
                   </div>
                   </div> 

                   <div className="required-fields" style={{justifyContent: 'space-between'}}>
                    <div className="myself-label" style={{width: "48%"}}>
                     <p>Already youro member? <span onClick={() => navigate('/login')} className="color-secondary" style={{cursor: 'pointer'}}><u>Login</u></span> </p>
	            </div>
                    <div className="myself-label" style={{width: "45%", position: "relative"}}>
                        <div className="next-button btn-filled" onClick={handleSubmit((onsubmit))}>Next</div>
                        
                    </div>
                </div>
                
               
                {/* <div className="bottom-fields">
                   <p>Already youro member? <span>Login</span></p>      
		</div>
                
		 <div className="button-container">
                   <button className="next-button">Next</button>
                </div> */}
    
        </div>
        </div>
       </>
         }
        {step === 1 && <PrivacyPolicy data={data} uType={USER_TYPES.doctor} />}
      
       </div>
    )
}

export default DoctorSignup;

















































































































































































































































































































// import React,{useState} from "react";
// import "../styles/Signup-For-FamilyMember.css"
// const DoctorSignup= () =>
// {

//   const [firstname, setfirstname] = useState('');
//   const [lastname, setlastname] = useState('');
//   const [email, setEmail] = useState('');
//   const [createpassword, setpassword] = useState('');
//   const [retypepassword, setretypepassword] = useState('');
//   const [licensenumber, setlicensenumber] = useState('');
//   const [addressline1, setaddressline1] = useState('');
//   const [city, setcity] = useState('');  
//   // Function to handle input changes and update the state
//   const handleFirstNameChange = (event) => {
//     setfirstname(event.target.value);
//   };
  
//    const handleLastNameChange = (event) => {
//     setlastname(event.target.value);
//   };

//    const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };


//  const handlePasswordChange = (event) => {
//     setpassword(event.target.value);
//   };

//  const handleRetypePasswordChange = (event) => {
//     setretypepassword(event.target.value);
//   };

// const handleMedicalInsurance = (event) => {
//    setlicensenumber(event.target.value);
//   };

// const handleRelationtoFamilyMember =(event) => {
//    setaddressline1(event.target.value);
// }

// const handleRelationEmail = (event) => {
//    setcity(event.target.value);
// }
   
//    return (
//            <div class="doctorsignup-container">
//              <h1>youro</h1>
//              <h4>Membership/Sign-up gives you direct access to our team of<br/> urological providers with same or next day appointments.  </h4>
//                <div className="Form-Container">
//                      <div className="name-fields">
//                           <div className="label-input">
//                                <label>First Name</label>
//                                <input className="input-field" type="text" value={firstname} onChange={handleFirstNameChange} />
//                           </div>

//     		     <div className="label-input">
//                          <label>Last Name</label>
//                         <input className="input-field" type="text" value={lastname} onChange={handleLastNameChange} />
//                      </div>
//                 </div>

//                     <div className="name-fields">
//                        <div className="label-input">
//                         <label>Email </label>
//                         <input className="input-field" type="text" value={email} onChange={handleEmailChange}/>
//                     </div>

//                    <div className="label-input">
//                         <label>Phone Number</label>
//                         <input className="input-field" type="text" value={licensenumber} onChange={handleMedicalInsurance}/>
//                    </div>
//                    </div>

//                   <div className="name-fields">
//                     <div className="label-input">
//                        <label>License Number</label>
//                         <input className="input-field" type="text" value={addressline1} onChange={handleRelationtoFamilyMember}/>
//                     </div>

//                      <div className="label-input">
//                        <label>Clinic Address Line 1</label>
//                         <input className="input-field" type="text" value={city} onChange={handleRelationEmail}/>
//                     </div> 
//                   </div>

//                   <div className="name-fields">
//                     <div className="label-input">
//                        <label>City</label>
//                         <input className="input-field" type="text" value={addressline1} onChange={handleRelationtoFamilyMember}/>
//                     </div>

//                      <div className="label-input">
//                        <label>Zipcode</label>
//                         <input className="input-field" type="text" value={city} onChange={handleRelationEmail}/>
//                     </div> 
//                   </div> 

//                    <div className="name-fields">
//                     <div className="label-input">
//                      <label >Create Password</label>
//                        <input className="input-field" type="text" value={createpassword} onChange={handlePasswordChange} ></input>
// 	                  </div>
//                     <div className="label-input">
//                      <label >Re-type Password</label>
//                    <input className="input-field" type="password" value={retypepassword} onChange={handleRetypePasswordChange} ></input>
//                    </div>
//                    </div> 

                    
//                     <div class="container">
//                        <p>This is some content in the container.</p>
//                         <button class="next-button">Next</button>
//                     </div>

//                      <div className="login-label">
//                      <p>Already youro member? Login </p>
// 	                  </div>
//         </div>
//         </div>
//     )
// }

// export default DoctorSignup;
