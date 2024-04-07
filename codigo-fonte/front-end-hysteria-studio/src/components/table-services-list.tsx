import {
  Box,
  Button,
  IconButton,
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

function createData(service: string, price: number, estimatedTime: string) {
  return { service, price, estimatedTime };
}

const rows = [
  createData("Corte de cabelo", 40, "30min"),
  createData("Corte de cabelo + barba", 60, "1h"),
  createData("Barba", 40, "30min"),
  createData("Completo", 70, "1h30"),
];

const TableServicesList = () => {
  return (
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
            {rows.map((row) => (
              <TableRow
                key={row.service}
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
                      Serviço: {row.service}
                    </Typography>
                    <Typography variant="body2">Preço: {row.price}</Typography>
                    <Typography variant="body2">
                      Tempo estimado: {row.estimatedTime}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}
                >
                  {row.service}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}
                >
                  {row.price}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}
                >
                  {row.estimatedTime}
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
  );
};

export default TableServicesList;
