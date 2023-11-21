import { Route, Routes } from "react-router-dom"
import { RegisterPage } from "../pages/RegisterPage"
import { LoginPage } from "../pages/LoginPage"
import { DashboardPage } from "../pages/dashboardPage"


export const RoutersMain = () =>{
  return(
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/dashboard" element={<DashboardPage/>}/>
    </Routes>
  )
}