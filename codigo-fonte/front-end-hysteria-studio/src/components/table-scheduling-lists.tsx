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
import { GetPedidosResult } from "../services/endpoins";

interface TableListProps {
  listType: "scheduled" | "history" | "requests";
  data: Array<GetPedidosResult>;
}

const TableSchedulingLists = ({ listType, data }: TableListProps) => {
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
          {data?.map((row) => (
            <TableRow
              key={row.nome}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}
              >
                {row.nome}
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
                  <Typography variant="body2">Nome: {row.nome}</Typography>
                  <Typography variant="body2">Data: {row.data}</Typography>
                  <Typography variant="body2">
                    Serviço: {row.servico}
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
                {row.data}
              </TableCell>
              <TableCell
                sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}
              >
                {row.servico}
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
