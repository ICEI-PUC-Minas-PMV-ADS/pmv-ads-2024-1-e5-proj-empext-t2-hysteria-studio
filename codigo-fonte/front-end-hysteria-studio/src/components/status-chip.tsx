import { Chip } from "@mui/material";

interface StatusChipProps {
  status:
    | "SOLICITACAO_EM_ESPERA"
    | "AGENDAMENTO_CONFIRMADO"
    | "CONCLUIDO"
    | "CANCELADO";
}

const statusTranslation = {
  SOLICITACAO_EM_ESPERA: "Em espera",
  AGENDAMENTO_CONFIRMADO: "Confirmado",
  CONCLUIDO: "Concluído",
  CANCELADO: "Cancelado",
};

const StatusChip = ({ status }: StatusChipProps) => {
  let color: "warning" | "error" | "success";

  if (status === "SOLICITACAO_EM_ESPERA") {
    color = "warning";
  } else if (status === "CANCELADO") {
    color = "error";
  } else {
    color = "success";
  }

  return (
    <Chip
      label={statusTranslation[status]}
      color={color}
      size="small"
      variant={status === "AGENDAMENTO_CONFIRMADO" ? "outlined" : "filled"}
    />
  );
};

export default StatusChip;
