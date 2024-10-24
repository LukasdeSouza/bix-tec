"use client";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { NextResponse } from "next/server";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { serialize } from "cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginCard = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 8px;
  height: 60%;
  width: 25%;
  color: white;
`;

interface LoginFormInputs {
  email: string;
  password: string;
}

const CardLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmitLogin = (values: LoginFormInputs) => {
    console.log(values);
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
    <LoginCard>
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
          <Typography color="primary" variant="h5" fontWeight={700}>
            Login
          </Typography>
          <Typography color="primary" variant="subtitle2">
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
          type="password"
          size="small"
          variant="outlined"
          label="Senha"
          {...register("password", { required: true })}
        />
        <LoadingButton
          loading={loading}
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          style={{ marginTop: "8px" }}
        >
          Entrar
        </LoadingButton>
      </form>
    </LoginCard>
  );
};

export default CardLogin;
