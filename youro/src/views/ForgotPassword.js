import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Login from './login';
import { useNavigate  } from 'react-router-dom';

const ForgotPassword = () => {

    const [login, setLogin] = useState(0);

    const [otp, setOtp] = useState(0);
    const [email, setEmail] = useState("");
    const digitFields = [
        'verificationCodeDigit1',
        'verificationCodeDigit2',
        'verificationCodeDigit3',
        'verificationCodeDigit4',
        'verificationCodeDigit5',
        'verificationCodeDigit6',
    ];

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
    
    const [otpstep, setOtpstep] = useState(0);

    const onSubmit = async(data) =>{
        // api call to request for otp 
         //if not valid: show error in ui; else store the otp
        console.log("email: ",data.email);
        const url = `http://localhost:9092/youro/api/v1/send-otp/${data.email}`;
        await axios.get(url).then((res) => {
            console.log("otp: ", res.data.message);
            toast.success("otp sent to the email",{autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,});
            setOtp(res.data.message);
            setEmail(data.email);
            setOtpstep(1);
        }).catch((res) => {
            // console.log(res.data);
            toast.error(res.response.data.errorMessage);
            console.error(res.response.data.errorMessage);
        }); 
    }

    const codeVerify = async(data) =>{
        // compare otp & entered value
        const enteredOTP = digitFields.map((fieldId) =>
        document.getElementById(fieldId).value
        ).join('');

        console.log("entered otp: ", enteredOTP);
        console.log("actual otp: ", otp);

        if (enteredOTP === otp) {
           console.log('OTP is correct!');
           setOtpstep(2)
        } else {
           toast.error("OTP is incorrect,please try again.");
           console.log('OTP is incorrect. Please try again.');
        }
    }

    const onChangePassword = async(data) =>{
        // api call to password-reset
        // if updated successfully redirect to login; else throw error
        const enteredEmail = email;
        const newPasswordData = {
            username: enteredEmail, // Use the stored email
            password: data.password // Get the new password from the form data
        };

        const url = `http://localhost:9092/youro/api/v1/password-reset`;
        await axios.put(url, newPasswordData).then((res) => {
            toast.success("Password updated successfully!");
            setLogin(1);
            setOtpstep(3);
        }).catch((res) => {
            console.error(res.response.data.errorMessage)
            toast.error('Oops!! Something went wrong.' )
        });
    }

    const handleKeyPress = () => {

    }
    


    return (
        <div>
            <ToastContainer/>
            {otpstep === 0 && 
            <div style={{display:'flex',flexDirection:'column',margin:'5% 30%',justifyContent:'center'}}>
                <h2 style={{marginBottom: '50px'}}>Forgot your password ?</h2>
                <label>Enter your email</label><br></br>
                    <input className="input-field input-border" style={{width: '90%'}} type="text" {...register("email", {
                            required: true,
                            maxLength: 32,
                            pattern: /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/
                            })} />
                            {errors?.email?.type === "required" && <p className="error-text">This field is required</p>}
                            {errors?.email?.type === "maxLength" && <p className="error-text">Email cannot exceed 32 characters</p>}
                            {errors?.email?.type === "pattern" && <p className="error-text">Please enter valid email</p>}
                <div className="btn-filled" style={{marginTop: '5%',width:'87%'}} onClick={handleSubmit(onSubmit)}>Request for OTP</div>
            </div>
            }

            {otpstep === 1 && 
            <>  
                
                <div id="digitsContainer" style={{ textAlign: 'center' }}>
                    <div>
                        <h5>Enter the OTP sent to <i><u>{email}</u></i></h5>
                    </div>
                    <form id="codeverifyForm">
                        <div id="inputs" onKeyPress={handleKeyPress}>
                            <input type="text" class="digit" id="verificationCodeDigit1" minlength="1" maxlength="1" required />
                            <input type="text" class="digit" id="verificationCodeDigit2" minlength="1" maxlength="1" required />
                            <input type="text" class="digit" id="verificationCodeDigit3" minlength="1" maxlength="1" required />
                            <input type="text" class="digit" id="verificationCodeDigit4" minlength="1" maxlength="1" required />
                            <input type="text" class="digit" id="verificationCodeDigit5" minlength="1" maxlength="1" required />
                            <input type="text" class="digit" id="verificationCodeDigit6" minlength="1" maxlength="1" required />
                        </div>
                        <button type="button" id="verificationButton" onClick={codeVerify}>Verify code</button>
                    </form>
                </div>
            </>
            }

            {otpstep === 2 && 
                <div style={{display:'flex',flexDirection:'column',margin: '5% 30%',justifyContent:'center'}}>
                    <h2 style={{marginBottom: '40px'}}>Update Password</h2>
                    {/* <div className="required-fields"> */}
                            <div style={{margin:'2%'}}>
                                <label >New Password *</label>
                                <input className="input-field input-border" type="password" {...register("password", {
                                    required: true,
                                    maxLength: 32,
                                    minLength: 8
                                })} ></input>
                                {errors?.password?.type === "required" && <p className="error-text">This field is required</p>}
                                {errors?.password?.type === "maxLength" && <p className="error-text">Password cannot exceed 32 characters</p>}
                                {errors?.password?.type === "minLength" && <p className="error-text">Password length must be more than 8 characters</p>}
                            </div>

                            <div style={{margin:'2%'}}>
                                <label >Confirm New Password *</label>
                                <input className="input-field input-border" type="password" {...register("confirmPassword", {
                                    validate: val => watch('password') === val
                                })}  ></input>
                                {errors?.confirmPassword && <p className="error-text">Passwords must match</p>}
                            </div>

                    {/* </div> */}
                    <div className="btn-filled" style={{marginTop: '5%',width:'75%'}} onClick={handleSubmit(onChangePassword)}>Change Password</div>
            </div>
            
            }
            {login === 1 && navigate("/login") }  
        </div>    
    )
    
}

export default ForgotPassword;