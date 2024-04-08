import "./App.css";
import DoctorSignup from "./views/Doctor-Signup";
import SignupforFamilyMember from "./views/Signup-For-FamilyMember";
import Signupformyself from "./views/Signup-For-Myself";
import Signupoptions from "./views/Signupoptions";
import Patientaddress from "./views/PatientAddress";
import Login from "./views/login";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import AdminSignup from "./views/Admin-Signup";
import PrivacyPolicy from "./views/PrivacyPolicies";
import Policy from "./views/legal/policy";
import Telehealth from "./views/legal/telehealth";
import Terms from "./views/legal/termsConditions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./views/Home";
import PatientView from "./views/Patient UI/PatientView";
import DoctorHomePage from "./views/Doctor UI/Doctor-HomePage";
import AdminDoctorsList from "./views/Admin UI/Admin-DoctorsList";
import AdminPatientList from "./views/Admin UI/Admin-PatientList";
import DoctorProfile from "./views/Doctor UI/DoctorProfile";
import DoctorAppointments from "./views/Doctor UI/Doctor-appointment";
import ViewProfile from "./views/Doctor UI/View-Profile";
import DoctorChat from "./views/Doctor UI/Doctor-Chat";
import AdminDeniedDoctorsList from "./views/Admin UI/Admin-DeniedDoctorsList";
import AdminViewDoctorProfile from "./views/Admin UI/Admin-ViewDoctorProfile";
import AdminViewPatientProfile from "./views/Admin UI/Admin-ViewPatientProfile";
import AdminMaintainenceList from "./views/Admin UI/Admin-Maintainence";
import ForgotPassword from "./views/ForgotPassword";
import VerifyEmail from "./views/VerifyEmail";
import AdminAssistantList from "./views/Admin UI/Admin-AssistantList";
import Cookies from "js-cookie";
import DoctorAccessDenied from "./views/Doctor UI/DoctorAccessDenied";
import axios from "axios";

export const API_DETAILS = {
  baseUrl: "http://localhost:",
  PORT: "9095",
  baseExtension: "/youro/api/v1",
};
export const USER_TYPES = {
  user: "PATIENT",
  doctor: "PROVIDER",
  admin: "ADMIN",
  assistant: "ASSITANT",
};
export const subscriptionStatus = {
  active: "ACTIVE",
  inActive: "INACTIVE",
};
export const DOCTOR_STATUS = {
  approved: "APPROVED",
  pending: "PENDING",
  denied: "DENIED",
};

export const COOKIE_KEYS = {
  token: "TOKEN",
  userId: "U_ID",
  userName: "U_NAME",
  userType: "U_TYPE",
};

const IsAuthenticated = () => {
  const token = Cookies.get(COOKIE_KEYS.token);
  if (!token) return false;

  return true;
};

const PatientProtectedRoute = ({ children }) => {
  if (!IsAuthenticated()) return <Navigate to="/login" replace />;

  const uType = Cookies.get(COOKIE_KEYS.userType);
  console.log(uType);

  if (uType == "PATIENT") return children;

  return (
    <Navigate
      to={uType == "PROVIDER" ? "/doctor-home" : "/admin-doctors"}
      replace
    />
  );
};

// const handleDoctorAccess = async () => {
//   const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/getDoctorStatus/${Cookies.get(COOKIE_KEYS.userId)}`;
//   const config = {
//       headers: {
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Methods': '*',
//           'Content-Type': 'application/json'
//       }
//   };

//   var status = ''
//   status = await axios.get(url, config).then(async (res) => {return res.data.status}).catch(e => console.log(e))
//   return status

// }

const DoctorProtectedRoute = ({ children }) => {
  if (!IsAuthenticated()) return <Navigate to="/login" replace />;

  // if(Cookies.get('status') == 'PENDING' || Cookies.get('status') == 'DENIED') return <Navigate to="/doctor-access" replace />

  // varstatus = handleDoctorAccess();

  const uType = Cookies.get(COOKIE_KEYS.userType);

  if (uType == "PROVIDER") return children;

  return (
    <Navigate
      to={uType == "PATIENT" ? "/patient-home" : "/admin-doctors"}
      replace
    />
  );
};

const AdminProtectedRoute = ({ children }) => {
  if (!IsAuthenticated()) return <Navigate to="/login" replace />;

  const uType = Cookies.get(COOKIE_KEYS.userType);

  if (uType == "ADMIN") return children;

  return (
    <Navigate
      to={uType == "PATIENT" ? "/patient-home" : "/doctor-home"}
      replace
    />
  );
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/verify-email" element={<VerifyEmail />}></Route>
          <Route path="/signup" element={<Signupoptions />}></Route>
          <Route path="/signupmyself" element={<Signupformyself />}></Route>
          <Route
            path="/signupforfamilymember"
            element={<SignupforFamilyMember />}
          ></Route>
          <Route path="/signupprovider" element={<DoctorSignup />}></Route>
          <Route path="/adminsignup" element={<AdminSignup />}></Route>
          <Route path="/policy" element={<Policy />}></Route>
          <Route path="/telehealth-consent" element={<Telehealth />}></Route>
          <Route path="/terms-conditions" element={<Terms />}></Route>

          <Route
            path="/patient-home"
            element={
              <PatientProtectedRoute>
                <PatientView />
              </PatientProtectedRoute>
            }
          ></Route>
          <Route
            path="/doctor-home"
            element={
              <DoctorProtectedRoute>
                <DoctorHomePage />
              </DoctorProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin-doctors"
            element={
              <AdminProtectedRoute>
                <AdminDoctorsList />
              </AdminProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin-patients"
            element={
              <AdminProtectedRoute>
                <AdminPatientList />
              </AdminProtectedRoute>
            }
          ></Route>
          <Route
            path="/doctor-profile"
            element={
              <DoctorProtectedRoute>
                <DoctorProfile />
              </DoctorProtectedRoute>
            }
          ></Route>
          <Route
            path="/doctor-access"
            element={
              <DoctorProtectedRoute>
                <DoctorAccessDenied />
              </DoctorProtectedRoute>
            }
          ></Route>
          <Route
            path="/doctor-appointment"
            element={
              <DoctorProtectedRoute>
                <DoctorAppointments />
              </DoctorProtectedRoute>
            }
          ></Route>
          <Route
            path="/doctor-view-profile/:patientId?/:apptId?"
            element={
              <DoctorProtectedRoute>
                <ViewProfile />
              </DoctorProtectedRoute>
            }
          ></Route>
          <Route
            path="/doctor-chat"
            element={
              <DoctorProtectedRoute>
                <DoctorChat />
              </DoctorProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin-denied-doctors"
            element={
              <AdminProtectedRoute>
                <AdminDeniedDoctorsList />
              </AdminProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin-view-doctor"
            element={
              <AdminProtectedRoute>
                <AdminViewDoctorProfile />
              </AdminProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin-view-patient"
            element={
              <AdminProtectedRoute>
                <AdminViewPatientProfile />
              </AdminProtectedRoute>
            }
          ></Route>
          <Route
            path="manage-approved-medicine"
            element={
              <AdminProtectedRoute>
                <AdminMaintainenceList />
              </AdminProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin-assistants"
            element={
              <AdminProtectedRoute>
                <AdminAssistantList />
              </AdminProtectedRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
