import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../providers/UserContext";
import { UpdateUserSchema } from "../Schemas/UpdateUserSchema";
import { Input } from "../Input";
import { StyledCloseButton, StyledDivModal, StyledModalContainer, StyledModalHeader, StyledModalmain } from "../../styles/modal";
import { StyledForm } from "../../styles/form";
import { StyledParagraph, StyledTitleOne } from "../../styles/typography";
import { StyledButton } from "../../styles/buttons";

export const ModalUpdateUser = ({ setIsOpen, user }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors}
  } = useForm();
  const{updateUser} = useContext(UserContext)

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

  const submit = async formData => {
    await updateUser(formData, user.id);
    setIsOpen(false);
    reset();
  };

  return(
    <StyledModalContainer role="dialog">
      <StyledDivModal ref={modalRef}>
        <StyledModalHeader>
          <StyledTitleOne>Alterar seus dados</StyledTitleOne>
          <StyledCloseButton onClick={() => setIsOpen(false)}> X </StyledCloseButton>
        </StyledModalHeader>
        <StyledModalmain>
          <StyledForm onSubmit={handleSubmit(submit)}>
            <Input
              label = "Nome Completo"
              placeholder = "digite seu nome completo"
              type= "text"
              {...register("fullName")}
        
            />
            <Input
              label = "Email"
              placeholder = "digite seu email"
              type= "text"
              {...register("email")}
            />
            {/* {errors.email && <StyledParagraph fontColor="red">{errors.email.message}</StyledParagraph>} */}
            <Input
              label = "Contato"
              placeholder = "digite seu telefone"
              type= "text"
              {...register("phone")}
            
            />
            <Input
              label = "Password"
              placeholder = "digite sua senha"
              type= "text"
              {...register("password")}
            
            />
            <StyledButton
             buttonStyle="primary" buttonSize="lg" type="submit">Salvar Alterações</StyledButton>
          </StyledForm>
        </StyledModalmain>
      </StyledDivModal>
    </StyledModalContainer>
  )
}
