import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AdminLogin } from "./Admin/AdminLogin"

import Home from "./pages/Home";
import {AuthContext}  from "./context/AuthContext";
import { useContext } from "react";
import Dashboard from "./Admin/Dashboard";
import PageContent from "./components/Admin/PageContent";
import { AdminPanel } from "./Admin/AdminPanel";
import Bookings from "./Admin/Bookings";
import Courses from "./Admin/Courses";



const RequireAuth = ({children}) => {
  const {currentUser} = useContext(AuthContext);
  return currentUser ? (children) : <Navigate to="/admin/login"/>
}
 
function App() {
  return (
   
    <Routes>
      <Route path="/admin/login"element={<AdminLogin />} />
      <Route path="/admin/dashboard/*"element={<RequireAuth>
        <Dashboard />
      </RequireAuth>} />
      <Route path="/"element={<Home />} />
      
    </Routes>
    
  )
}

export default App
