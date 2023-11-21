import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({})
export const UserProvider = ({children}) =>{
  const [user, setUser] = useState(null)
  const [loading, setLoading] =useState(false)
  const navigate = useNavigate()

  useEffect(() =>{
    loadUser()
  },[])

  const loadUser = async () => {
    const token = localStorage.getItem("@TOKEN")
    if(token){
      try{
        setLoading(true)
        const {data} = await api.get("/users", {
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        console.log(data)
        setUser(data)
      }catch (error) {
        console.log(error);
        localStorage.removeItem("@TOKEN");
        localStorage.removeItem("@USERID");
      } finally {
        setLoading(false);
      }
    }
  }

  const createUser = async (formData) =>{
    try{
      const {data} = await api.post("/users", formData)
      
    }catch (error){
      console.log(error)
    }
  }

  const loginUser = async(formData, setLoading) =>{
    try{
      setLoading(true)
      const {data} = await api.post("/login", formData)
      console.log(data)
      localStorage.setItem("@TOKEN", data.token)
      navigate("/dashboard")
    }catch (error){
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  const logout = () =>{
    localStorage.removeItem("@TOKEN")
    localStorage.removeItem("@USERID")
    setUser(null)
    navigate("/")
  }

  return(
    <UserContext.Provider
      value={{user, setUser,loading, createUser, loginUser, logout}}
      >
      {children}
    </UserContext.Provider>
  )
}