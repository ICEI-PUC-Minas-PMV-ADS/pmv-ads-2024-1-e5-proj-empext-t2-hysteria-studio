import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Stack,
  TextField,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

interface LoginPageFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const formMethods = useForm<LoginPageFormValues>();
  const navigate = useNavigate();
  const { handleSubmit, register } = formMethods;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    navigate("/inicio");
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
          backgroundColor: "secondary.light",
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
                backgroundColor: "background.paper",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <FormProvider {...formMethods}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoComplete="email"
                  autoFocus
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
                  Entrar
                </LoadingButton>
              </FormProvider>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default LoginPage;
