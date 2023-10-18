import React, { useState } from "react";
import "../styles/Signup-For-FamilyMember.css";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Patientaddress from "./PatientAddress";
import PrivacyPolicy from "./PrivacyPolicies";
import { subscriptionStatus, USER_TYPES } from "../App";

const SignupforFamilyMember = () => {


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [step, setStep] = useState(0)
  const [data, setData] = useState({});
  const onsubmit = (data) => {
    console.log(data);
    setStep(1)
    setData(data)
  }

  const step2Data = (values) => {
    setStep(2)
    setData(values)
  }


  return (
    <div>
      {
        step === 0 && <>

          <div class="Signupfamilymember-container">

            <h1>youro</h1>
            <p className="h3">Membership/Sign-up gives you direct access to our team of<br /> urological providers with same or next day appointments.  </p>
            <div className="Form-Container">
              <div className="name-fields">
                <div className="label-input">
                  <label>Family Member First Name</label>
                  <input className="input-field input-border" type="text" {...register("firstName", {
                    required: true,
                    maxLength: 32,
                  })} />
                  {errors?.firstName?.type === "required" && <p className="error-text">This field is required</p>}
                  {errors?.firstName?.type === "maxLength" && <p className="error-text">First name cannot exceed 32 characters</p>}
                </div>

                <div className="label-input">
                  <label>Family Member Last Name</label>
                  <input className="input-field input-border" type="text" {...register("lastName", {
                    required: true,
                    maxLength: 32,
                  })} />
                  {errors?.lastName?.type === "required" && <p className="error-text">This field is required</p>}
                  {errors?.lastName?.type === "maxLength" && <p className="error-text">Last Name cannot exceed 32 characters</p>}
                </div>
              </div>

              <div className="name-fields">
                <div className="label-input">
                  <label>Email (Family Member)</label>
                  <input className="input-field input-border" type="text" {...register("email", {
                    required: true,
                    maxLength: 32,
                    pattern: /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/
                  })} />
                  {errors?.email?.type === "required" && <p className="error-text">This field is required</p>}
                  {errors?.email?.type === "maxLength" && <p className="error-text">Email cannot exceed 32 characters</p>}
                  {errors?.email?.type === "pattern" && <p className="error-text">Please enter valid email</p>}
                </div>

                <div className="label-input">
                  <label>Do you have medical Insurance?</label>
                  <select style={{ width: '85%' }} className="input-field input-border" id="hasInsurance" {...register("hasInsurance", {
                    required: true,
                  })}>
                    <option value="">Select</option>
                    <option value="yes">yes</option>
                    <option value="no">no</option>
                  </select>
                  {errors?.hasInsurance && <p className="error-text">This field is required</p>}
                </div>
              </div>

              <div className="name-fields">
                <div className="label-input">
                  <label>How are you related to family Member?</label>
                  <select style={{ width: '85%' }} className="input-field input-border" id="relation" {...register("relation", {
                    required: true,
                  })}>
                    <option value="">Select</option>
                    <option value="son">Son</option>
                    <option value="daughter">Daughter</option>
                    <option value="Neice">Neice</option>
                  </select>
                  {errors?.relation && <p className="error-text">This field is required</p>}
                </div>

                <div className="label-input">
                  <label>Email (email of the member who is registering on behalf of family member)</label><br />
                  <input className="input-field input-border" type="text" {...register("relatedEmail", {
                    required: true,
                    maxLength: 32,
                    pattern: /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/
                  })} />
                  {errors?.relatedEmail?.type === "required" && <p className="error-text">This field is required</p>}
                  {errors?.relatedEmail?.type === "maxLength" && <p className="error-text">Email cannot exceed 32 characters</p>}
                  {errors?.relatedEmail?.type === "pattern" && <p className="error-text">Please enter valid email</p>}
                </div>
              </div>

              <div className="name-fields">
                <div className="label-input">
                  <label >Create Password</label>
                  <input className="input-field input-border" type="password" {...register("password", {
                    required: true,
                    maxLength: 32,
                    minLength: 8
                  })} ></input>
                  {errors?.password?.type === "required" && <p className="error-text">This field is required</p>}
                  {errors?.password?.type === "maxLength" && <p className="error-text">Password cannot exceed 32 characters</p>}
                  {errors?.password?.type === "minLength" && <p className="error-text">Password length must be more than 8 characters</p>}
                </div>
                <div className="label-input">
                  <label >Re-type Password</label>
                  <input className="input-field input-border" type="password" {...register("confirmPassword", {
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
            </div>
          </div>

        </>
      }

      {step === 1 && <Patientaddress data={data} step2Data={step2Data} />}
      {step === 2 && <PrivacyPolicy data={data} uType={USER_TYPES.user} subscription={subscriptionStatus.active}/>}

    </div>
  )
}

export default SignupforFamilyMember;
