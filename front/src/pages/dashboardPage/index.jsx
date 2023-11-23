import { useContext } from "react"
import { UserContext } from "../../providers/UserContext"

import { ContactContext } from "../../providers/ContactContext"
import { UserSection } from "../../Components/UserSection"


export const DashboardPage = () =>{
  const {logout} = useContext(UserContext)
  const {user} = useContext(UserContext)
  const {contactList} = useContext(ContactContext)

  return(
    <div>
      <button onClick={logout}>Sair</button>
      
      <main>
       <UserSection/>
       <section>

       </section>

      </main>
    </div>
  )
}