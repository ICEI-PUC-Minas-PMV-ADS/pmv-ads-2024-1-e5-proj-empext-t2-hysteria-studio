import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface SimpleDialogProps {
  isOpen: boolean;
  toggleDialog: () => void;
  title: string;
  content?: string | React.ReactElement;
  actions?: React.ReactElement | React.ReactElement[];
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}

const SimpleDialog = ({
  isOpen,
  toggleDialog,
  title,
  content,
  actions,
  maxWidth = "sm",
}: SimpleDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={toggleDialog}
      maxWidth={maxWidth}
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

export default SimpleDialog;
