import { useContext, useState } from "react"
import { ContactContext } from "../../providers/ContactContext"
import { ContactCard } from "./ContactCard"
import { ModalCreateContact } from "../ModalCreateContact"
import { ModalUpdateAndDeleteContact } from "../ModalUpdateAndDeleteContact"


export const ContactSection = () =>{
  const[isOpen, setIsOpen] = useState(false)
  const[isOpenContactModal, setIsOpenContactModal] = useState(false)
  const[contact, setContact] = useState()

  const {contactList} = useContext(ContactContext)

  return(
    <section>
      <div>
        <h1>Contatos</h1>
        <button onClick={() => setIsOpen(true)}>+</button>
        {isOpen? (
          <ModalCreateContact setIsOpen={setIsOpen}/>
        ): null}
      </div>
      <div>
        {contactList.length <= 0? (
          <p>Você ainda não tem contatos cadastrados</p>
        ): (
          <>
          {contactList.map(contact => (
            <ContactCard
            key={contact.id}
            contact={contact}
            setContact={setContact}
            setIsOpenContactModal={setIsOpenContactModal}/>
          ))}
          </>
        )}
      </div>
      {isOpenContactModal ? (
        <ModalUpdateAndDeleteContact 
        setIsOpenContactModal={setIsOpenContactModal}
        contact={contact}/>
      ): null}
    </section>
  )
}