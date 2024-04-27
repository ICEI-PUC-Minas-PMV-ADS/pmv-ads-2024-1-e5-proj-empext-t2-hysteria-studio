import { Alert, Snackbar } from "@mui/material";

interface NotifyProps {
  isOpen: boolean;
  message: string;
  severity: "error" | "warning" | "info" | "success";
  onClose: () => void;
}

const Notify = ({ isOpen, message, severity, onClose }: NotifyProps) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={onClose}
    >
      <Alert severity={severity} variant="filled" icon={false}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notify;
