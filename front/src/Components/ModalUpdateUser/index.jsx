import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../providers/UserContext";
import { UpdateUserSchema } from "../Schemas/UpdateUserSchema";
import { Input } from "../Input";

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
    <div role="dialog">
      <div ref={modalRef}>
        <header>
          <button onClick={() => setIsOpen(false)}> X </button>
        </header>
        <main>
          <form onSubmit={handleSubmit(submit)}>
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
              {...register("email", {required: "Email deve ser preenchido"})}
            
            />
            {errors.email && <p>{errors.email.message}</p>}
            <Input
              label = "Contato"
              placeholder = "digite seu telefone"
              type= "text"
              {...register("phone")}
            
            />
            <button>Salvar Alterações</button>
          </form>
        </main>
      </div>
    </div>
  )
}
