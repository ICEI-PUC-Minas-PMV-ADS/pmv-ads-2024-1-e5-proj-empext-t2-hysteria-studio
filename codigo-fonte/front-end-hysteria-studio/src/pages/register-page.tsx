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

interface RegisterPageFormValues {
  email: string;
  password: string;
  name: string;
}

const RegisterPage = () => {
  const formMethods = useForm<RegisterPageFormValues>();
  const { handleSubmit, register } = formMethods;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Nome completo"
                  autoComplete="name"
                  autoFocus
                  {...register("name")}
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
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...register("password")}
                />

                <LoadingButton
                  onClick={onSubmit}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Cadastrar
                </LoadingButton>
              </FormProvider>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default RegisterPage;
