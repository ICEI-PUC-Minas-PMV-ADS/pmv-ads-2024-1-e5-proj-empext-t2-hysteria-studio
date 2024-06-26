import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import EditSchedulingDialog from "../dialogs/edit-scheduling-dialog";
import DeleteSchedulingDialog from "../dialogs/delete-scheduling-dialog";
import {
  GetAgendamentosFuturosResult,
  GetAgendamentosResult,
  GetAgendamentosUsuarioResult,
  GetHistoricosResult,
  GetHistoricosUsuarioResult,
  GetUsuarioAgendamentosFuturosResult,
} from "../services/endpoins";
import { format } from "date-fns";
import StatusChip from "./status-chip";
import UpdateSchedulingDialog from "../dialogs/update-scheduling-status-dialog";

interface TableListProps {
  listType: "scheduled" | "history" | "requests";
  data: Array<
    | GetAgendamentosResult
    | GetAgendamentosUsuarioResult
    | GetHistoricosResult
    | GetHistoricosUsuarioResult
    | GetAgendamentosFuturosResult
    | GetUsuarioAgendamentosFuturosResult
  >;
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
            <TableCell
              sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}
            >
              Status
            </TableCell>
            {listType !== "history" && <TableCell>Ações</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.id_agendamento}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}
              >
                {row.usuario?.nome ||
                  (row as GetAgendamentosResult).usuario_inexistente?.nome}
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
                    gap: 1,
                  }}
                >
                  <Typography variant="body2">
                    Nome:{" "}
                    {row.usuario?.nome ||
                      (row as GetAgendamentosResult).usuario_inexistente?.nome}
                  </Typography>
                  <Typography variant="body2">
                    Data:{" "}
                    {format(
                      new Date(row.horario_agendamento.horario_disponivel),
                      "dd/MM/yyyy HH:mm"
                    )}
                  </Typography>
                  <Typography variant="body2">
                    Serviço: {row.servico.nome}
                  </Typography>
                  <StatusChip status={row.status.status_agendamento} />
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
                {format(
                  new Date(row.horario_agendamento.horario_disponivel),
                  "dd/MM/yyyy HH:mm"
                )}
              </TableCell>
              <TableCell
                sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}
              >
                {row.servico.nome}
              </TableCell>
              <TableCell
                sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}
              >
                <StatusChip status={row.status.status_agendamento} />
              </TableCell>
              {listType !== "history" && (
                <TableCell>
                  {listType === "scheduled" ? (
                    <EditSchedulingDialog data={row} />
                  ) : (
                    <UpdateSchedulingDialog agendaId={row.id_agendamento} />
                  )}
                  <DeleteSchedulingDialog agendaId={row.id_agendamento} />
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
