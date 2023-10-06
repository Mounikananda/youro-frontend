import React, {useState} from 'react'
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

    const [otpstep, setOtpstep] = useState(0);

    const onSubmit = (data) =>{
        setOtpstep(1)
    }


    const handleKeyPress = () => {

    }
    

    return (
        <div>
            {otpstep === 0 && 
            <div style={{marginTop: '30%'}}>
                <h2 style={{marginBottom: '50px'}}>Forgot your password ?</h2>
            <label>Enter your email</label><br></br>
                    <input className="input-field input-border" style={{width: '300px'}} type="text" {...register("username", {
                            required: true,
                            maxLength: 32,
                            pattern: /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/
                            })} />
                            {errors?.email?.type === "required" && <p className="error-text">This field is required</p>}
                            {errors?.email?.type === "maxLength" && <p className="error-text">Email cannot exceed 32 characters</p>}
                            {errors?.email?.type === "pattern" && <p className="error-text">Please enter valid email</p>}
            <div className="btn-filled" style={{marginTop: '25px'}} onClick={handleSubmit(onSubmit)}>Request for OTP</div>
            </div>
            }

            {otpstep === 1 && 
            <>
                <div id="digitsContainer">
                    <form id="codeverifyForm">
                        <div id="inputs" onKeyPress={handleKeyPress}>
                            <input type="text" class="digit" id="verificationCodeDigit1" minlength="1" maxlength="1" required />
                            <input type="text" class="digit" id="verificationCodeDigit2" minlength="1" maxlength="1" required />
                            <input type="text" class="digit" id="verificationCodeDigit3" minlength="1" maxlength="1" required />
                            <input type="text" class="digit" id="verificationCodeDigit4" minlength="1" maxlength="1" required />
                            <input type="text" class="digit" id="verificationCodeDigit5" minlength="1" maxlength="1" required />
                            <input type="text" class="digit" id="verificationCodeDigit6" minlength="1" maxlength="1" required />
                        </div>
                        <button type="button" id="verificationButton" onclick="codeverify();">Verify code</button>
                    </form>
                </div>
            </>
            }
        
        </div>
    )
}

export default ForgotPassword;