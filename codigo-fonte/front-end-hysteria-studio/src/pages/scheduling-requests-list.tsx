import { Box, LinearProgress, Paper, Typography } from "@mui/material";
import TableSchedulingLists from "../components/table-scheduling-lists";
import {
  GetAgendamentosResult,
  useGetAgendamentosQuery,
} from "../services/endpoins";

const SchedulingRequestsList = () => {
  const {
    data: agendamentos,
    isFetching: isFetchingAgendamentos,
    isError: isErrorAgendamentos,
  } = useGetAgendamentosQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      data: result.data?.filter(
        (agendamento) =>
          agendamento.status.status_agendamento === "SOLICITACAO_EM_ESPERA"
      ),
    }),
  });

  return (
    <Box component={Paper} display="flex" flexDirection="column" p={2}>
      {isFetchingAgendamentos ? (
        <Box component={Paper} p={2} mt={2}>
          <LinearProgress />
        </Box>
      ) : isErrorAgendamentos ? (
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
      ) : !agendamentos?.length ? (
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
          data={agendamentos as Array<GetAgendamentosResult>}
          listType="requests"
        />
      )}
    </Box>
  );
};

export default SchedulingRequestsList;
