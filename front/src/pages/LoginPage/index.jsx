import { Link } from "react-router-dom"
import { LoginForm } from "../../Components/LoginForm"
import { StyledParagraph, StyledTitleOne } from "../../styles/typography"
import { StyledContainer } from "../../styles/grid"
import { StyledLink } from "../../styles/buttons"


export const LoginPage = ({setUser}) =>{
  return(
    <div>
      <StyledContainer>
      <StyledTitleOne fontSize="lg">Login</StyledTitleOne>
      <LoginForm setUser={setUser}/>
      <StyledParagraph fontSize="sm" fontWeight="lg">Ainda não possui uma conta?</StyledParagraph>
      <StyledLink
      to="/register"
      fontWeight="lg"
      buttonSize="lg"
      buttonStyle="disabled"
      > 
      Cadastre-se
      </StyledLink>
      </StyledContainer>
    </div>
  )
}