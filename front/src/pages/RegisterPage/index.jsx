import { Link } from "react-router-dom"
import { CreateUserForm } from "../../Components/CreateUserForm"
import { StyledLink } from "../../styles/buttons"
import { StyledContainer, StyledContainer1, StyledContainer2 } from "../../styles/grid"
import { StyledTitleOne } from "../../styles/typography"
import logo from "../../assets/logo.png"
import { StyledRegisterPage } from "./RegisterPage"


export const RegisterPage = ({setUser}) =>{
  return(
    <StyledRegisterPage>
      <StyledContainer1>
        <div className="div">
        <img  src={logo} alt="ContactSphere" style={{ width: '100%', height: '100%' }} ></img>
        </div>
      </StyledContainer1>
      <StyledContainer2>
      <StyledContainer>
      <StyledTitleOne fontSize="lg">Crie sua conta</StyledTitleOne>
      <CreateUserForm setUser={setUser}/>
      <StyledLink 
      to="/"
      fontWeight="lg"
      buttonSize="lg"
      buttonStyle="disabled"> Voltar</StyledLink>
      </StyledContainer>
      </StyledContainer2>
    </StyledRegisterPage>
  )
}