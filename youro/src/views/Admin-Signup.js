
import "../styles/AdminSignup.css"
import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from 'react-router-dom';
import { USER_TYPES } from "../App";
import PrivacyPolicy from "./PrivacyPolicies";

const AdminSignup= () =>
{
  
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
   const navigate=useNavigate();

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
           <div class="Admin-container">
             <h1>youro</h1>
             <p className="h3">Membership/Sign-up gives you direct access to our team of<br/> urological providers with same or next day appointments.  </p>
               <div className="Form-admin-Container">
                     <div className="admin-fields">
                          <div className="admin-input">
                               <label>First Name</label>
                               <input className="input-field-admin input-border" type="text" {...register("firstName", {
                                  required: true,
                                  maxLength: 32,
                                })} />
                                {errors?.firstName?.type === "required" && <p className="error-text">This field is required</p>}
                                {errors?.firstName?.type === "maxLength" && <p className="error-text">First name cannot exceed 32 characters</p>}
                          </div>

    		     <div className="admin-input">
                         <label>Last Name</label>
                        <input className="input-field-admin input-border" type="text" {...register("lastName", {
                                  required: true,
                                  maxLength: 32,
                                })}/>
                                {errors?.lastName?.type === "required" && <p className="error-text">This field is required</p>}
                                {errors?.lastName?.type === "maxLength" && <p className="error-text">Last Name cannot exceed 32 characters</p>}
                     </div>
                </div>

                    <div className="admin-fields">
                        <div className="admin-input">
                         <label>Email</label>
                        <input className="input-field-admin input-border" type="text" {...register("email", {
                                  required: true,
                                  maxLength: 32,
                                })}/>
                                {errors?.email?.type === "required" && <p className="error-text">This field is required</p>}
                                {errors?.email?.type === "maxLength" && <p className="error-text">Last Name cannot exceed 32 characters</p>}
                     </div>
                      <div className="admin-input">
                         <label>Phone Number</label>
                        <input className="input-field-admin input-border" type="text" {...register("phoneNumber", {
                                  required: true,
                                  maxLength: 32,
                                })}/>
                                {errors?.phoneNumber?.type === "required" && <p className="error-text">This field is required</p>}
                                {errors?.phoneNumber?.type === "maxLength" && <p className="error-text">Last Name cannot exceed 32 characters</p>}
                     </div>
                    </div>

                   <div className="admin-fields">
                    <div className="admin-input">
                     <label >Create Password</label>
                       <input className="input-field-admin input-border" type="password" {...register("password", {
                                  required: true,
                                  maxLength: 32,
                                  minLength: 8
                                })} ></input>
                        {errors?.password?.type === "required" && <p className="error-text">This field is required</p>}
                        {errors?.password?.type === "maxLength" && <p className="error-text">Password cannot exceed 32 characters</p>}
                        {errors?.password?.type === "minLength" && <p className="error-text">Password length must be more than 8 characters</p>}
	            </div>
                    <div className="admin-input">
                     <label >Re-type Password</label>
                   <input className="input-field-admin input-border" type="password" {...register("confirmPassword", {
                                  validate: val => watch('password') === val
                                })}  ></input>
                    {errors?.confirmPassword && <p className="error-text">Passwords must match</p>}
                   </div>
                   </div> 

                   <div className="required-fields" style={{justifyContent: 'flex-start'}}>
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
         {step === 1 && <PrivacyPolicy data={data} uType={USER_TYPES.admin} />}
        </div>
    )
}

export default AdminSignup;
