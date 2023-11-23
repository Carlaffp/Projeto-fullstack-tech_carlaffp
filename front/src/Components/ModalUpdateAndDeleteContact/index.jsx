import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../Input";
import { ContactContext } from "../../providers/ContactContext";



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
        setIsOpen(false);
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
    <div role="dialog">
      <div ref={modalRef}>
        <header>
          <h2>Contato: {contact.fullName}</h2>
          <button onClick={() => setIsOpenContactModal(false)}>X</button>
        </header>
        <main>
          <form onSubmit={handleSubmit(submit)}>
            <div>
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
            </div>

            <div>
              <button>Salvar Alterações</button>
              <button onClick={deleteAndCloseModal}>Excluir</button>
            </div>

          </form>
        </main>
      </div>
    </div>
  )

}