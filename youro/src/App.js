import './App.css';
import DoctorSignup from './views/Doctor-Signup';
import SignupforFamilyMember from './views/Signup-For-FamilyMember';
import Signupformyself from './views/Signup-For-Myself';
import Signupoptions from './views/Signupoptions';
import Patientaddress from './views/PatientAddress';
import Login from './views/login';

import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import AdminSignup from './views/Admin-Signup';
import PrivacyPolicy from './views/PrivacyPolicies';
import Policy from './views/legal/policy';
import Telehealth from './views/legal/telehealth';
import Terms from './views/legal/termsConditions';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Home from './views/Home';
import PatientHomePage from './views/Patient UI/PatientHomePage';
import DoctorHomePage from './views/Doctor UI/Doctor-HomePage';
import DoctorProfile from './views/Doctor UI/DoctorProfile';

function App() {
  return ( 
    <>
     <Router>
     <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signupoptions/>}></Route>
        <Route path='/signupmyself' element={<Signupformyself/>}></Route>
        <Route path='/signupforfamilymember' element={<SignupforFamilyMember/>}></Route>
        <Route path='/signupprovider' element={<DoctorSignup/>}></Route>
        <Route path='/adminsignup' element={<AdminSignup/>}></Route>
        <Route path='/policy' element={<Policy/>}></Route>
        <Route path='/telehealth-consent' element={<Telehealth/>}></Route>
        <Route path='/terms-conditions' element={<Terms/>}></Route>
        <Route path='/patient-ui' element={<PatientHomePage/>}></Route>
        <Route path='/doctor-ui' element={<DoctorHomePage/>}></Route>
        <Route path='/doctor-profile' element={<DoctorProfile/>}></Route>
     </Routes>
    </Router>
    
    </>
  );
}

export default App;
