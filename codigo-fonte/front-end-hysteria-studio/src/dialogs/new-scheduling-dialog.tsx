import {
  Box,
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

interface SchedulingFormValues {
  service: number;
  time: number;
  client?: number;
}

const NewSchedulingDialog = () => {
  const { user, isAdmin } = useContext(AuthContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [otherClientToggle, setOtherClientToggle] = useState(false);
  const [createAgendamento] = useCreateAgendamentoMutation();

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
        id_usuario: Number(values.client) || (user?.id as number),
      }).unwrap();

      toggleDialog();
    } catch {
      console.error("Erro ao criar agendamento");
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
                <Box display="flex" justifyContent="space-between" gap={2}>
                  {otherClientToggle ? (
                    <TextField
                      required
                      margin="normal"
                      type="email"
                      fullWidth
                      id="client"
                      label="Email do cliente"
                      autoComplete="client"
                      {...register("client", {
                        required: "Campo obrigatório",
                        pattern: {
                          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                          message: "Email inválido",
                        },
                      })}
                      error={!!errors.client}
                      helperText={
                        errors.client?.message ? errors.client.message : null
                      }
                      disabled={isSubmitting}
                    />
                  ) : (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="client"
                      label="Email do cliente"
                      autoComplete="client"
                      select
                      disabled={
                        isFetchingUsuarios || isUsuariosError || isSubmitting
                      }
                      {...register("client", { required: "Campo obrigatório" })}
                      error={!!errors.client}
                      helperText={
                        errors.client?.message ? errors.client.message : null
                      }
                    >
                      {usuariosOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}

                  <FormControlLabel
                    control={
                      <Switch
                        onChange={() => {
                          setOtherClientToggle((state) => !state);
                          resetField("client");
                        }}
                      />
                    }
                    label="Outro cliente"
                  />
                </Box>
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
    </>
  );
};

export default NewSchedulingDialog;
