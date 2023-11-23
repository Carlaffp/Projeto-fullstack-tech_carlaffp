import { useContext } from "react"
import { UserContext } from "../../providers/UserContext"

import { ContactContext } from "../../providers/ContactContext"
import { UserSection } from "../../Components/UserSection"
import { ContactSection } from "../../Components/ContactSection"


export const DashboardPage = () =>{
  const {logout} = useContext(UserContext)

  return(
    <div>
      <button onClick={logout}>Sair</button>
      
      <main>
       <UserSection/>
       <ContactSection/> 

      </main>
    </div>
  )
}