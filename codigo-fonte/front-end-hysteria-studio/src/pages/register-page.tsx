import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  useCreateUsuarioMutation,
  useLoginMutation,
} from "../services/endpoins";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import { useContext, useState } from "react";
import Notify from "../components/notify";
import {
  isValidCPF,
  isValidMobilePhone,
  onlyNumbers,
} from "@brazilian-utils/brazilian-utils";

interface RegisterPageFormValues {
  nome: string;
  cpf: string;
  data_de_nascimento: string;
  telefone: string;
  email: string;
  senha: string;
}

const RegisterPage = () => {
  const { signIn } = useContext(AuthContext);
  const [notifyErrorMessage, setNotifyErrorMessage] = useState({
    isOpen: false,
    message: "",
  });
  const navigate = useNavigate();
  const [criarUsuario] = useCreateUsuarioMutation();
  const [login] = useLoginMutation();

  const toggleNotifyErrorMessage = () =>
    setNotifyErrorMessage((state) => ({ ...state, isOpen: !state.isOpen }));

  const formMethods = useForm<RegisterPageFormValues>({ mode: "all" });
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    reset,
  } = formMethods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const userInformation = await criarUsuario({
        nome: data.nome,
        cpf: onlyNumbers(data.cpf),
        data_de_nascimento: data.data_de_nascimento,
        telefone: onlyNumbers(data.telefone),
        email: data.email,
        senha: data.senha,
        flag_admin: false,
      }).unwrap();

      const loginInformation = await login({
        email: userInformation.email,
        senha: userInformation.senha,
      }).unwrap();

      signIn(loginInformation);
      navigate("/inicio");
      reset();
    } catch (error: any) {
      setNotifyErrorMessage({
        isOpen: true,
        message:
          error.data.message || "Ocorreu um erro no cadastro, tente novamente.",
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
            sx={{ width: { xs: "100%", sm: "80%" } }}
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
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="none"
                        required
                        fullWidth
                        id="nome"
                        label="Nome completo"
                        autoComplete="nome"
                        autoFocus
                        {...register("nome", { required: "Campo obrigatório" })}
                        error={!!errors.nome}
                        helperText={
                          errors.nome?.message ? errors.nome.message : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="none"
                        required
                        fullWidth
                        id="cpf"
                        label="CPF"
                        autoComplete="cpf"
                        {...register("cpf", {
                          required: "Campo obrigatório",
                          validate: (value) =>
                            isValidCPF(onlyNumbers(value)) || "CPF inválido.",
                        })}
                        error={!!errors.cpf}
                        helperText={
                          errors.cpf?.message ? errors.cpf.message : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="none"
                        required
                        fullWidth
                        id="telefone"
                        label="Telefone"
                        autoComplete="telefone"
                        {...register("telefone", {
                          required: "Campo obrigatório",
                          validate: (value) =>
                            isValidMobilePhone(value) || "Telefone inválido.",
                        })}
                        error={!!errors.telefone}
                        helperText={
                          errors.telefone?.message
                            ? errors.telefone.message
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="none"
                        required
                        fullWidth
                        id="data_de_nascimento"
                        label="Data de Nascimento"
                        type="date"
                        autoComplete="data_de_nascimento"
                        {...register("data_de_nascimento", {
                          required: "Campo obrigatório",
                        })}
                        error={!!errors.data_de_nascimento}
                        helperText={
                          errors.data_de_nascimento?.message
                            ? errors.data_de_nascimento.message
                            : null
                        }
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="none"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        autoComplete="email"
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="none"
                        required
                        fullWidth
                        label="Senha"
                        type="password"
                        id="senha"
                        autoComplete="current-password"
                        {...register("senha", {
                          required: "Campo obrigatório",
                        })}
                        error={!!errors.senha}
                        helperText={
                          errors.senha?.message ? errors.senha.message : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        loading={isSubmitting}
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Cadastrar
                      </LoadingButton>
                    </Grid>
                  </Grid>
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

export default RegisterPage;
