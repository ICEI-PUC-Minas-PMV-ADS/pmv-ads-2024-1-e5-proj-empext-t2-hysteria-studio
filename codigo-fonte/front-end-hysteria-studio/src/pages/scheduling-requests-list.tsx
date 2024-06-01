import { Box, LinearProgress, Paper, Typography } from "@mui/material";
import TableSchedulingLists from "../components/table-scheduling-lists";
import { GetPedidosAgendamentosResult, useGetAgendamentosRequestQuery } from "../services/endpoins";

const SchedulingRequestList = () => {
    const {
        data: agendamentos,
        isFetching: isFetchingAgendamentos,
        isError: isErrorAgendamentos,
    } = useGetAgendamentosRequestQuery(undefined, {
        selectFromResult: (result) => ({
            ...result,
            data: result.data?.filter(
                (agendamento) => !agendamento.status_agendamento_confirmado
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
            <Typography fontWeight="bold">Não há históricos.</Typography>
            </Box>
            ) : (
                <TableSchedulingLists
                data={agendamentos as Array<GetPedidosAgendamentosResult>}
                listType="requests"
                />
            )}
            </Box>
    );
};

export default SchedulingRequestList;