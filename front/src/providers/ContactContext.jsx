import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { UserContext } from "./UserContext";


export const ContactContext = createContext({})

export const ContactProvider = ({children}) =>{
  const[contactList, setContactList] = useState([])


  const {use} = useContext(UserContext)

  useEffect(()=>{
    const readContacts = async () =>{
      const token = localStorage.getItem("@TOKEN")
      if(token){
        try{
          const {data} = await api.get("/contacts", {
            headers:{
              Authorization: `Bearer ${token}`
            }
          })
          setContactList(data.contacts)

        }catch (error) {
          console.log(error);
        }
      }
    }
    readContacts()
  }, [])

  const createContact = async(formData) =>{
    try{
      
      const token = localStorage.getItem("@TOKEN")
      const {data} = await api.post("/contacts", formData, {
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setContactList((contactList) => [...contactList,data])
      alert("criado com sucesso")
    }catch (error) {
      console.log(error);
      alert("email já cadastrado")
  }
}

  const deleteContact = async(id) => {
    try {
      const token = localStorage.getItem("@TOKEN");
      await api.delete(`/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContactList((contactList) => contactList.filter((contact) => contact.id !== id))
      alert("deletado com sucesso")
    } catch (error) {
      console.log(error);
      alert("não deletado")
    }
  };

  const updateContact = async(formData, id) => {
    try {
      const token = localStorage.getItem("@TOKEN");
     const{data} = await api.patch(`/contacts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContactList((contactList) => contactList.map(contact =>{
        if(contact.id === id){
          return data
        }
        else{
          return contact
        }
      }))
    } catch (error) {
      console.log(error);
      alert("email ja cadastrado em seus contatos")
    }
  };

  return(
    <ContactContext.Provider
    value={{contactList,createContact, deleteContact, updateContact}}>
      {children}
    </ContactContext.Provider>
  )
}
