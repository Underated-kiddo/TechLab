    import { Routes, Route } from "react-router-dom";
    import Home from "./pages/Home";
    import Dashboard from "./pages/Dashboard";
    import AdminDash from "./pages/AdminDash";

    export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<AdminDash/>}/>
        </Routes>
    );
    }
