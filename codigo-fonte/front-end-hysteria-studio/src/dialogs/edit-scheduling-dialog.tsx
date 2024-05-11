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
  useGetServicosQuery,
} from "../services/endpoins";

const dates = [
  {
    value: "2024-04-01",
    label: "01/04/2024",
  },
  {
    value: "2024-04-02",
    label: "02/04/2024",
  },
  {
    value: "2024-04-03",
    label: "03/04/2024",
  },
  {
    value: "2024-04-04",
    label: "04/04/2024",
  },
];

const time = [
  {
    value: "10:00",
    label: "10:00",
  },
  {
    value: "11:00",
    label: "11:00",
  },
  {
    value: "12:00",
    label: "12:00",
  },
  {
    value: "13:00",
    label: "13:00",
  },
];

interface EditSchedulingFormValues {
  service: string;
  date: string;
  time: string;
}

interface EditSchedulingDialogProps {
  data: GetAgendamentosResult;
}

const EditSchedulingDialog = ({ data }: EditSchedulingDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const formMethods = useForm<EditSchedulingFormValues>({ mode: "all" });
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
  } = formMethods;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const toggleDialog = () => setIsDialogOpen((state) => !state);

  const {
    data: servicos,
    isFetching: isFetchingServicos,
    isError: isServcosError,
  } = useGetServicosQuery(undefined, {
    skip: !isDialogOpen,
  });

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
                disabled={isFetchingServicos || isServcosError}
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
                id="date"
                label="Data"
                autoComplete="date"
                select
                {...register("date", { required: "Campo obrigatório" })}
                error={!!errors.date}
                helperText={errors.date?.message ? errors.date.message : null}
              >
                {dates.map((option) => (
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
                label="Hora"
                autoComplete="time"
                select
                {...register("time", { required: "Campo obrigatório" })}
                error={!!errors.time}
                helperText={errors.time?.message ? errors.time.message : null}
              >
                {time.map((option) => (
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

export default EditSchedulingDialog;
