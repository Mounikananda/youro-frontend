import React,{useState} from "react";
import "../styles/login.css";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import ForgotPassword from "./ForgotPassword";
import Cookies from "js-cookie";

import { useNavigate } from 'react-router-dom';
import { COOKIE_KEYS } from "../App";

const Login= () =>
{
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  
  const navigate = useNavigate();
  const [forgot, setForgot] = useState(0)

  const onSubmit = (data) =>{
    console.log(data);
    axios.post("http://52.14.33.154:9093/youro/api/v1/login", data).then((res) => {
        toast.success("Successful login");
        console.log(res);
        Cookies.set(COOKIE_KEYS.token, res.data.token, { expires: 7 });
        Cookies.set(COOKIE_KEYS.userId, res.data.userId, { expires: 7 });
        Cookies.set(COOKIE_KEYS.userType, res.data.uType, { expires: 7 });
        Cookies.set(COOKIE_KEYS.userName, res.data.fullName,{expires:7}); 

        if(res.data.uType === 'PATIENT'){
          navigate("/patient-ui");
        }
        else if(res.data.uType === 'PROVIDER'){
          navigate("/doctor-ui");
        }
        else{
          navigate("/admin-doctors");
        }
    }).catch((res) => {
        console.error(res.response.data.errorMessage)
        toast.error('Oops!! Please check your username and password' )
    });
  }

   
   return (
           <div class="Signupfamilymember-container">
            <ToastContainer />
            {forgot === 0 && <>
             <h1>youro</h1>
             <h2>Login</h2>
             <div className="Login-Form-Container">
                <div>
                <label>Email</label>
                        <input className="input-field input-border" type="text" {...register("username", {
                                  required: true,
                                  maxLength: 32,
                                  pattern: /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/
                                })} />
                                {errors?.email?.type === "required" && <p className="error-text">This field is required</p>}
                                {errors?.email?.type === "maxLength" && <p className="error-text">Email cannot exceed 32 characters</p>}
                                {errors?.email?.type === "pattern" && <p className="error-text">Please enter valid email</p>}
                </div>
                <div>
                <label >Password</label>
                       <input className="input-field input-border" type="password" {...register("password", {
                                  required: true,
                                  maxLength: 32,
                                  minLength: 8
                                })} ></input>
                        {errors?.password?.type === "required" && <p className="error-text">This field is required</p>}
                        {errors?.password?.type === "maxLength" && <p className="error-text">Password cannot exceed 32 characters</p>}
                        {errors?.password?.type === "minLength" && <p className="error-text">Password is min 8 characters</p>}
                </div>
                <div>
                <p className="color-secondary" style={{textDecoration: 'underline', cursor: 'pointer',fontWeight:'bold'}} onClick={() => setForgot(1)}>Forgot password?</p>
                <div className="btn-filled" style={{marginTop: '40px'}} onClick={handleSubmit(onSubmit)}>Login</div>
                </div>
                </div>
                </>
            }

            {forgot === 1 && navigate('/forgot-password')}
             
             
        </div>
    )
}

export default Login;
