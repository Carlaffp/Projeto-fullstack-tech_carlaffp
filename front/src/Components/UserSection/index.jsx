import { UserContext } from "../../providers/UserContext"
import { useContext, useState } from "react"
import { FaGear } from "react-icons/fa6";
import { ModalUpdateUser } from "../ModalUpdateUser";


export const UserSection = () =>{
  const {user} = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false)

  

  return(
    <section>
      <div>
        <p>{user.fullName}</p>
      </div>
      <div>
        <button onClick={() => setIsOpen(true)}>
          <FaGear/>
        </button>
        {isOpen? (<ModalUpdateUser setIsOpen={setIsOpen} user={user}/>): null}
        
      </div>
    </section>
  )
}