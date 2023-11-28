import { UserContext } from "../../providers/UserContext"
import { useContext, useState } from "react"
import { FaGear } from "react-icons/fa6";
import { ModalUpdateUser } from "../ModalUpdateUser";
import { StyledUserSection } from "./UserSection";
import { StyledTitleOne } from "../../styles/typography";


export const UserSection = () =>{
  const {user} = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false)

  

  return(
    <StyledUserSection>
      <div className="container">
        <StyledTitleOne fontSize="lg"> Olá, {user.fullName}</StyledTitleOne>
        <button onClick={() => setIsOpen(true)}>
          <FaGear size={30}/>
        </button>
        {isOpen? (<ModalUpdateUser setIsOpen={setIsOpen} user={user}/>): null}
        
      </div>
    </StyledUserSection>
  )
}