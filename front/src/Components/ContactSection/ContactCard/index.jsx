import { StyledParagraph } from "../../../styles/typography"
import { StyledContactCard } from "./ContactCard"

export const ContactCard = ({contact, setIsOpenContactModal, setContact}) =>{
  return(
    <StyledContactCard onClick={() =>(setIsOpenContactModal(true), setContact(contact))}>
      <div className="div">
      <StyledParagraph fontSize="sm"> Nome: {contact.fullName}</StyledParagraph>
      <StyledParagraph fontSize="sm">Email: {contact.email}</StyledParagraph>
      <StyledParagraph fontSize="sm">Contato: {contact.phone}</StyledParagraph>

      </div>
    </StyledContactCard>
  )
}