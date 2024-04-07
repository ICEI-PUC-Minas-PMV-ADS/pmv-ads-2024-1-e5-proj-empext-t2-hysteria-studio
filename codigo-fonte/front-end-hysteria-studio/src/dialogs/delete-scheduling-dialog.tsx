import { Button, IconButton, Tooltip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SimpleDialog from "../components/simple-dialog";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

const DeleteSchedulingDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toggleDialog = () => setIsDialogOpen((state) => !state);

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
          <LoadingButton>Confirmar</LoadingButton>,
          <Button onClick={toggleDialog}>Fechar</Button>,
        ]}
      />
    </>
  );
};

export default DeleteSchedulingDialog;
