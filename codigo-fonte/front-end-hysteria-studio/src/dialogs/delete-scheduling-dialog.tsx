import { Button, IconButton, Tooltip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SimpleDialog from "../components/simple-dialog";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useDeleteAgendaMutation } from "../services/endpoins";

interface DeleteAgendaDialogProps{
  agendaId: string;
}

const DeleteSchedulingDialog = ({ agendaId } : DeleteAgendaDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [excluirAgenda, {isLoading: isExcluirAgendaLoading}] = 
  useDeleteAgendaMutation();
  const toggleDialog = () => setIsDialogOpen((state) => !state);

  const onClick = async () => {
    try {
      await excluirAgenda(agendaId).unwrap();
      toggleDialog();
    } catch {
      console.error("Erro ao excluir agendamento");
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
          <LoadingButton loading= {isExcluirAgendaLoading} onClick={onClick}>Confirmar</LoadingButton>,
          <Button onClick={toggleDialog}>Fechar</Button>,
        ]}
      />
    </>
  );
};

export default DeleteSchedulingDialog;
