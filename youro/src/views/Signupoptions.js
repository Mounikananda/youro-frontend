import React, {useState} from "react";
import "../styles/login.css"
import { useNavigate } from "react-router-dom";
import Loader from "../utils/loader";

const Signupoptions= () => {

    const navigate = useNavigate();
    // const [page, setPage] = useState(1);
    const [activeLoader, setActiveLoader] = useState(false);

    const navigate_to_page=(value)=>
    {
      setActiveLoader(true); 
      setTimeout(() => 
     {
      setActiveLoader(false)
       if (value === 1) {
        navigate('/signupmyself');
       } 
       else {
      navigate('/signupforfamilymember');
      }
     }, 
     200);
    }
    return (
        <div>
        {/* {page === 0 ? <div class="option-select">
            <h1>youro</h1>
            <h2>Who are you? </h2>
            <p className="h3">Membership gives you or your family access <br/> to a urology-trained provider when you need it.</p>
            <button className="options-button-1" onClick={() => {setPage(1); setActiveLoader(true); setTimeout(() => {setActiveLoader(false)}, 200)}}>Patient</button>
            <button className="options-button-1" onClick={() => navigate('/signupprovider')}>Provider</button>
            </div> 
            :  */}
            <Loader active={activeLoader}/>
            <div class="option-select">
            <h1>youro</h1>
            <h2>Who is this membership for? </h2>
            <p className="h3">Membership gives you or your family access <br/> to a urology-trained provider when you need it.</p>
            <button className="options-button-1" onClick={() => navigate_to_page(1)}>For Myself </button>
            <button className="options-button-1" onClick={() => navigate_to_page(2)}>For A Family Member</button>
            </div>
       
     
    </div>
    )
}

export default Signupoptions;