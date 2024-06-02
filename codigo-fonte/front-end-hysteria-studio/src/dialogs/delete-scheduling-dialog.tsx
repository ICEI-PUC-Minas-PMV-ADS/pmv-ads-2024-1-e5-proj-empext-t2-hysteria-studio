import { Button, IconButton, Tooltip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SimpleDialog from "../components/simple-dialog";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useUpdateAgendamentoStatusMutation } from "../services/endpoins";
import Notify from "../components/notify";

interface DeleteAgendaDialogProps {
  agendaId: number;
}

const CANCELED = 4;

const DeleteSchedulingDialog = ({ agendaId }: DeleteAgendaDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [notifyDeleteMessage, setNotifyDeleteMessage] = useState<{
    isOpen: boolean;
    message: string;
    severity: "error" | "warning" | "info" | "success";
  }>({
    isOpen: false,
    message: "",
    severity: "success",
  });
  const [excluirAgenda, { isLoading: isExcluirAgendaLoading }] =
    useUpdateAgendamentoStatusMutation();

  const toggleDialog = () => setIsDialogOpen((state) => !state);
  const toggleNotifyDeleteMessage = () =>
    setNotifyDeleteMessage((state) => ({ ...state, isOpen: !state.isOpen }));

  const onClick = async () => {
    try {
      await excluirAgenda({ id: agendaId, id_status: CANCELED }).unwrap();

      setNotifyDeleteMessage({
        isOpen: true,
        message: "Agendamento cancelado com sucesso.",
        severity: "success",
      });

      toggleDialog();
    } catch (error: any) {
      setNotifyDeleteMessage({
        isOpen: true,
        message: error.data.message || "Ocorreu um erro ao cancelar o serviço.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Tooltip title="Cancelar" arrow>
        <IconButton color="error" size="small" onClick={toggleDialog}>
          <CancelIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <SimpleDialog
        title="Cancelar agendamento"
        content="Deseja realmente cancelar o agendamento?"
        isOpen={isDialogOpen}
        toggleDialog={toggleDialog}
        maxWidth="xs"
        actions={[
          <LoadingButton loading={isExcluirAgendaLoading} onClick={onClick}>
            Confirmar
          </LoadingButton>,
          <Button onClick={toggleDialog}>Fechar</Button>,
        ]}
      />
      <Notify
        isOpen={notifyDeleteMessage.isOpen}
        severity={notifyDeleteMessage.severity}
        message={notifyDeleteMessage.message}
        onClose={toggleNotifyDeleteMessage}
      />
    </>
  );
};

export default DeleteSchedulingDialog;
