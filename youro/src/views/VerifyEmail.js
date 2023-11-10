import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Login from './login';
import { useNavigate , useLocation } from 'react-router-dom';
import { API_DETAILS } from '../App';

const VerifyEmail= (props) =>
{
    // how to get email address of the user and pass it on?
    // origins of /verify-password
    // const { state } = props.location;
    // const userEmail = state ? state.userEmail : null;
    //let userEmail = props.userEmail;

    // const location = useLocation();
    // const { userEmail, userId } = location.state || {};
    const [login, setLogin] = useState(0)

    const location = useLocation();
    const { userEmail } = location.state || {};


    const [verify, setVerify] = useState(0);
    const [otp, setOtp] = useState(0);
    const digitFields = [
        'verificationCodeDigit1',
        'verificationCodeDigit2',
        'verificationCodeDigit3',
        'verificationCodeDigit4',
        'verificationCodeDigit5',
        'verificationCodeDigit6',
    ];
    const navigate = useNavigate();

    const emailVerify = async() =>{
        console.log("user email in emailVerify() : ", userEmail);

        const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/send-otp/${userEmail}`;
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            }
        };
        await axios.get(url, config).then((res) => {
            console.log("otp: ", res.data.message);
            toast.success("otp sent to the email",{autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,});
            setOtp(res.data.message);
            setVerify(1);
        }).catch((res) => {
            // console.log(res.data);
            toast.error(res.response.data.errorMessage);
            console.error(res.response.data.errorMessage);
        }); 
    }

    const codeVerify = async(data) =>{
        // compare otp & entered value

        const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/verifyUser/${userEmail}`;
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            }
        };

        const enteredOTP = digitFields.map((fieldId) =>
        document.getElementById(fieldId).value
        ).join('');

        console.log("entered otp: ", enteredOTP);
        console.log("actual otp: ", otp);

        if (enteredOTP === otp) {
           console.log('OTP is correct!');
           toast.success("Verification Successful",{autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
           });
            await axios.put(url, config).then((res) => {
                console.log("response from backend: ", res.data);
                setVerify(2);
            }).catch((res) => {
                console.error(res.response.data.errorMessage);
            }); 
        } else {
           toast.error("OTP is incorrect,please try again.");
           console.log('OTP is incorrect. Please try again.');
        }
    }

    const handleKeyPress = () => {

    }
   
   return (

           <div class="Signupfamilymember-container">
            <ToastContainer />

            {verify === 0 && <>
             <div className="Login-Form-Container" style={{margin: '5% 30%'}}>
                <div style={{textAlign: "center"}}>
                    <h1>youro</h1>
                    <h2>Verify your email address</h2>
                    <p>Thank you for choosing Youro.</p>
                    <p>To access your account, please verify your email {userEmail} by clicking on the button below.</p>
                </div>
                
                <div>
                    <div className="btn-filled" style={{marginTop: '40px'}} onClick={emailVerify}>Verify my email</div>
                </div>
             </div>
             </>
            }

            {verify === 1 && <>                 
                <div id="digitsContainer" style={{ textAlign: 'center' }}>
                    <div>
                        <h5>Enter the OTP sent to <i><u>{userEmail}</u></i></h5>
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

            {verify === 2 && <>
                <div className="Login-Form-Container" style={{margin: '5% 30%'}}>
                    <div style={{textAlign: "center"}}>
                        <h2>Verification Successful</h2>
                        <p>You can now sign in with your new account</p>
                        <p className="color-secondary" style={{textDecoration: 'underline', cursor: 'pointer',fontWeight:'bold'}} onClick={() => setLogin(1)}>Click here to Log In</p>
                    </div>               
                </div>
             </>
            }

            {login === 1 && navigate("/login") }  

             
             
        </div>
    )
}

export default VerifyEmail;