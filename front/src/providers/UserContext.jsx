import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const UserContext = createContext({})
export const UserProvider = ({children}) =>{
  const [user, setUser] = useState(null)
  const [loading, setLoading] =useState(false)

  const navigate = useNavigate()

  const pathname = window.location.pathname


  useEffect(() =>{
    getUser()
  },[])

  const getUser = async () => {
    const token = localStorage.getItem("@TOKEN")
    const userId = localStorage.getItem("@USERID")
    if(token){
      try{
        setLoading(true)
        const {data} = await api.get(`/users/${userId}`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        setUser(data)
        navigate(pathname)
      }catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  const createUser = async (formData) =>{
    try{
      const {data} = await api.post("/users", formData)
      navigate("/")
      toast.success("Cadastro realizado com sucesso")
    }catch (error){
      console.log(error)
      toast.error("Email já cadastrado")
    }
  }

  const loginUser = async(formData, setLoading) =>{
    try{
      setLoading(true)
      const {data} = await api.post("/login", formData)
      setUser(data.user)
      localStorage.setItem("@TOKEN", data.token)
      localStorage.setItem("@USERID", data.user.id);
      navigate("/dashboard")
      toast.success("Login realizado com sucesso")
    }catch (error){
      console.log(error)
      toast.error("Email ou senha inválidos")
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

  const updateUser = async (formData, id) =>{
    try{
      const token = localStorage.getItem("@TOKEN")
      console.log(user.email)
      if(formData.email === ""){
        formData.email = user.email
      }
      const {data} = await api.patch(`/users/${id}`, formData,{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
      console.log(data)
      if(data.id === id){
        setUser(data)
        toast.success("Dados atualizados com sucesso") 
        return data
      }else{
        setUser(user)
      }
    }catch (error) {
      console.log(error);
      toast.error("Dados não atualizados")
    }

  }

  return(
    <UserContext.Provider
      value={{user, setUser,loading, createUser, loginUser, logout, updateUser}}
      >
      {children}
    </UserContext.Provider>
  )
}