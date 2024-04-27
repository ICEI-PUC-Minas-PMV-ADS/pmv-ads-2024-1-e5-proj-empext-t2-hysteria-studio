import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import MenuDropdown from "./menu-dropdown";
import { AuthContext } from "../contexts/auth";

const logoStyle = {
  width: "160px",
  height: "auto",
  cursor: "pointer",
};

const AppAppBar = () => {
  const { signed, signOut } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => setOpen((state) => !state);

  const handleLogout = () => {
    signOut();
    navigate("/");
    toggleDrawer();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
      }}
    >
      <Toolbar
        variant="regular"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          bgcolor: "secondary.main",
          backdropFilter: "blur(24px)",
          maxHeight: 40,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: `0 0 1px rgba(212, 188, 50, 0.1), 1px 1.5px 2px -1px rgba(212, 188, 50, 0.15), 4px 4px 12px -2.5px rgba(212, 188, 50, 0.15)`,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            px: 0,
          }}
        >
          <img
            src="../../public/logo-branca.png"
            style={logoStyle}
            alt="logo hysteria studio"
            onClick={() => navigate("/")}
          />
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 0.5,
            alignItems: "center",
          }}
        >
          {signed ? (
            <MenuDropdown />
          ) : (
            <>
              <Button
                color="primary"
                variant="text"
                size="small"
                component="a"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                color="primary"
                variant="contained"
                size="small"
                component="a"
                onClick={() => navigate("/cadastro")}
              >
                Cadastro
              </Button>
            </>
          )}
        </Box>
        <Box sx={{ display: { sm: "", md: "none" } }}>
          <Button
            variant="text"
            color="primary"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ minWidth: "30px", p: "4px" }}
          >
            <MenuIcon />
          </Button>
          <Drawer anchor="right" open={open} onClose={toggleDrawer}>
            <Box
              sx={{
                minWidth: "60dvw",
                p: 2,
                bgcolor: "secondary.main",
                flexGrow: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",
                  flexGrow: 1,
                }}
              ></Box>
              {signed ? (
                <>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      onClick={() => {
                        navigate("/pedidos-de-agendamento");
                        toggleDrawer();
                      }}
                      sx={{ width: "100%" }}
                    >
                      Pedidos de agendamento
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      onClick={() => {
                        toggleDrawer();
                      }}
                      sx={{ width: "100%" }}
                    >
                      Minhas informações
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      onClick={handleLogout}
                      sx={{ width: "100%" }}
                    >
                      Sair
                    </Button>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      onClick={() => {
                        navigate("/login");
                        toggleDrawer();
                      }}
                      sx={{ width: "100%" }}
                    >
                      Login
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      onClick={() => {
                        navigate("/cadastro");
                        toggleDrawer();
                      }}
                      sx={{ width: "100%" }}
                    >
                      Cadastro
                    </Button>
                  </MenuItem>
                </>
              )}
            </Box>
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppAppBar;
