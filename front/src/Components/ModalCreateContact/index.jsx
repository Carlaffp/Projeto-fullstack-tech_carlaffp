import { useContext, useEffect, useRef } from "react";
import { CreateContactSchema } from "../Schemas/CreateContactSchema";
import { ContactContext } from "../../providers/ContactContext";
import { Input } from "../Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyledTitleOne } from "../../styles/typography";
import { StyledForm } from "../../styles/form";
import { StyledButton } from "../../styles/buttons";
import { StyledCloseButton, StyledDivModal, StyledModalContainer, StyledModalHeader, StyledModalmain } from "../../styles/modal";


export const ModalCreateContact = ({setIsOpen}) =>{
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateContactSchema),
  });

  const {createContact} = useContext(ContactContext)

  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutClick = event => {
      if (!modalRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutClick);
    return () => {
      window.removeEventListener("mousedown", handleOutClick);
    };
  }, []);

  const submit = async (formData) =>{
    await createContact(formData)
    setIsOpen(false)
    reset()
  }

  return(
    <StyledModalContainer role="dialog">
      <StyledDivModal ref={modalRef}>
        <StyledModalHeader>
          <div>

          <StyledTitleOne fontSize="sm">Cadastrar Contato</StyledTitleOne>
          </div>
          <div>

          <StyledCloseButton onClick={() => setIsOpen(false)}>X</StyledCloseButton>
          </div>
        </StyledModalHeader>
        <StyledModalmain>
          <StyledForm onSubmit={handleSubmit(submit)}>
            <Input
              label = "Nome Completo"
              placeholder = "digite o nome completo"
              type= "text"
              {...register("fullName")}
              error={errors.fullName}
            />
            <Input
              label = "Email"
              placeholder = "digite o email"
              type= "text"
              {...register("email")}
              error={errors.email}
            />
            <Input
              label = "Contato"
              placeholder = "digite o telefone"
              type= "text"
              {...register("phone")}
              error={errors.phone}
            />
            <StyledButton buttonStyle="primary" buttonSize="lg" type="submit">Cadastrar</StyledButton>
          </StyledForm>
        </StyledModalmain>

      </StyledDivModal>
    </StyledModalContainer>
  )

}