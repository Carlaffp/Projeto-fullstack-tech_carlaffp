import { Link } from "react-router-dom"
import { CreateUserForm } from "../../Components/CreateUserForm"


export const RegisterPage = ({setUser}) =>{
  return(
    <div>
      <CreateUserForm setUser={setUser}/>
      <Link to="/"> Voltar</Link>
    </div>
  )
}