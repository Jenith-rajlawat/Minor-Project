import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style.scss";
import "./admin.scss";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Navbar from "./pages/NavBar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AboutUs from "./pages/AboutUs";
import OurMission from "./pages/OurMission";
import Admin from "./pages/Admin";
import Donor from "./pages/Donor";
import Feed from "./pages/Feed";
import Distance from "./pages/Distance";

import Request from './pages/admin/Request';
import DonorDetails from './pages/admin/DonorDetails';
import AgentDetails from './pages/admin/AgentDetails';
import Donations from './pages/admin/Donations';

import DonorRequest from './pages/donor/DonorRequest';
import Mydonations from './pages/donor/Mydonations';

import FeedProfile from './pages/feed/FeedProfile';
import MyFeed from './pages/feed/MyFeed';
import BeADonor from './pages/feed/BeADonor';



function App() {
  const {currentUser} = useContext(AuthContext)

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login" />
    }
    return children
  }




  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="/donor" element={<ProtectedRoute><Donor /></ProtectedRoute>} />
            <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/ourmission" element={<OurMission />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/DonorDetails" element={<DonorDetails />} />
            <Route path="/AgentDetails" element={<AgentDetails />} />
            <Route path="/Request" element={<Request />} />
            <Route path="/Donation" element={<Donations />} />


            <Route path="/Mydonations" element={<Mydonations />} />
            <Route path="/donorrequest" element={<DonorRequest />} />

            <Route path="/myfeedprofile" element={<FeedProfile />} />
            <Route path="/myfeed" element={<MyFeed />} />
            <Route path="/beadonor" element={<BeADonor />} />

            <Route path="/distance" element={<Distance />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
