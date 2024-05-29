import { Button } from "@mui/material";
import { ReactElement, useContext, useState } from "react";
import SimpleDialog from "../components/simple-dialog";
import { LoadingButton } from "@mui/lab";
import { useDeleteUsuarioMutation } from "../services/endpoins";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from "react-router-dom";
import Notify from "../components/notify";

const DeleteUserAccountDialog = (): ReactElement => {
  const { user, signOut } = useContext(AuthContext);
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
  const navigate = useNavigate();
  const [deleteUsuario, { isLoading: isDeleteLoading }] =
    useDeleteUsuarioMutation();

  const toggleDialog = () => setIsDialogOpen((state) => !state);

  const toggleNotifyDeleteMessage = () =>
    setNotifyDeleteMessage((state) => ({ ...state, isOpen: !state.isOpen }));

  const onSubmit = async () => {
    try {
      await deleteUsuario(user?.id as number).unwrap();

      signOut();
      navigate("/");
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
      <Button color="error" variant="outlined" onClick={toggleDialog}>
        Excluir conta
      </Button>
      <SimpleDialog
        title="Excluir conta"
        content="Tem certeza que deseja excluir sua conta?"
        isOpen={isDialogOpen}
        toggleDialog={toggleDialog}
        maxWidth="xs"
        actions={[
          <LoadingButton loading={isDeleteLoading} onClick={onSubmit}>
            Confirmar
          </LoadingButton>,
          <Button disabled={isDeleteLoading} onClick={toggleDialog}>
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

export default DeleteUserAccountDialog;
