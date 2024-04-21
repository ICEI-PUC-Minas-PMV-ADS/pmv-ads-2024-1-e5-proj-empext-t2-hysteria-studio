import { Button, InputAdornment, TextField } from "@mui/material";
import SimpleDialog from "../components/simple-dialog";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useCreateServicoMutation } from "../services/endpoins";

interface CreateServiceFormValues {
  name: string;
  price: string;
  description: string;
}

const CreateServiceDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [criarServico] = useCreateServicoMutation();

  const formMethods = useForm<CreateServiceFormValues>({
    mode: "all",
  });
  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid, isSubmitting, errors },
  } = formMethods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await criarServico({
        nome: data.name,
        preco: Number(data.price),
        descricao: data.description,
      }).unwrap();

      toggleDialog();
    } catch {
      console.error("Erro ao criar serviço");
    }
  });

  const toggleDialog = () => {
    setIsDialogOpen((state) => !state);
    reset();
  };

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
    </>
  );
};

export default CreateServiceDialog;
