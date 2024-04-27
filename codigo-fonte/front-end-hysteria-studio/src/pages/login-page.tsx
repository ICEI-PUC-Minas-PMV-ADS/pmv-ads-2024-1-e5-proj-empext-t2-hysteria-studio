import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/endpoins";
import Notify from "../components/notify";
import { useState } from "react";

interface LoginPageFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [isNotifyErrorMessageOpen, setIsNotifyErrorMessageOpen] =
    useState(false);
  const [login] = useLoginMutation();

  const toggleNotifyErrorMessage = () =>
    setIsNotifyErrorMessageOpen((state) => !state);

  const formMethods = useForm<LoginPageFormValues>();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = formMethods;

  const onSubmit = handleSubmit(async (values) => {
    try {
      await login(values).unwrap();

      navigate("/inicio");
      reset();
    } catch {
      setIsNotifyErrorMessageOpen(true);
    }
  });

  return (
    <>
      <CssBaseline />
      <Box
        id="hero"
        sx={{
          width: "100%",
          backgroundSize: "100% 20%",
          backgroundRepeat: "no-repeat",
          backgroundColor: "secondary.main",
          height: "100vh",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 20 },
            pb: { xs: 8 },
          }}
        >
          <Stack
            spacing={2}
            useFlexGap
            sx={{ width: { xs: "100%", sm: "60%" } }}
          >
            <Box
              sx={{
                p: 5,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              component={Paper}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <FormProvider {...formMethods}>
                <form noValidate onSubmit={onSubmit}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    autoComplete="email"
                    autoFocus
                    {...register("email", { required: "Campo obrigatório" })}
                    error={!!errors.email}
                    helperText={
                      errors.email?.message ? errors.email.message : null
                    }
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...register("password", { required: "Campo obrigatório" })}
                    error={!!errors.password}
                    helperText={
                      errors.password?.message ? errors.password.message : null
                    }
                  />

                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    loading={isSubmitting}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Entrar
                  </LoadingButton>
                </form>
              </FormProvider>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Notify
        isOpen={isNotifyErrorMessageOpen}
        severity="error"
        message="Ocorreu um erro ao fazer login. Tente novamente."
        onClose={toggleNotifyErrorMessage}
      />
    </>
  );
};

export default LoginPage;
