
import "../styles/Signup-For-Myself.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Patientaddress from "./PatientAddress";
import PrivacyPolicy from "./PrivacyPolicies";
import { USER_TYPES } from "../App";
import { subscriptionStatus } from "../App";
const SignupforMyself = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [step, setStep] = useState(0)
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const onsubmit = (data) => {
    console.log(data);
    // navigate("/patientaddress",{state:data})
    setStep(1)
    setData(data)
  }

  const step2Data = (values) => {
    setStep(2)
    setData(values)
  }


  document.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      console.log('Enter key pressed');
      handleSubmit(onsubmit)();
    }
  });
  return (
    <div>
      {
        step === 0 && <>
          <div class="SignupMyself-container">
            <h1>youro</h1>
            <p className="h3">Membership/Sign-up gives you direct access to our team of<br /> urological providers with same or next day appointments.  </p>
            <div className="Form-myself-Container">
              <div className="required-fields">
                <div className="myself-input">
                  <label>First Name *</label>
                  <input className="input-field input-border" type="text" {...register("firstName", {
                    required: true,
                    maxLength: 32,
                  })} />
                  {errors?.firstName?.type === "required" && <p className="error-text">This field is required</p>}
                  {errors?.firstName?.type === "maxLength" && <p className="error-text">First name cannot exceed 32 characters</p>}
                </div>

                <div className="myself-input">
                  <label>Last Name *</label>
                  <input className="input-field input-border" type="text" {...register("lastName", {
                    required: true,
                    maxLength: 32,
                  })} />
                  {errors?.lastName?.type === "required" && <p className="error-text">This field is required</p>}
                  {errors?.lastName?.type === "maxLength" && <p className="error-text">Last Name cannot exceed 32 characters</p>}
                </div>
              </div>

              <div className="required-fields">
                <div className="myself-input">
                  <label>Email *</label>
                  <input className="input-field1 input-border" type="text" {...register("email", {
                    required: true,
                    maxLength: 32,
                    pattern: /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/
                  })} />
                  {errors?.email?.type === "required" && <p className="error-text">This field is required</p>}
                  {errors?.email?.type === "maxLength" && <p className="error-text">Email cannot exceed 32 characters</p>}
                  {errors?.email?.type === "pattern" && <p className="error-text">Please enter valid email</p>}
                </div>
              </div>

              <div className="required-fields">
                <div className="myself-input">
                  <label >Create Password *</label>
                  <input className="input-field input-border" type="password" {...register("password", {
                    required: true,
                    maxLength: 32,
                    minLength: 8
                  })} ></input>
                  {errors?.password?.type === "required" && <p className="error-text">This field is required</p>}
                  {errors?.password?.type === "maxLength" && <p className="error-text">Password cannot exceed 32 characters</p>}
                  {errors?.password?.type === "minLength" && <p className="error-text">Password length must be more than 8 characters</p>}
                </div>
                <div className="myself-input">
                  <label >Re-type Password *</label>
                  {/* <input className="input-field input-border" type="password" {...register("confirmPassword", {
                    validate: val => watch('password') === val
                  })}  ></input> */}
                  <input
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleSubmit(onsubmit)();
                      }
                    }} className="input-field input-border" type="password" {...register("confirmPassword", {
                      validate: val => watch('password') === val
                    })}  ></input>

                  {errors?.confirmPassword && <p className="error-text">Passwords must match</p>}
                </div>
              </div>

              <div className="required-fields" style={{ justifyContent: 'flex-start' }}>
                <div className="myself-label" style={{ width: "48%" }}>
                  <p>Already youro member? <span onClick={() => navigate('/login')} className="color-secondary" style={{ cursor: 'pointer' }}><u>Login</u></span> </p>
                </div>
                <div className="myself-label" style={{ width: "45%", position: "relative" }}>
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

      {step === 1 && <Patientaddress data={data} step2Data={step2Data} />}
      {step === 2 && <PrivacyPolicy data={data} uType={USER_TYPES.user} subscription={subscriptionStatus.active} />}

    </div>
  )
}

export default SignupforMyself;
