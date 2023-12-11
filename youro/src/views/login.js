
import React, { useState, useEffect } from "react";
import "../styles/login.css";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import ForgotPassword from "./ForgotPassword";
import Cookies from "js-cookie";

import { useNavigate } from 'react-router-dom';
import { API_DETAILS, COOKIE_KEYS } from "../App";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    // removing existing cookies before login in case redirected from some un-authed url access
    Cookies.remove(COOKIE_KEYS.userId);
    Cookies.remove(COOKIE_KEYS.token);
    Cookies.remove(COOKIE_KEYS.userType);
    Cookies.remove(COOKIE_KEYS.userName);
  }, []);

  const navigate = useNavigate();
  const [forgot, setForgot] = useState(0)

  const onSubmit = (data) => {
    console.log(data);
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json'
      }
    };
    axios.post(API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + "/login", data, config).then((res) => {
      console.log("login response: ", res);
      console.log("verificationStatus: ", res.data.verificationStatus)

      if (res.data.uType === 'ADMIN') {
        toast.success("Successful login");
        console.log(res);
        Cookies.set(COOKIE_KEYS.token, res.data.token, { expires: 7 });
        Cookies.set(COOKIE_KEYS.userId, res.data.userId, { expires: 7 });
        Cookies.set(COOKIE_KEYS.userType, res.data.uType, { expires: 7 });
        Cookies.set(COOKIE_KEYS.userName, res.data.fullName, { expires: 7 });
        navigate("/admin-doctors");
      }

      else {
        if (res.data.verificationStatus == true) {
          toast.success("Successful login");
          console.log(res);
          Cookies.set(COOKIE_KEYS.token, res.data.token, { expires: 7 });
          Cookies.set(COOKIE_KEYS.userId, res.data.userId, { expires: 7 });
          Cookies.set(COOKIE_KEYS.userType, res.data.uType, { expires: 7 });
          Cookies.set(COOKIE_KEYS.userName, res.data.fullName, { expires: 7 });

          if (res.data.uType === 'PATIENT') {
            navigate("/patient-home");
          }
          else if (res.data.uType === 'PROVIDER') {
            navigate("/doctor-home");
          }
          else {
            navigate("/admin-doctors");
          }
        }
        else {
          navigate("/verify-email", { state: { userEmail: res.data.email } });
        }
      }
    }).catch((res) => {
      console.error(res.response.data.errorMessage)
      toast.error('Oops!! Please check your username and password')
    });
  }


  // document.addEventListener('keydown', (event) => {
  //   if (event.keyCode === 13) {
  //     event.preventDefault();
  //     console.log('Enter key pressed');
  //     handleSubmit(onSubmit)();
  //   }
  // });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(onSubmit)();
      }
}

  return (
    <div class="Signupfamilymember-container" onKeyDown={handleKeyDown}>
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
            <input className="input-field input-border" type="password" onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmit(onSubmit)();
              }
            }} {...register("password", {
              required: true,
              maxLength: 32,
              minLength: 8
            })} ></input>
            {errors?.password?.type === "required" && <p className="error-text">This field is required</p>}
            {errors?.password?.type === "maxLength" && <p className="error-text">Password cannot exceed 32 characters</p>}
            {errors?.password?.type === "minLength" && <p className="error-text">Password is min 8 characters</p>}
          </div>
          <div>
            <p className="color-secondary" style={{ textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setForgot(1)}>Forgot password?</p>
            <div className="btn-filled" style={{ marginTop: '40px' }} onClick={handleSubmit(onSubmit)}>Login</div>
            <div style={{textAlign: 'center'}}>
            <p>Don't have account? <span className="color-secondary" style={{ textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate("/signup")}>Sign Up</span></p>
            </div>
            
          </div>
        </div>
      </>
      }

      {forgot === 1 && navigate('/forgot-password')}


    </div>
  )
}

export default Login;

