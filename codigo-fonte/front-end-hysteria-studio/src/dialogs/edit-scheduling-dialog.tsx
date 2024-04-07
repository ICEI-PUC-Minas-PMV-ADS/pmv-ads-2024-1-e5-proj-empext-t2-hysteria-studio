import {
  Button,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SimpleDialog from "../components/simple-dialog";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

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

const services = [
  {
    value: "Corte de cabelo",
    label: "Corte de cabelo",
  },
  {
    value: "Corte de cabelo + barba",
    label: "Corte de cabelo + barba",
  },
  {
    value: "Barba",
    label: "Barba",
  },
  {
    value: "Completo",
    label: "Completo",
  },
];

interface EditSchedulingFormValues {
  service: string;
  date: string;
  time: string;
}

const EditSchedulingDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const formMethods = useForm<EditSchedulingFormValues>();
  const { handleSubmit, register } = formMethods;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const toggleDialog = () => setIsDialogOpen((state) => !state);

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
        actions={[
          <LoadingButton onClick={onSubmit}>Confirmar</LoadingButton>,
          <Button onClick={toggleDialog}>Fechar</Button>,
        ]}
        content={
          <FormProvider {...formMethods}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="service"
              label="Serviço"
              autoComplete="service"
              autoFocus
              select
              {...register("service")}
            >
              {services.map((option) => (
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
              {...register("date")}
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
              {...register("time")}
            >
              {time.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormProvider>
        }
      />
    </>
  );
};

export default EditSchedulingDialog;
