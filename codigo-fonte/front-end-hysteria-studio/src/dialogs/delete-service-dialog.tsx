import { Button, IconButton, Tooltip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SimpleDialog from "../components/simple-dialog";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useDeleteServicoMutation } from "../services/endpoins";

interface DeleteServiceDialogProps {
  serviceId: string;
}

const DeleteServiceDialog = ({ serviceId }: DeleteServiceDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [excluirServico, { isLoading: isExcluirServicoLoading }] =
    useDeleteServicoMutation();
  const toggleDialog = () => setIsDialogOpen((state) => !state);

  const onClick = async () => {
    try {
      await excluirServico(serviceId).unwrap();
      toggleDialog();
    } catch {
      console.error("Erro ao excluir servico");
    }
  };

  return (
    <>
      <Tooltip title="Excluir" arrow>
        <IconButton color="error" size="small" onClick={toggleDialog}>
          <CancelIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <SimpleDialog
        title="Excluir servico"
        content="Deseja realmente excluir o servico?"
        isOpen={isDialogOpen}
        toggleDialog={toggleDialog}
        maxWidth="xs"
        actions={[
          <LoadingButton loading={isExcluirServicoLoading} onClick={onClick}>
            Confirmar
          </LoadingButton>,
          <Button onClick={toggleDialog}>Fechar</Button>,
        ]}
      />
    </>
  );
};

export default DeleteServiceDialog;
