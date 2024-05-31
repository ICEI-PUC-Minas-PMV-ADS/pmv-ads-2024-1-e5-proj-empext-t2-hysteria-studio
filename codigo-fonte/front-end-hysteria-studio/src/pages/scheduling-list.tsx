import {
  Box,
  Button,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import TableSchedulingLists from "../components/table-scheduling-lists";
import {
  GetAgendamentosResult,
  GetAgendamentosUsuarioResult,
  useGetAgendamentosQuery,
  useGetAgendamentosUsuarioQuery,
} from "../services/endpoins";
import { AuthContext } from "../contexts/auth";
import { useContext, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { compareAsc, endOfDay, startOfDay } from "date-fns";

interface SchedulingListFormValues {
  name?: string;
  startDate?: string;
  finalDate?: string;
}

interface FilterValues {
  name?: string;
  startDate?: Date;
  finalDate?: Date;
}

const SchedulingList = () => {
  const { isAdmin, user } = useContext(AuthContext);
  const [filter, setFilter] = useState<FilterValues>({
    name: "",
    startDate: undefined,
    finalDate: undefined,
  });

  const formMethods = useForm<SchedulingListFormValues>({ mode: "all" });
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = formMethods;

  const {
    data: agendamentosUsuario,
    isFetching: isFetchingAgendamentosUsuarios,
    isError: isErrorAgendamentosUsuario,
  } = useGetAgendamentosUsuarioQuery(user?.id as number, {
    skip: isAdmin,
  });

  const {
    data: agendamentos,
    isFetching: isFetchingAgendamentos,
    isError: isErrorAgendamentos,
  } = useGetAgendamentosQuery(undefined, {
    skip: !isAdmin,
  });

  const isLoading = isFetchingAgendamentos || isFetchingAgendamentosUsuarios;
  const isError = isErrorAgendamentos || isErrorAgendamentosUsuario;
  const listToShow = isAdmin ? agendamentos : agendamentosUsuario;

  const onSubmit = handleSubmit((values) => {
    const startDate = values.startDate
      ? startOfDay(new Date(values.startDate.concat("T03:00:00")))
      : undefined;
    const finalDate = values.finalDate
      ? endOfDay(new Date(values.finalDate.concat("T03:00:00")))
      : undefined;
    const compareDate =
      startDate && finalDate && compareAsc(startDate, finalDate);

    if (startDate && !finalDate) {
      setError("finalDate", {
        type: "manual",
        message: "A data de fim é obrigatória.",
      });
    } else if (finalDate && !startDate) {
      setError("startDate", {
        type: "manual",
        message: "A data de início é obrigatória.",
      });
    } else if (compareDate && compareDate > 0) {
      setError("startDate", {
        type: "manual",
        message: "A data de início deve ser maior que a data de fim.",
      });

      setError("finalDate", {
        type: "manual",
        message: "A data de fim deve ser maior que a data de início.",
      });
    } else {
      setFilter({ ...values, startDate, finalDate });
    }
  });

  const filteredList = useMemo(() => {
    if (!listToShow) return listToShow;

    if (filter?.name) {
      const name = filter.name.trim();
      if (filter.startDate && filter.finalDate) {
        const startDate = filter.startDate;
        const finalDate = filter.finalDate;

        return listToShow.filter(
          (item) =>
            item.usuario.nome
              .toLocaleLowerCase()
              .includes(name.toLocaleLowerCase()) &&
            new Date(item.horario_agendamento.horario_disponivel) >=
              new Date(startDate) &&
            new Date(item.horario_agendamento.horario_disponivel) <=
              new Date(finalDate)
        );
      } else {
        return listToShow.filter((item) =>
          item.usuario.nome
            .toLocaleLowerCase()
            .includes(name.toLocaleLowerCase())
        );
      }
    } else if (filter.startDate && filter.finalDate) {
      const startDate = filter.startDate;
      const finalDate = filter.finalDate;

      return listToShow.filter(
        (item) =>
          new Date(item.horario_agendamento.horario_disponivel) >=
            new Date(startDate) &&
          new Date(item.horario_agendamento.horario_disponivel) <=
            new Date(finalDate)
      );
    } else {
      return listToShow;
    }
  }, [listToShow, filter]);

  return (
    <Box component={Paper} display="flex" flexDirection="column" p={2} gap={3}>
      <FormProvider {...formMethods}>
        <form noValidate onSubmit={onSubmit}>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            gap={1}
          >
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Nome do cliente"
              autoComplete="name"
              {...register("name")}
              helperText="Pesquisar pelo nome do cliente."
            />
            <TextField
              margin="normal"
              type="date"
              fullWidth
              id="startDate"
              label="Data de início"
              autoComplete="startDate"
              {...register("startDate")}
              InputLabelProps={{ shrink: true }}
              error={!!errors.startDate}
              helperText={
                errors.startDate?.message
                  ? errors.startDate.message
                  : "Pesquisa pela data de início."
              }
            />
            <TextField
              margin="normal"
              type="date"
              fullWidth
              id="finalDate"
              label="Data de fim"
              autoComplete="finalDate"
              {...register("finalDate")}
              InputLabelProps={{ shrink: true }}
              error={!!errors.finalDate}
              helperText={
                errors.finalDate?.message
                  ? errors.finalDate.message
                  : "Pesquisa pela data de fim."
              }
            />
            <Box mb={2} width={{ xs: "100%", md: "auto" }}>
              <Button fullWidth type="submit" variant="contained">
                Pesquisar
              </Button>
            </Box>
          </Box>
        </form>
      </FormProvider>
      {isLoading ? (
        <Box component={Paper} p={2} mt={2}>
          <LinearProgress />
        </Box>
      ) : isError ? (
        <Box
          component={Paper}
          p={2}
          mt={2}
          display="flex"
          justifyContent="center"
        >
          <Typography fontWeight="bold">
            Ocorreu um erro ao buscar as informações.
          </Typography>
        </Box>
      ) : !filteredList?.length ? (
        <Box
          component={Paper}
          p={2}
          mt={2}
          display="flex"
          justifyContent="center"
        >
          <Typography fontWeight="bold">Não há agendamentos.</Typography>
        </Box>
      ) : (
        <TableSchedulingLists
          data={
            filteredList as Array<
              GetAgendamentosResult | GetAgendamentosUsuarioResult
            >
          }
          listType="scheduled"
        />
      )}
    </Box>
  );
};

export default SchedulingList;
