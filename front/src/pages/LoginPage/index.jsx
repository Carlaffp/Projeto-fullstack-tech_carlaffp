import { Link } from "react-router-dom"
import { LoginForm } from "../../Components/LoginForm"
import { StyledParagraph, StyledTitleOne } from "../../styles/typography"
import {StyledContainer, StyledContainer1, StyledContainer2 } from "../../styles/grid"
import { StyledLink } from "../../styles/buttons"
import logo from "../../assets/logo.png"
import { StyledLoginPage } from "./LoginPage"


export const LoginPage = ({setUser}) =>{
  return(
    <StyledLoginPage>
      <StyledContainer1>
        <div className="div">
        <img  src={logo} alt="ContactSphere" style={{ width: '100%', height: '100%' }} ></img>
        </div>
      </StyledContainer1>
      <StyledContainer2>
        <StyledContainer>
          
      <StyledTitleOne fontSize="lg">Login</StyledTitleOne>
      <LoginForm setUser={setUser}/>
      <StyledParagraph fontSize="sm" fontWeight="lg">
        Ainda não possui uma conta?
        </StyledParagraph>
      <StyledLink
      to="/register"
      fontWeight="lg"
      buttonSize="lg"
      buttonStyle="disabled"
      > 
      Cadastre-se
      </StyledLink>
        </StyledContainer>
      </StyledContainer2>
    </StyledLoginPage>
  )
}