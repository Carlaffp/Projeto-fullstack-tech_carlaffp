import { useContext } from "react"
import { UserContext } from "../../providers/UserContext"

import { ContactContext } from "../../providers/ContactContext"
import { UserSection } from "../../Components/UserSection"
import { ContactSection } from "../../Components/ContactSection"
import { Header } from "../../Components/Header"


export const DashboardPage = () =>{
  const {logout} = useContext(UserContext)

  return(
    <div>
      <Header/>
      <main>
       <UserSection/>
       <ContactSection/> 
      </main>
    </div>
  )
}