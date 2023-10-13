import React, {useState} from "react";
import { useForm } from "react-hook-form";

const PatientProfile = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

    const [edit, setEdit] = useState(false)


    return (
        <>
        <div style={{marginTop: '50px', marginLeft: '50px', width: '100%'}}>
            <h1>Profile Information</h1>
            <div>
                
               <div className="Form-myself-Container" style={{width: '50%', marginLeft: '0px', marginTop: '50px'}}>
                     <div className="required-fields">
                          <div className="myself-input">
                               <label>First Name</label>
                               <input className="input-field input-border" disabled={!edit} type="text" {...register("firstName", {
                                  required: true,
                                  maxLength: 32,
                                  value: 'Sri Sai Charan'
                                })} />
                                {errors?.firstName?.type === "required" && <p className="error-text">This field is required</p>}
                                {errors?.firstName?.type === "maxLength" && <p className="error-text">First name cannot exceed 32 characters</p>}
                          </div>

    		     <div className="myself-input">
                         <label>Last Name</label>
                        <input className="input-field input-border" disabled={!edit} type="text" {...register("lastName", {
                                  required: true,
                                  maxLength: 32,
                                  value: 'Kachavarapu'
                                })} />
                                {errors?.lastName?.type === "required" && <p className="error-text">This field is required</p>}
                                {errors?.lastName?.type === "maxLength" && <p className="error-text">Last Name cannot exceed 32 characters</p>}
                     </div>
                </div>

                    <div className="required-fields">
                       <div className="myself-input">
                        <label>Email</label>
                        <input className="input-field1 input-border" disabled={!edit} type="text" {...register("email", {
                                  required: true,
                                  maxLength: 32,
                                  value: 'charan@gmail.com',
                                  pattern: /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/
                                })} />
                                {errors?.email?.type === "required" && <p className="error-text">This field is required</p>}
                                {errors?.email?.type === "maxLength" && <p className="error-text">Email cannot exceed 32 characters</p>}
                                {errors?.email?.type === "pattern" && <p className="error-text">Please enter valid email</p>}
                    </div>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between', width: '94%', marginTop: '50px', marginLeft: '0px', marginRight: 'auto'}}>
                        <div style={{marginLeft: '0px', color: 'var(--error-color)', display: 'flex', alignItems: 'center'}}><span class="material-symbols-outlined" style={{marginRight: '15px'}}>
                        logout
                        </span>Logout</div>


                        {/* <div className="next-button btn-filled" onClick={handleSubmit((onsubmit))}>Update</div> */}
                        {edit ? <div className="next-button btn-filled" onClick={handleSubmit((onsubmit))}>Update</div> 
                        : <div className="next-button btn-filled" onClick={() => setEdit(true)}>Edit</div>}
                    </div>

                    
                
               
                {/* <div className="bottom-fields">
                   <p>Already youro member? <span>Login</span></p>      
		</div>
                
		 <div className="button-container">
                   <button className="next-button">Next</button>
                </div> */}
        </div>
        </div>
             

             
             </div>
        </>
    )
}

export default PatientProfile;