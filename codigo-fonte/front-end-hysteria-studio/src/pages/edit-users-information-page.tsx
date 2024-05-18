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
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/auth";
import {
  EditUsuarioParams,
  useEditUsuarioMutation,
} from "../services/endpoins";
import Notify from "../components/notify";
import { isValidMobilePhone } from "@brazilian-utils/brazilian-utils";

interface EditUsersInformationFormValues {
  name: string;
  birthdate: string;
  telephone: string;
  email: string;
}

const EditUsersInformationPage = () => {
  const { user, signIn } = useContext(AuthContext);
  const [notifyErrorMessage, setNotifyErrorMessage] = useState<{
    isOpen: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    isOpen: false,
    message: "",
    severity: "success",
  });
  const [editUsuario] = useEditUsuarioMutation();

  const toggleNotifyErrorMessage = () =>
    setNotifyErrorMessage((state) => ({ ...state, isOpen: !state.isOpen }));

  const formMethods = useForm<EditUsersInformationFormValues>({
    mode: "all",
    defaultValues: {
      name: user?.nome || "",
      birthdate: user?.data_de_nascimento.slice(0, 10) || "",
      telephone: user?.telefone || "",
      email: user?.email || "",
    },
  });
  const {
    handleSubmit,
    register,
    formState: { isValid, isSubmitting, errors },
  } = formMethods;

  const onSubmit = handleSubmit(async (values) => {
    try {
      const newInfo = await editUsuario({
        ...user,
        nome: values.name,
        data_de_nascimento: values.birthdate,
        telefone: values.telephone,
        email: values.email,
      } as EditUsuarioParams).unwrap();

      signIn(newInfo);

      setNotifyErrorMessage({
        isOpen: true,
        message: "Informações atualizadas com sucesso.",
        severity: "success",
      });
    } catch (error: any) {
      setNotifyErrorMessage({
        isOpen: true,
        message:
          error.data.message || "Ocorreu um erro ao atualizar as informações.",
        severity: "error",
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
                <form onSubmit={onSubmit}>
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                    InputLabelProps={{ shrink: true }}
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
                      validate: (value) =>
                        isValidMobilePhone(value) || "Telefone inválido.",
                    })}
                    error={!!errors.telephone}
                    helperText={
                      errors.telephone?.message
                        ? errors.telephone.message
                        : null
                    }
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                  <LoadingButton
                    fullWidth
                    type="submit"
                    disabled={!isValid}
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Salvar
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
      <Notify
        isOpen={notifyErrorMessage.isOpen}
        severity={notifyErrorMessage.severity}
        message={notifyErrorMessage.message}
        onClose={toggleNotifyErrorMessage}
      />
    </>
  );
};

export default EditUsersInformationPage;
