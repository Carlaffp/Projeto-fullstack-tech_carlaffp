import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../Input";
import { UserContext } from "../../providers/UserContext";
import { LoginSchema } from "../Schemas/LoginSchema";


export const LoginForm = () =>{
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const { loginUser } = useContext(UserContext);

  const submit = async formData => {
    await loginUser(formData, setLoading);
    reset();
  };

  return(
    <div>
      <form onSubmit={handleSubmit(submit)}>
      <Input
          label="Email"
          type="email"
          placeholder="Digite seu email"
          {...register("email")}
          error={errors.email}
          disabled={loading}
        />

        <Input
          label="Senha"
          type= "password"
          placeholder="Digite sua senha"
          {...register("password")}
          error={errors.password}
          disabled={loading}
        />
        <button>{loading? "Entrando..." : "Enviar"}</button>

      </form>
    </div>
  )
}