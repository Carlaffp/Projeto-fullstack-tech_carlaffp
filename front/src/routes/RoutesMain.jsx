import { Route, Routes } from "react-router-dom"
import { RegisterPage } from "../pages/RegisterPage"
import { LoginPage } from "../pages/LoginPage"
import { DashboardPage } from "../pages/dashboardPage"
import { ContactProvider } from "../providers/ContactContext"
import { PublicRoutes } from "./PublicRoutes"
import { ProtectRoutes } from "./ProtectedRoutes"


export const RoutersMain = () =>{
  return(
    <Routes>
      <Route element={<PublicRoutes/>}>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      </Route>

      <Route element={<ProtectRoutes/>}>
      <Route path="/dashboard"
       element={
      <ContactProvider>
        <DashboardPage/>
      </ContactProvider>
      }/>
      </Route>
    </Routes>
  )
}