import { Button, IconButton, Tooltip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SimpleDialog from "../components/simple-dialog";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useDeleteServicoMutation } from "../services/endpoins";
import Notify from "../components/notify";

interface DeleteServiceDialogProps {
  serviceId: string;
}

const DeleteServiceDialog = ({ serviceId }: DeleteServiceDialogProps) => {
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
  const [excluirServico, { isLoading: isExcluirServicoLoading }] =
    useDeleteServicoMutation();

  const toggleDialog = () => setIsDialogOpen((state) => !state);

  const toggleNotifyDeleteMessage = () =>
    setNotifyDeleteMessage((state) => ({ ...state, isOpen: !state.isOpen }));

  const onClick = async () => {
    try {
      await excluirServico(serviceId).unwrap();

      setNotifyDeleteMessage({
        isOpen: true,
        message: "Serviço excluído com sucesso.",
        severity: "success",
      });

      toggleDialog();
    } catch (error: any) {
      setNotifyDeleteMessage({
        isOpen: true,
        message: error.data.message || "Ocorreu um erro ao criar o serviço.",
        severity: "error",
      });
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
          <Button disabled={isExcluirServicoLoading} onClick={toggleDialog}>
            Fechar
          </Button>,
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

export default DeleteServiceDialog;
