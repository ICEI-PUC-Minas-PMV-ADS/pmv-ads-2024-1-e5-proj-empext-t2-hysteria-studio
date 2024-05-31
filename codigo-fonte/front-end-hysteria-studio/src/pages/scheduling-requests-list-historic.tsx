import { Box, LinearProgress, Paper, Typography } from "@mui/material";
import TableSchedulingLists from "../components/table-scheduling-lists";
import { GetHistoricosResult, useGetHistoricosQuery } from "../services/endpoins";

const SchedulingRequestListHistoric = () => {
    const {
        data: historicos,
        isFetching: isFetchingHistoricos,
        isError: isErrorHistoricos,
    } = useGetHistoricosQuery(undefined, {
        selectFromResult: (result) => ({
            ...result,
            data: result.data?.filter(
                (historico) => !historico.status_agendamento_confirmado
            ),
        }),
    });
        
    return (
        <Box component={Paper} display="flex" flexDirection="column" p={2}>
            {isFetchingHistoricos ? (
                <Box component={Paper} p={2} mt={2}>
                    <LinearProgress />
                </Box>
            ) : isErrorHistoricos ? (
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
            ) : !historicos?.length ? (
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
                data={historicos as Array<GetHistoricosResult>}
                listType="requests"
                />
            )}
            </Box>
    );
};

export default SchedulingRequestListHistoric;