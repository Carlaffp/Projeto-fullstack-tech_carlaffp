import { useForm } from "react-hook-form"
 import {zodResolver} from "@hookform/resolvers/zod"
import { RegisterSchema } from "../Schemas/RegisterSchema"
import { useContext } from "react"
import { UserContext } from "../../providers/UserContext"
import { Input } from "../Input"
import { api } from "../../services/api"

export const CreateUserForm = () =>{
  const {register,handleSubmit,reset, formState: {errors} } = useForm({
    resolver: zodResolver(RegisterSchema)
  })

  const {createUser} = useContext(UserContext)

  const submit = async formData =>{
    console.log("clicou")
    await createUser(formData)
    reset()
  }
  
  return(
    <div>
      <form onSubmit={handleSubmit(submit)}>
       <Input
       label = "Nome Completo"
       placeholder = "digite seu nome completo"
       type= "text"
       {...register("fullName")}
       error={errors.fullName}
       />
       <Input
       label = "Email"
       placeholder = "digite seu email"
       type= "text"
       {...register("email")}
       error={errors.email}
       />
       <Input
       label = "Senha"
       placeholder = "digite sea senha"
       type= "password"
       {...register("password")}
       error={errors.password}
       />
       <Input
       label = "Confirmar Senha"
       placeholder = "confirme sua senha"
       type= "password"
       {...register("confirm")}
       error={errors.password}
       />
       <Input
       label = "Contato"
       placeholder = "digite seu telefone"
       type= "text"
       {...register("phone")}
       error={errors.phone}
       />
       <button>Cadastrar</button>
      </form>
    </div>
  )
}