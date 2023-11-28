import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../Input";
import { ContactContext } from "../../providers/ContactContext";
import { StyledCloseButton, StyledDivModal, StyledModalContainer, StyledModalHeader, StyledModalmain } from "../../styles/modal";
import { StyledForm } from "../../styles/form";
import { StyledTitleOne } from "../../styles/typography";
import { StyledDivButtons } from "./ModalUpdateAndDeleteContact";
import { StyledButtonUpdateModal } from "../../styles/buttons";



export const ModalUpdateAndDeleteContact = ({setIsOpenContactModal, contact}) =>{
  const {
    register,
    handleSubmit,
    reset,
    
  } = useForm();

  const {updateContact, deleteContact} = useContext(ContactContext)

  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutClick = event => {
      if (!modalRef.current?.contains(event.target)) {
        setIsOpenContactModal(false);
      }
    };

    window.addEventListener("mousedown", handleOutClick);
    return () => {
      window.removeEventListener("mousedown", handleOutClick);
    };
  }, []);

  const deleteAndCloseModal = () =>{
    deleteContact(contact.id)
    setIsOpenContactModal(false)
  }

  const submit = async (formData) =>{
    await updateContact(formData, contact.id)
    setIsOpenContactModal(false)
    reset()
  }

  return(
    <StyledModalContainer role="dialog">
      <StyledDivModal ref={modalRef}>
        <StyledModalHeader>
          <StyledTitleOne fontSize="sm">Contato: {contact.fullName}</StyledTitleOne>
          <StyledCloseButton onClick={() => setIsOpenContactModal(false)}>X</StyledCloseButton>
        </StyledModalHeader>
        <StyledModalmain>
          <StyledForm onSubmit={handleSubmit(submit)}>
              <Input
              label = "Nome Completo"
              type= "text"
              {...register("fullName")}
             
              />
              <Input
              label = "Email"
              type= "text"
              {...register("email")}
              
              />
              <Input
              label = "Contato"
              type= "text"
              {...register("phone")}
              />
            <StyledDivButtons>
              <StyledButtonUpdateModal
              buttonSize="lg"
              buttonStyle="primary"
              type="submit"
              >Salvar Alterações</StyledButtonUpdateModal>
              <StyledButtonUpdateModal
              buttonSize="md"
              buttonStyle="negative"
              type="button"
               onClick={deleteAndCloseModal}>Excluir</StyledButtonUpdateModal>
            </StyledDivButtons>

          </StyledForm>
        </StyledModalmain>
      </StyledDivModal>
    </StyledModalContainer>
  )

}