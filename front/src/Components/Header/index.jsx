import { useContext } from "react"
import { StyledHeader } from "./Header"
import { UserContext } from "../../providers/UserContext"
import logo from "../../assets/logo.png"
import { StyledButton } from "../../styles/buttons"


export const Header = ()=>{
  const {logout} = useContext(UserContext)
  return(
    <div>
      <StyledHeader>
      <img width={130} height={130} src={logo} alt="ContactSphere" />
      <StyledButton
      fontWeight="lg"
      buttonSize="sm"
      buttonStyle="disabled"
      onClick={logout}>Sair</StyledButton> 
      </StyledHeader>
    </div>
  )
}