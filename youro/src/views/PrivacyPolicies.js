import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

const PrivacyPolicy = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    let usrData = props.data;
    usrData['userType'] = props.uType;
    usrData['hasInsurance'] = 'true';
    console.log("usr data :: ");
    console.log(usrData);
    axios.post("http://localhost:9092/youro/api/v1/register", usrData).then((res) => {
        console.log("register success");
        toast.success("Registration success")
    }).catch((res) => {
        console.error(res.response.data.errorMessage)
        toast.error('Oops!! ' + res.response.data.errorMessage)
    });
  }

  return (
    <div className="PatientAddress-container">
      <ToastContainer />
     <h1> youro</h1>
     <div className="policy-container">
        <h2>Terms of Service, Privacy Policy and HIPAA Notice</h2>
        <p>I am atleast 18+ years of age and i have read and accept:</p>
        <div className="sub-policy-container">
            <div className="color-secondary" style={{textDecoration: 'underline'}}><a href="/policy" target="_blank">Privacy Policy</a></div>
            <div style={{alignItems: 'flex-end', display: 'flex', flexDirection: "column"}}>
              <input type="checkbox" style={{width: 'fit-content'}} {...register("privacy", {
                                  required: true,
                                })} />
              {errors.privacy && <p className="error-text">This field is required</p>}
            </div>
        </div>
        <div className="sub-policy-container">
            <div className="color-secondary" style={{textDecoration: 'underline'}}><a href="/telehealth-consent" target="_blank">Telehealth consent</a></div>
            <div>
            <div style={{alignItems: 'flex-end', display: 'flex', flexDirection: "column"}}>
              <input type="checkbox" style={{width: 'fit-content'}} {...register("telehealth", {
                                  required: true,
                                })} />
              {errors.telehealth && <p className="error-text">This field is required</p>}
            </div>
            </div>
        </div>
        <div className="sub-policy-container">
            <div className="color-secondary" style={{textDecoration: 'underline'}}><a href="/terms-conditions" target="_blank">Terms & Conditions</a></div>
            <div>
            <div style={{alignItems: 'flex-end', display: 'flex', flexDirection: "column"}}>
              <input type="checkbox" style={{width: 'fit-content'}} {...register("terms", {
                                  required: true,
                                })} />
              {errors.terms && <p className="error-text">This field is required</p>}
            </div>
            </div>
        </div>
     </div>
     <div className="myself-label" style={{position: "relative", width: "35%", padding: "20px 0px 20px 20px", display: "flex", justifyContent: "flex-end"}}>
            <div className="btn-filled" style={{width: 'fit-content'}} onClick={handleSubmit((onSubmit))}>Finish</div>
            
        </div>
    </div>
  );
};

export default PrivacyPolicy;