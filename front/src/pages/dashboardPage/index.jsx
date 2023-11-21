import { useContext } from "react"
import { UserContext } from "../../providers/UserContext"


export const DashboardPage = () =>{
  const {logout, user} = useContext(UserContext)
  

  return(
    <div>
      <button onClick={logout}>Sair</button>
      <main>
        

      </main>
    </div>
  )
}