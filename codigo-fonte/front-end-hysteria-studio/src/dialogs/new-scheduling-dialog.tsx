import {
  Button,
  Fab,
  FormControlLabel,
  MenuItem,
  Switch,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useMemo, useState } from "react";
import SimpleDialog from "../components/simple-dialog";
import { LoadingButton } from "@mui/lab";
import { FormProvider, useForm } from "react-hook-form";
import {
  useCreateAgendamentoMutation,
  useGetHorariosQuery,
  useGetServicosQuery,
  useGetUsuariosListQuery,
} from "../services/endpoins";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { AuthContext } from "../contexts/auth";
import Notify from "../components/notify";

interface SchedulingFormValues {
  service: number;
  time: number;
  email?: string;
  name?: string;
  id?: number;
}

const NewSchedulingDialog = () => {
  const { isAdmin } = useContext(AuthContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [otherClientToggle, setOtherClientToggle] = useState(false);
  const [notifyCreateMessage, setNotifyCreateMessage] = useState<{
    isOpen: boolean;
    message: string;
    severity: "error" | "warning" | "info" | "success";
  }>({
    isOpen: false,
    message: "",
    severity: "success",
  });
  const [createAgendamento] = useCreateAgendamentoMutation();

  const toggleNotifyCreateMessage = () =>
    setNotifyCreateMessage((state) => ({ ...state, isOpen: !state.isOpen }));

  const formMethods = useForm<SchedulingFormValues>();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, isValid, errors },
    reset,
    resetField,
  } = formMethods;

  const toggleDialog = () => {
    setIsDialogOpen((state) => !state);
    setOtherClientToggle(false);
    reset();
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      await createAgendamento({
        id_horario: Number(values.time),
        id_servico: Number(values.service),
        id_usuario: Number(values.id),
        nome: values.name,
        email: values.email,
      }).unwrap();

      toggleDialog();
      setNotifyCreateMessage({
        isOpen: true,
        message: "Serviço criado com sucesso.",
        severity: "success",
      });
    } catch (error: any) {
      setNotifyCreateMessage({
        isOpen: true,
        message: error.data.message || "Ocorreu um erro ao criar o serviço.",
        severity: "error",
      });
    }
  });

  const {
    data: usuarios,
    isFetching: isFetchingUsuarios,
    isError: isUsuariosError,
  } = useGetUsuariosListQuery(undefined, {
    skip: !isDialogOpen,
    selectFromResult: (result) => ({
      ...result,
      data: result.data?.filter((usuario) => !usuario.flag_admin),
    }),
  });

  const {
    data: servicos,
    isFetching: isFetchingServicos,
    isError: isServicosError,
  } = useGetServicosQuery(undefined, {
    skip: !isDialogOpen,
  });

  const {
    data: horarios,
    isFetching: isFetchingHorarios,
    isError: isHorariosError,
  } = useGetHorariosQuery(undefined, {
    skip: !isDialogOpen,
  });

  const usuariosOptions = useMemo(() => {
    if (usuarios) {
      return usuarios?.map((usuario) => ({
        value: usuario.id,
        label: usuario.email,
      }));
    } else {
      return [];
    }
  }, [usuarios]);

  const horariosOptions = useMemo(() => {
    if (horarios) {
      return horarios?.map((horario) => ({
        value: horario.id,
        label: format(
          new Date(horario.horario_disponivel),
          "EEEE dd/MM/yyyy HH:mm",
          {
            locale: ptBR,
          }
        ),
      }));
    } else {
      return [];
    }
  }, [horarios]);

  const serviceOptions = useMemo(() => {
    if (servicos) {
      return servicos?.map((servico) => ({
        value: servico.id,
        label: servico.nome,
      }));
    } else {
      return [];
    }
  }, [servicos]);

  return (
    <>
      <Fab
        color="primary"
        sx={{
          margin: 0,
          top: "auto",
          right: 20,
          bottom: 20,
          left: "auto",
          position: "fixed",
        }}
        onClick={toggleDialog}
      >
        <AddIcon />
      </Fab>
      <SimpleDialog
        title="Novo agendamento"
        isOpen={isDialogOpen}
        toggleDialog={toggleDialog}
        actions={[<Button onClick={toggleDialog}>Fechar</Button>]}
        content={
          <FormProvider {...formMethods}>
            <form noValidate onSubmit={onSubmit}>
              {isAdmin && (
                <>
                  <FormControlLabel
                    control={
                      <Switch
                        onChange={() => {
                          setOtherClientToggle((state) => !state);
                          resetField("id");
                        }}
                      />
                    }
                    label="Deseja criar agendamento para cliente não cadastrado?"
                  />
                  {otherClientToggle ? (
                    <>
                      <TextField
                        required
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Nome"
                        autoComplete="name"
                        {...register("name", {
                          required: "Campo obrigatório",
                        })}
                        error={!!errors.name}
                        helperText={
                          errors.name?.message ? errors.name.message : null
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
                    </>
                  ) : (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="id"
                      label="Email do cliente"
                      autoComplete="client"
                      select
                      disabled={
                        isFetchingUsuarios || isUsuariosError || isSubmitting
                      }
                      {...register("id", {
                        required: "Campo obrigatório",
                      })}
                      error={!!errors.id}
                      helperText={errors.id?.message ? errors.id.message : null}
                    >
                      {usuariosOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                </>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="service"
                label="Serviço"
                autoComplete="service"
                select
                disabled={isFetchingServicos || isServicosError || isSubmitting}
                {...register("service", { required: "Campo obrigatório" })}
                error={!!errors.service}
                helperText={
                  errors.service?.message ? errors.service.message : null
                }
              >
                {serviceOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                margin="normal"
                required
                fullWidth
                id="time"
                label="Data e hora"
                autoComplete="time"
                select
                disabled={isFetchingHorarios || isHorariosError || isSubmitting}
                {...register("time", { required: "Campo obrigatório" })}
                error={!!errors.time}
                helperText={errors.time?.message ? errors.time.message : null}
              >
                {horariosOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <LoadingButton
                fullWidth
                variant="contained"
                type="submit"
                disabled={!isValid}
                loading={isSubmitting}
              >
                Confirmar
              </LoadingButton>
            </form>
          </FormProvider>
        }
      />
      <Notify
        isOpen={notifyCreateMessage.isOpen}
        severity={notifyCreateMessage.severity}
        message={notifyCreateMessage.message}
        onClose={toggleNotifyCreateMessage}
      />
    </>
  );
};

export default NewSchedulingDialog;
