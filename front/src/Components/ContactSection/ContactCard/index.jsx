
export const ContactCard = ({contact, setIsOpenContactModal, setContact}) =>{
  return(
    <li onClick={() =>(setIsOpenContactModal(true), setContact(contact))}>
      <p>{contact.fullName}</p>
      <p>{contact.email}</p>
      <p>{contact.phone}</p>
    </li>
  )
}