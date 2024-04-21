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
import { apiFetch } from "../services/config";
import { DarkModeSharp } from "@mui/icons-material";

interface RegisterPageFormValues {
  nome: string;
  cpf: string;
  data_de_nascimento: Date;
  telefone: string;
  endereco: string;
  email: string;
  flag_maior_idade: number;
  responsavel: string;
  login: string;
  senha: string;
  flag_admin: number;
}

const RegisterPage = () => {
  const formMethods = useForm<RegisterPageFormValues>();
  const { handleSubmit, register } = formMethods;

  const onSubmit = handleSubmit(async (data) => {

    // Converter o valor de data.flag_maior_idade para um número
    const flagMaiorIdade = parseInt(String(data.flag_maior_idade));
    // Verificar se flagMaiorIdade é um número válido
    if (isNaN(flagMaiorIdade)) {
      console.error("O valor de flag_maior_idade não é um número válido.");
      return; // Se não for um número, pare aqui e não envie para a API
    }

    data.flag_maior_idade = flagMaiorIdade; // Definir o valor corrigido de flag_maior_idade
    data.flag_admin = 0;

    try {
      await apiFetch.post("/usuario", data);
      console.log("Usuário criado com sucesso!");
    } catch (error) {
      //console.log(error);
      console.error("Erro ao criar usuário:", error);
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
                <form onSubmit={onSubmit}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nome"
                    label="Nome completo"
                    autoComplete="nome"
                    autoFocus
                    {...register("nome")}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="cpf"
                    label="CPF (apenas números)"
                    autoComplete="cpf"
                    {...register("cpf")}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="data_de_nascimento"
                    label="Data de Nascimento"
                    type="date"
                    autoComplete="data_de_nascimento"
                    {...register("data_de_nascimento")}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="telefone"
                    label="Telefone (apenas números)"
                    autoComplete="telefone"
                    {...register("telefone")}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="endereco"
                    label="Endereço Completo"
                    autoComplete="endereco"
                    {...register("endereco")}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    autoComplete="email"
                    {...register("email")}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="flag_maior_idade"
                    type="number"
                    //inputMode="numeric"
                    label="Idade"
                    autoComplete="flag_maior_idade"
                    {...register("flag_maior_idade")}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="responsavel"
                    label="Responsável"
                    autoComplete="responsavel"
                    {...register("responsavel")}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="login"
                    label="Login"
                    autoComplete="login"
                    {...register("login")}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Senha"
                    type="password"
                    id="senha"
                    autoComplete="current-password"
                    {...register("senha")}
                  />
                  {/* <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="hidden"
                    id="flag_admin"
                    defaultValue={0}
                    //value="0"
                    //label=""
                    inputMode="numeric"
                    autoComplete="flag_admin"
                    {...register("flag_admin")}
                  /> */}

                  <LoadingButton
                    onClick={onSubmit}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Cadastrar
                  </LoadingButton>
                </form>
              </FormProvider>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default RegisterPage;
