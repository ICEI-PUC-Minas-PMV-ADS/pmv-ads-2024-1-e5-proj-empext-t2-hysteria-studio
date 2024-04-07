import { Avatar } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const MenuDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSchedulingRequests = () => {
    setAnchorEl(null);
    navigate("/pedidos-de-agendamento");
  };
  const handleMyInformation = () => {
    setAnchorEl(null);
    navigate("/minhas-informacoes");
  };
  const handleLogout = () => {
    setAnchorEl(null);
    navigate("/");
  };

  return (
    <>
      <Avatar
        sx={{
          cursor: "pointer",
          bgcolor: "primary.main",
        }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AccountCircleIcon />
      </Avatar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleSchedulingRequests}>
          Pedidos de agendamento
        </MenuItem>
        <MenuItem onClick={handleMyInformation}>Minhas informações</MenuItem>
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>
    </>
  );
};

export default MenuDropdown;
