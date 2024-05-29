import { Box, LinearProgress, Paper, Typography } from "@mui/material";
import TableSchedulingLists from "../components/table-scheduling-lists";
import {
  GetAgendamentosResult,
  GetAgendamentosUsuarioResult,
  useGetAgendamentosQuery,
  useGetAgendamentosUsuarioQuery,
} from "../services/endpoins";
import { AuthContext } from "../contexts/auth";
import { useContext } from "react";

const SchedulingList = () => {
  const { isAdmin, user } = useContext(AuthContext);

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

  return (
    <Box component={Paper} display="flex" flexDirection="column" p={2}>
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
      ) : !listToShow?.length ? (
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
            listToShow as Array<
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
