    import { Routes, Route } from "react-router-dom";
    import Home from "./pages/Home";
    import Dashboard from "./pages/Dashboard";
    import AdminDash from "./pages/AdminDash";
    import SignupSignIn from "./pages/Signup-SignIn";
    import ExploreRooms from "./pages/ExploreRooms";

    export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<AdminDash/>}/>
            <Route path="/signup-in" element={<SignupSignIn/>}/>
            <Route path="/exploreRooms" element={<ExploreRooms/>}/>
        </Routes>
    );
    }