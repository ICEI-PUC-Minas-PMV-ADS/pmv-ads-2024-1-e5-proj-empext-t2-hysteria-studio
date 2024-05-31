import { Button, Fab, MenuItem, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import SimpleDialog from "../components/simple-dialog";
import { LoadingButton } from "@mui/lab";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateAgendamentoMutation, useGetServicosQuery, useGetPedidosQuery } from "../services/endpoins";

interface SchedulingFormValues {
  service: string;
  date: string;
  time: string;
}
// const dates = [
//   {
//     value: "2024-04-01",
//     label: "01/04/2024",
//   },
//   {
//     value: "2024-04-02",
//     label: "02/04/2024",
//   },
//   {
//     value: "2024-04-03",
//     label: "03/04/2024",
//   },
//   {
//     value: "2024-04-04",
//     label: "04/04/2024",
//   },
// ];

// const times = [
//   {
//     value: "10:00",
//     label: "10:00",
//   },
//   {
//     value: "11:00",
//     label: "11:00",
//   },
//   {
//     value: "12:00",
//     label: "12:00",
//   },
//   {
//     value: "13:00",
//     label: "13:00",
//   },
// ];

const NewSchedulingDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const formMethods = useForm<SchedulingFormValues>();
  const { handleSubmit, register } = formMethods;

  const { data: servicos, isLoading: isLoadingServicos, error: errorServicos } = useGetServicosQuery();
  const { data: pedidos, isLoading: isLoadingPedidos, error: errorPedidos } = useGetPedidosQuery();

  const [createAgendamento] = useCreateAgendamentoMutation();

  const onSubmit = handleSubmit(async (data) => {
    const { service, date, time } = data;
    const id_usuario = "1"; 
    const id_horario = "2"; 
    const data_hora_atendimento = `${date}T${time}:00`;

    try {
      await createAgendamento({
        id_usuario,
        id_servico: service,
        data_hora_atendimento,
        id_horario,
      }).unwrap();
      toggleDialog();
    } catch (error) {
      console.error("Erro ao criar agendamento", error);
    }
  });

  const toggleDialog = () => setIsDialogOpen((state) => !state);

  if (isLoadingServicos || isLoadingPedidos) {
    return <div>Carregando...</div>;
  }

  if (errorServicos || errorPedidos) {
    return <div>Erro!</div>;
  }

  const availableTimes = pedidos?.map(pedido => ({
    value: pedido.horario_agendamento.id,
    label: pedido.horario_agendamento.horario_disponivel,
  })) || [];

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
              {servicos?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.nome}
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
              {availableTimes.map((option) => (
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
              {availableTimes.map((option) => (
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

export default NewSchedulingDialog;
