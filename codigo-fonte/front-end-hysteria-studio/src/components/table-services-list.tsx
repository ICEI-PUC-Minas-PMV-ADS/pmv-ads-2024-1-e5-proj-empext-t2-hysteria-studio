import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { useGetServicosQuery } from "../services/endpoins";

const TableServicesList = () => {
  const {
    data: servicos,
    isFetching: isFetchingServicos,
    isError: isServcosError,
  } = useGetServicosQuery();

  return isFetchingServicos ? (
    <Box component={Paper} p={2} mt={2}>
      <LinearProgress />
    </Box>
  ) : isServcosError ? (
    <Box component={Paper} p={2} mt={2} display="flex" justifyContent="center">
      <Typography fontWeight="bold">
        Ocorreu um erro ao buscar as informações.
      </Typography>
    </Box>
  ) : (
    <>
      <TableContainer component={Paper}>
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Button sx={{ margin: 1 }} size="small" variant="outlined">
            Novo serviço
          </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ display: { sm: "", md: "none" } }}>
                  Informações
                </TableCell>
                <TableCell
                  sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}
                >
                  Serviço
                </TableCell>
                <TableCell
                  sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}
                >
                  Preço
                </TableCell>
                <TableCell
                  sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}
                >
                  Tempo estimado
                </TableCell>
                <TableCell>Ações</TableCell>
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
                        Preço: {row.preco}
                      </Typography>
                      <Typography variant="body2">
                        Tempo estimado: {row.dt_criacao}
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
                    {row.preco}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      display: { xs: "none", sm: "none", md: "table-cell" },
                    }}
                  >
                    {row.dt_criacao}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Tooltip title="Editar" arrow>
                      <IconButton color="primary" size="small">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir" arrow>
                      <IconButton color="error" size="small">
                        <CancelIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </>
  );
};

export default TableServicesList;
