import { Button, InputAdornment, TextField } from "@mui/material";
import SimpleDialog from "../components/simple-dialog";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useCreateServicoMutation } from "../services/endpoins";
import Notify from "../components/notify";

interface CreateServiceFormValues {
  name: string;
  price: string;
  description: string;
}

const CreateServiceDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [notifyCreateMessage, setNotifyCreateMessage] = useState<{
    isOpen: boolean;
    message: string;
    severity: "error" | "warning" | "info" | "success";
  }>({
    isOpen: false,
    message: "",
    severity: "success",
  });
  const [criarServico] = useCreateServicoMutation();

  const toggleNotifyCreateMessage = () =>
    setNotifyCreateMessage((state) => ({ ...state, isOpen: !state.isOpen }));

  const formMethods = useForm<CreateServiceFormValues>({
    mode: "all",
  });
  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid, isSubmitting, errors },
  } = formMethods;

  const toggleDialog = () => {
    setIsDialogOpen((state) => !state);
    reset();
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await criarServico({
        nome: data.name,
        preco: Number(data.price),
        descricao: data.description,
      }).unwrap();

      toggleDialog();
      setNotifyCreateMessage({
        isOpen: true,
        message: "Serviço criado com sucesso.",
        severity: "success",
      });
    } catch (error: any) {
      setNotifyCreateMessage({
        isOpen: true,
        message: error.data.message || "Ocorreu um erro ao criar o serviço.",
        severity: "error",
      });
    }
  });

  return (
    <>
      <Button
        sx={{ marginBottom: 2 }}
        size="small"
        variant="contained"
        onClick={toggleDialog}
      >
        Novo serviço
      </Button>
      <SimpleDialog
        title="Criar novo serviço"
        isOpen={isDialogOpen}
        toggleDialog={toggleDialog}
        actions={[<Button onClick={toggleDialog}>Fechar</Button>]}
        content={
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
                helperText={errors.price?.message ? errors.price.message : null}
                disabled={isSubmitting}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Descrição"
                autoComplete="description"
                {...register("description", { required: "Campo obrigatório" })}
                error={!!errors.description}
                helperText={
                  errors.description?.message
                    ? errors.description.message
                    : null
                }
                disabled={isSubmitting}
              />
              <LoadingButton
                fullWidth
                type="submit"
                disabled={!isValid}
                variant="contained"
                loading={isSubmitting}
              >
                Criar serviço
              </LoadingButton>
            </form>
          </FormProvider>
        }
      />
      <Notify
        isOpen={notifyCreateMessage.isOpen}
        severity={notifyCreateMessage.severity}
        message={notifyCreateMessage.message}
        onClose={toggleNotifyCreateMessage}
      />
    </>
  );
};

export default CreateServiceDialog;
