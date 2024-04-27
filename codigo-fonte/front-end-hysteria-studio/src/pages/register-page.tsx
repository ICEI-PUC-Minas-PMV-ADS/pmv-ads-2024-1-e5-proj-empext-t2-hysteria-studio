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
import { useCreateUsuarioMutation } from "../services/endpoins";

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
  const [criarUsuario] = useCreateUsuarioMutation();

  const onSubmit = handleSubmit(async (data) => {

    // O campo abaixo não existe no formulário, porém, é obrigatório. O usuário não deve escolher uma opção, então já está sendo definido que qualquer usuário será comum, e não adm.
    data.flag_admin = 0;

    try {
      await criarUsuario({
        nome: data.nome,
        cpf: data.cpf,
        data_de_nascimento: data.data_de_nascimento,
        telefone: data.telefone,
        endereco: data.endereco,
        email: data.email,
        flag_maior_idade: Number(data.flag_maior_idade),
        responsavel: data.responsavel,
        login: data.login,
        senha: data.senha,
        flag_admin: data.flag_admin,
      });
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
