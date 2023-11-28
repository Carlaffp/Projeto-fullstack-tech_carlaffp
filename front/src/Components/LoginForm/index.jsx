import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../Input";
import { UserContext } from "../../providers/UserContext";
import { LoginSchema } from "../Schemas/LoginSchema";
import {IoMdEye} from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { StyledForm } from "../../styles/form";
import { StyledButton } from "../../styles/buttons";


export const LoginForm = () =>{
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

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

  const handleTogglePassword = () =>{
    setShowPassword(!showPassword)
  }

  return(
    <div>
      <StyledForm onSubmit={handleSubmit(submit)}>
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
        type= {showPassword ? "text" : "password"}
        placeholder="Digite sua senha"
        {...register("password")}
        error={errors.password}
        disabled={loading}
        >
          <button
          className="eyeButton"
          type="button"
          onClick={handleTogglePassword}
          >
            {showPassword ? (
              <IoMdEye size={20} style={{ color: "black" }}/>): (
              <IoMdEyeOff size={20} style={{ color: "black" }}/>)
            }
          </button>
        </Input>
        <StyledButton
        buttonStyle="primary"
        buttonSize="lg"
        fontWeight="md"
        type="submit"
        disabled={loading}
        >
          {loading? "Entrando..." : "Enviar"}
          </StyledButton>

      </StyledForm>
    </div>
  )
}