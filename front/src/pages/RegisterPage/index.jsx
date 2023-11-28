import { Link } from "react-router-dom"
import { CreateUserForm } from "../../Components/CreateUserForm"
import { StyledLink } from "../../styles/buttons"
import { StyledContainer } from "../../styles/grid"
import { StyledTitleOne } from "../../styles/typography"


export const RegisterPage = ({setUser}) =>{
  return(
    <div>
      <StyledContainer>
      <StyledTitleOne fontSize="lg">Crie sua conta</StyledTitleOne>
      <CreateUserForm setUser={setUser}/>
      <StyledLink 
      to="/"
      fontWeight="lg"
      buttonSize="lg"
      buttonStyle="disabled"> Voltar</StyledLink>
      </StyledContainer>
    </div>
  )
}