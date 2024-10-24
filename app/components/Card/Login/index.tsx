"use client";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const LoginCardStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffff;
  border-radius: 8px;
  height: 50%;
  width: 25%;
  color: white;
  border: 1px solid #ccc;
`;

interface LoginFormInputs {
  email: string;
  password: string;
}

const CardLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmitLogin = (values: LoginFormInputs) => {
    setLoading(true);
    const { email, password } = values;

    if (email === "lucas@bixtec.com" && password === "senha123") {
      const authToken = "1Abx@C41xdas4#";

      localStorage.setItem("auth_token_bix", authToken);
      toast.success("Login efetuado com sucesso");
      router.push("/dashboard/home");
    } else {
      toast.error("Usuário ou senha inválidos");
    }
    setLoading(false);
  };

  return (
    <LoginCardStyled>
      <form
        onSubmit={handleSubmit(onSubmitLogin)}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "16px",
          padding: "24px",
        }}
      >
        <Stack direction={"column"} textAlign={"center"}>
          <Typography
            color="primary"
            variant="h5"
            fontWeight={700}
            style={{ fontFamily: "Poppins" }}
          >
            Login
          </Typography>
          <Typography
            color="primary"
            variant="subtitle2"
            style={{ fontFamily: "Poppins" }}
          >
            entre com seu usuário senha
          </Typography>
        </Stack>
        <TextField
          type="email"
          size="small"
          variant="outlined"
          label="E-mail"
          {...register("email", { required: "A senha é obrigatória" })}
        />
        <TextField
          type={showPassword ? "text" : "password"}
          size="small"
          variant="outlined"
          label="Senha"
          {...register("password", { required: true })}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <BsEye /> : <BsEyeSlash />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <LoadingButton
          loading={loading}
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          style={{
            marginTop: "8px",
            fontSize: "16px",
            textTransform: "capitalize",
            fontFamily: "Poppins",
            fontWeight: 700,
          }}
        >
          Entrar
        </LoadingButton>
      </form>
    </LoginCardStyled>
  );
};

export default CardLogin;
