import React, {useEffect} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { API_DETAILS, COOKIE_KEYS } from "../../App";
import Cookies from "js-cookie";


const DoctorAccessDenied = () => {

    const navigate = useNavigate()

    useEffect(() => {
        fetchStatus()
    }, [])

    const fetchStatus = () => {
        const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/getDoctorStatus/${Cookies.get(COOKIE_KEYS.userId)}`;

        axios.get(url,).then(async (res) => {if(res.data.status == 'PENDING' || res.data.status == 'DENIED') {Cookies.set('status', res.data.status, {expires: 7})} else {navigate("/doctor-home");}}).catch(e => console.log(e))
    }

    return (
        <div style={{width: 'fit-content', margin: '0px auto', textAlign: 'center'}}>
            <img src={require('../../assets/Medicine.gif')} alt='No access'></img>
            <h2>Your account is not approved yet...</h2>
            <h5>Will verify ASAP. Thanks for your patience :)</h5>
        </div>
    )
}

export default DoctorAccessDenied;