import {
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SimpleDialog from "../components/simple-dialog";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import {
  useGetOneServicoQuery,
  useUpdateServicoMutation,
} from "../services/endpoins";
import Notify from "../components/notify";

interface EditServiceFormValues {
  name: string;
  price: number;
  description: string;
}

interface EditServiceDialogProps {
  serviceId: string;
}

const EditServiceDialog = ({ serviceId }: EditServiceDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [notifyEditMessage, setNotifyEditMessage] = useState<{
    isOpen: boolean;
    message: string;
    severity: "error" | "warning" | "info" | "success";
  }>({
    isOpen: false,
    message: "",
    severity: "success",
  });
  const [updateServico] = useUpdateServicoMutation();

  const toggleNotifyEditMessage = () =>
    setNotifyEditMessage((state) => ({ ...state, isOpen: !state.isOpen }));

  const { data: getOneServicoData, isFetching: isGetOneFetchingServico } =
    useGetOneServicoQuery(serviceId, {
      skip: !isDialogOpen,
    });

  const defaultValues = useMemo(
    () => ({
      name: getOneServicoData?.nome,
      price: getOneServicoData?.preco,
      description: getOneServicoData?.descricao,
    }),
    [getOneServicoData]
  );

  const formMethods = useForm<EditServiceFormValues>({
    mode: "all",
  });

  const {
    handleSubmit,
    register,
    formState: { isValid, isSubmitting, errors },
    reset,
  } = formMethods;

  const toggleDialog = () => {
    setIsDialogOpen((state) => !state);
    reset();
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateServico({
        id: serviceId,
        nome: data.name,
        preco: data.price,
        descricao: data.description,
      }).unwrap();

      toggleDialog();
      setNotifyEditMessage({
        isOpen: true,
        message: "Serviço atualizado com sucesso.",
        severity: "success",
      });
    } catch (error: any) {
      setNotifyEditMessage({
        isOpen: true,
        message:
          error.data.message || "Ocorreu um erro ao atualizar o serviço.",
        severity: "error",
      });
    }
  });

  return (
    <>
      <Tooltip title="Editar" arrow>
        <IconButton color="primary" size="small" onClick={toggleDialog}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <SimpleDialog
        title="Editar serviço"
        isOpen={isDialogOpen}
        toggleDialog={toggleDialog}
        actions={[<Button onClick={toggleDialog}>Fechar</Button>]}
        content={
          isGetOneFetchingServico ? (
            <LinearProgress />
          ) : (
            <FormProvider {...formMethods}>
              <form noValidate onSubmit={onSubmit}>
                <TextField
                  required
                  margin="normal"
                  fullWidth
                  id="name"
                  label="Nome"
                  autoComplete="name"
                  {...register("name", { required: "Campo obrigatório" })}
                  error={!!errors.name}
                  helperText={errors.name?.message ? errors.name.message : null}
                  defaultValue={defaultValues.name}
                  disabled={isSubmitting}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="price"
                  label="Preço"
                  autoComplete="price"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                  {...register("price", { required: "Campo obrigatório" })}
                  error={!!errors.price}
                  helperText={
                    errors.price?.message ? errors.price.message : null
                  }
                  defaultValue={defaultValues.price}
                  disabled={isSubmitting}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="description"
                  label="Descrição"
                  autoComplete="description"
                  {...register("description", {
                    required: "Campo obrigatório",
                  })}
                  error={!!errors.description}
                  helperText={
                    errors.description?.message
                      ? errors.description.message
                      : null
                  }
                  defaultValue={defaultValues.description}
                  disabled={isSubmitting}
                />
                <LoadingButton
                  fullWidth
                  type="submit"
                  disabled={!isValid}
                  variant="contained"
                  loading={isSubmitting}
                >
                  Confirmar
                </LoadingButton>
              </form>
            </FormProvider>
          )
        }
      />
      <Notify
        isOpen={notifyEditMessage.isOpen}
        severity={notifyEditMessage.severity}
        message={notifyEditMessage.message}
        onClose={toggleNotifyEditMessage}
      />
    </>
  );
};

export default EditServiceDialog;
