import { Button, IconButton, Tooltip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SimpleDialog from "../components/simple-dialog";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useUpdateAgendamentoStatusMutation } from "../services/endpoins";
import Notify from "../components/notify";

interface UpdateSchedulingDialogProps {
  agendaId: number;
}

const CONFIRMED = 2;

const UpdateSchedulingDialog = ({ agendaId }: UpdateSchedulingDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [notifyUpdateMessage, setNotifyUpdateMessage] = useState<{
    isOpen: boolean;
    message: string;
    severity: "error" | "warning" | "info" | "success";
  }>({
    isOpen: false,
    message: "",
    severity: "success",
  });
  const [updateAgendamento, { isLoading: isUpdateAgendamentoLoading }] =
    useUpdateAgendamentoStatusMutation();

  const toggleDialog = () => setIsDialogOpen((state) => !state);
  const toggleNotifyUpdateMessage = () =>
    setNotifyUpdateMessage((state) => ({ ...state, isOpen: !state.isOpen }));

  const onClick = async () => {
    try {
      await updateAgendamento({ id: agendaId, id_status: CONFIRMED }).unwrap();

      setNotifyUpdateMessage({
        isOpen: true,
        message: "Agendamento confirmado com sucesso.",
        severity: "success",
      });

      toggleDialog();
    } catch (error: any) {
      setNotifyUpdateMessage({
        isOpen: true,
        message:
          error.data.message || "Ocorreu um erro ao confirmar o serviço.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Tooltip title="Confirmar" arrow>
        <IconButton color="success" size="small" onClick={toggleDialog}>
          <CheckCircleIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <SimpleDialog
        title="Confirmar agendamento"
        content="Deseja realmente confirmar o agendamento?"
        isOpen={isDialogOpen}
        toggleDialog={toggleDialog}
        maxWidth="xs"
        actions={[
          <LoadingButton loading={isUpdateAgendamentoLoading} onClick={onClick}>
            Confirmar
          </LoadingButton>,
          <Button onClick={toggleDialog}>Fechar</Button>,
        ]}
      />
      <Notify
        isOpen={notifyUpdateMessage.isOpen}
        severity={notifyUpdateMessage.severity}
        message={notifyUpdateMessage.message}
        onClose={toggleNotifyUpdateMessage}
      />
    </>
  );
};

export default UpdateSchedulingDialog;
