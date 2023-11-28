import { useContext, useState } from "react"
import { ContactContext } from "../../providers/ContactContext"
import { ContactCard } from "./ContactCard"
import { ModalCreateContact } from "../ModalCreateContact"
import { ModalUpdateAndDeleteContact } from "../ModalUpdateAndDeleteContact"
import { StyledContactSection } from "./ContactSection"
import { StyledParagraph, StyledTitleTwo } from "../../styles/typography"
import { StyledButton } from "../../styles/buttons"
import { StyledContainerList } from "../../styles/grid"


export const ContactSection = () =>{
  const[isOpen, setIsOpen] = useState(false)
  const[isOpenContactModal, setIsOpenContactModal] = useState(false)
  const[contact, setContact] = useState()

  const {contactList} = useContext(ContactContext)

  return(
    <StyledContactSection>
      <div className="container">
        <StyledTitleTwo>Contatos</StyledTitleTwo>
        <StyledButton
        buttonStyle="black"
        buttonSize="sm"
        onClick={() => setIsOpen(true)}>+</StyledButton>
        {isOpen? (
          <ModalCreateContact setIsOpen={setIsOpen}/>
        ): null}
      </div>
      <StyledContainerList>
        {contactList.length <= 0? (
          <StyledParagraph fontWeight="lg" fontSize="sm" fontColor="white">Você ainda não tem contatos cadastrados</StyledParagraph>
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
      </StyledContainerList>
      {isOpenContactModal ? (
        <ModalUpdateAndDeleteContact 
        setIsOpenContactModal={setIsOpenContactModal}
        contact={contact}/>
      ): null}
    </StyledContactSection>
  )
}