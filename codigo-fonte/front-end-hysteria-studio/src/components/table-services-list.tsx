import {
  Box,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useGetServicosQuery } from "../services/endpoins";
import CreateServiceDialog from "../dialogs/create-service-dialog";
import DeleteServiceDialog from "../dialogs/delete-service-dialog";
import EditServiceDialog from "../dialogs/edit-service-dialog";
import { AuthContext } from "../contexts/auth";
import { useContext } from "react";
import { formatCurrency } from "@brazilian-utils/brazilian-utils";

const TableServicesList = () => {
  const { isAdmin } = useContext(AuthContext);

  const {
    data: servicos,
    isLoading: isLoadingServicos,
    isError: isServcosError,
  } = useGetServicosQuery();

  return (
    <Box component={Paper} display="flex" flexDirection="column" p={2}>
      {isAdmin && (
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <CreateServiceDialog />
        </Box>
      )}
      {isLoadingServicos ? (
        <Box component={Paper} p={2} mt={2}>
          <LinearProgress />
        </Box>
      ) : isServcosError ? (
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
      ) : !servicos?.length ? (
        <Box
          component={Paper}
          p={2}
          mt={2}
          display="flex"
          justifyContent="center"
        >
          <Typography fontWeight="bold">Nenhum serviço cadastrado.</Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ display: { sm: "", md: "none" } }}>
                  Informações
                </TableCell>
                <TableCell
                  sx={{
                    display: { xs: "none", sm: "none", md: "table-cell" },
                  }}
                >
                  Serviço
                </TableCell>
                <TableCell
                  sx={{
                    display: { xs: "none", sm: "none", md: "table-cell" },
                  }}
                >
                  Preço
                </TableCell>
                <TableCell
                  sx={{
                    display: { xs: "none", sm: "none", md: "table-cell" },
                  }}
                >
                  Descrição
                </TableCell>
                {isAdmin && <TableCell>Ações</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {servicos?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ display: { sm: "", md: "none" } }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography variant="body2">
                        Serviço: {row.nome}
                      </Typography>
                      <Typography variant="body2">
                        Preço: {`R$ ${formatCurrency(Number(row.preco))}`}
                      </Typography>
                      <Typography variant="body2">
                        Descrição: {row.descricao}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      display: { xs: "none", sm: "none", md: "table-cell" },
                    }}
                  >
                    {row.nome}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      display: { xs: "none", sm: "none", md: "table-cell" },
                    }}
                  >
                    {`R$ ${formatCurrency(Number(row.preco))}`}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      display: { xs: "none", sm: "none", md: "table-cell" },
                    }}
                  >
                    {row.descricao}
                  </TableCell>
                  {isAdmin && (
                    <TableCell component="th" scope="row">
                      <EditServiceDialog serviceId={row.id} />
                      <DeleteServiceDialog serviceId={row.id} />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TableServicesList;
