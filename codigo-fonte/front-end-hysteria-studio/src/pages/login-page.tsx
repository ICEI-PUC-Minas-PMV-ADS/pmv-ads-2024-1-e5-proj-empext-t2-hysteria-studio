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
import Notify from "../components/notify";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/auth";
import { useLoginMutation } from "../services/endpoins";

interface LoginPageFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { signIn } = useContext(AuthContext);
  const [notifyErrorMessage, setNotifyErrorMessage] = useState({
    isOpen: false,
    message: "",
  });
  const [login] = useLoginMutation();

  const toggleNotifyErrorMessage = () =>
    setNotifyErrorMessage((state) => ({ ...state, isOpen: !state.isOpen }));

  const formMethods = useForm<LoginPageFormValues>({ mode: "all" });
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = formMethods;

  const onSubmit = handleSubmit(async (values) => {
    try {
      const loginInformation = await login(values).unwrap();
      signIn(loginInformation);
      navigate("/inicio");
      reset();
    } catch (error: any) {
      setNotifyErrorMessage({
        isOpen: true,
        message:
          error.data.message || "Ocorreu um erro no login, tente novamente.",
      });
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
                    {...register("email", {
                      required: "Campo obrigatório",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Email inválido",
                      },
                    })}
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
        isOpen={notifyErrorMessage.isOpen}
        severity="error"
        message={notifyErrorMessage.message}
        onClose={toggleNotifyErrorMessage}
      />
    </>
  );
};

export default LoginPage;
