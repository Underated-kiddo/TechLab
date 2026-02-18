import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignupSignIn from "./pages/Signup-SignIn";
import Calendar from "./pages/Calendar";
import CreateRoom from "./pages/CreateRoom";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/signup" element={<SignupSignIn initialAction="Sign Up" />} />
      <Route path="/login" element={<SignupSignIn initialAction="Sign In" />} />
      <Route path="/SignupSignIn" element={<SignupSignIn />} />
      <Route path="/Calendar" element={<Calendar />} />
      <Route path="/CreateRoom" element={<CreateRoom />} />
    </Routes>
  );
}
