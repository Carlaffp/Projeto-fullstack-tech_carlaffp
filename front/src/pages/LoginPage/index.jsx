import { Link } from "react-router-dom"
import { LoginForm } from "../../Components/LoginForm"


export const LoginPage = ({setUser}) =>{
  return(
    <div>
      <LoginForm setUser={setUser}/>
      <Link to="/register"> Cadastre-se</Link>
    </div>
  )
}