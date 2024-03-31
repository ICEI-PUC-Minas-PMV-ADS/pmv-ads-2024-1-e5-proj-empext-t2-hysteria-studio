import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditSchedulingDialog from "../dialogs/edit-scheduling-dialog";
import DeleteSchedulingDialog from "../dialogs/delete-scheduling-dialog";

interface TableListProps {
  listType: "scheduled" | "history" | "requests";
}

function createData(
  name: string,
  date: string,
  service: string,
  status?: boolean
) {
  return { name, date, service, status };
}

const rows = [
  createData("Amanda Cacholi", "18/03/2024 14:30", "Corte de cabelo", true),
  createData("Marcus Vinicius", "18/03/2024 14:30", "Corte de cabelo", true),
  createData("Patrick", "18/03/2024 14:30", "Corte de cabelo", true),
  createData("Luiz", "18/03/2024 14:30", "Corte de cabelo", false),
  createData("Stephanie", "18/03/2024 14:30", "Corte de cabelo", false),
];

const TableSchedulingLists = ({ listType }: TableListProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}
            >
              Nome
            </TableCell>
            <TableCell sx={{ display: { sm: "", md: "none" } }}>
              Informações
            </TableCell>
            <TableCell
              sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}
            >
              Data
            </TableCell>
            <TableCell
              sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}
            >
              Serviço
            </TableCell>
            {listType === "history" ? (
              <TableCell>Status</TableCell>
            ) : (
              <TableCell>Ações</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}
              >
                {row.name}
              </TableCell>
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
                  <Typography variant="body2">Nome: {row.name}</Typography>
                  <Typography variant="body2">Data: {row.date}</Typography>
                  <Typography variant="body2">
                    Serviço: {row.service}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "table-cell",
                  },
                }}
              >
                {row.date}
              </TableCell>
              <TableCell
                sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}
              >
                {row.service}
              </TableCell>
              {listType === "history" ? (
                <TableCell>
                  {row.status ? (
                    <Tooltip title="Confirmado" arrow>
                      <CheckIcon color="success" fontSize="small" />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Cancelado" arrow>
                      <CloseIcon color="error" fontSize="small" />
                    </Tooltip>
                  )}
                </TableCell>
              ) : (
                <TableCell>
                  {listType === "scheduled" ? (
                    <EditSchedulingDialog />
                  ) : (
                    <Tooltip title="Confirmar" arrow>
                      <IconButton color="success" size="small">
                        <CheckCircleIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  <DeleteSchedulingDialog />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableSchedulingLists;
