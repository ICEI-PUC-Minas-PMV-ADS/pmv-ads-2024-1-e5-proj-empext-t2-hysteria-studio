import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Divider,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface EditUsersInformationFormValues {
  name: string;
  birthdate: string;
  telephone: string;
  email: string;
}

const EditUsersInformationPage = () => {
  const formMethods = useForm<EditUsersInformationFormValues>({
    mode: "all",
  });
  const {
    handleSubmit,
    register,
    formState: { isValid, isSubmitting, errors },
  } = formMethods;

  return (
    <>
      <CssBaseline />
      <Box
        id="hero"
        sx={{
          width: "100%",
          backgroundSize: "100% 20%",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 15 },
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
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <AccountCircleIcon />
              </Avatar>
              <FormProvider {...formMethods}>
                <form onSubmit={handleSubmit(() => {})}>
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="name"
                    label="Nome"
                    autoComplete="name"
                    {...register("name", { required: "Campo obrigatório" })}
                    error={!!errors.name}
                    helperText={
                      errors.name?.message ? errors.name.message : null
                    }
                  />
                  <TextField
                    required
                    margin="normal"
                    type="date"
                    fullWidth
                    id="birthdate"
                    label="Data de nascimento"
                    autoComplete="birthdate"
                    {...register("birthdate", {
                      required: "Campo obrigatório",
                    })}
                    error={!!errors.birthdate}
                    helperText={
                      errors.birthdate?.message
                        ? errors.birthdate.message
                        : null
                    }
                  />
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="telephone"
                    label="Telefone"
                    autoComplete="telephone"
                    {...register("telephone", {
                      required: "Campo obrigatório",
                    })}
                    error={!!errors.telephone}
                    helperText={
                      errors.telephone?.message
                        ? errors.telephone.message
                        : null
                    }
                  />
                  <TextField
                    required
                    margin="normal"
                    type="email"
                    fullWidth
                    id="email"
                    label="Email"
                    autoComplete="email"
                    {...register("email", {
                      required: "Campo obrigatório",
                      pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        message: "Email inválido",
                      },
                    })}
                    error={!!errors.email}
                    helperText={
                      errors.email?.message ? errors.email.message : null
                    }
                  />
                  <LoadingButton
                    fullWidth
                    type="submit"
                    disabled={!isValid}
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Criar serviço
                  </LoadingButton>
                </form>
              </FormProvider>
              <Box margin={4} width="100%">
                <Divider />
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default EditUsersInformationPage;
