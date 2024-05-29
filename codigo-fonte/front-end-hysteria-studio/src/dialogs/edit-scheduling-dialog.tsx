import {
  Button,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SimpleDialog from "../components/simple-dialog";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import {
  GetAgendamentosResult,
  useEditAgendamentoMutation,
  useGetHorariosQuery,
  useGetServicosQuery,
} from "../services/endpoins";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import Notify from "../components/notify";

interface EditSchedulingFormValues {
  service: string;
  time: string;
}

interface EditSchedulingDialogProps {
  data: GetAgendamentosResult;
}

const EditSchedulingDialog = ({ data }: EditSchedulingDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [notifyEditMessage, setNotifyEditMessage] = useState<{
    isOpen: boolean;
    message: string;
    severity: "error" | "warning" | "info" | "success";
  }>({
    isOpen: false,
    message: "",
    severity: "success",
  });
  const [editAgendamento] = useEditAgendamentoMutation();

  const toggleNotifyEditMessage = () =>
    setNotifyEditMessage((state) => ({ ...state, isOpen: !state.isOpen }));

  const formMethods = useForm<EditSchedulingFormValues>({ mode: "all" });
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = formMethods;

  const toggleDialog = () => {
    setIsDialogOpen((state) => !state);
    reset();
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      await editAgendamento({
        id: data.id_agendamento,
        id_horario: Number(values.time),
        id_servico: Number(values.service),
        id_usuario: Number(data.usuario.id),
      }).unwrap();

      toggleDialog();
      setNotifyEditMessage({
        isOpen: true,
        message: "Serviço atualizado com sucesso.",
        severity: "success",
      });
    } catch (error: any) {
      setNotifyEditMessage({
        isOpen: true,
        message:
          error.data.message || "Ocorreu um erro ao atualizar o serviço.",
        severity: "error",
      });
    }
  });

  const {
    data: servicos,
    isFetching: isFetchingServicos,
    isError: isServcosError,
  } = useGetServicosQuery(undefined, {
    skip: !isDialogOpen,
  });

  const {
    data: horarios,
    isFetching: isFetchingHorarios,
    isError: isHorariosError,
  } = useGetHorariosQuery();

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
      <Tooltip title="Editar" arrow>
        <IconButton color="primary" size="small" onClick={toggleDialog}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <SimpleDialog
        title="Editar agendamento"
        isOpen={isDialogOpen}
        toggleDialog={toggleDialog}
        actions={[<Button onClick={toggleDialog}>Fechar</Button>]}
        content={
          <FormProvider {...formMethods}>
            <form noValidate onSubmit={onSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="service"
                label="Serviço"
                autoComplete="service"
                select
                disabled={isFetchingServicos || isServcosError || isSubmitting}
                {...register("service", { required: "Campo obrigatório" })}
                error={!!errors.service}
                helperText={
                  errors.service?.message ? errors.service.message : null
                }
                defaultValue={data.servico.id}
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
                defaultValue={data.horario_agendamento.id}
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
        isOpen={notifyEditMessage.isOpen}
        severity={notifyEditMessage.severity}
        message={notifyEditMessage.message}
        onClose={toggleNotifyEditMessage}
      />
    </>
  );
};

export default EditSchedulingDialog;
