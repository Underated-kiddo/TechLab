import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignupSignIn from "./pages/Signup-SignIn";
import Calendar from "./pages/Calendar";
import CreateRoom from "./pages/CreateRoom";
import AdminDash from "./pages/AdminDash";
import ExploreRooms from "./pages/ExploreRooms";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signup" element={<SignupSignIn initialAction="Sign Up" />} />
      <Route path="/login" element={<SignupSignIn initialAction="Sign In" />} />
      <Route path="/admin" element={<AdminDash/>} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/create-room" element={<CreateRoom />} />
      <Route path="/explore-rooms" element={<ExploreRooms/>}/>
    </Routes>
  );
}