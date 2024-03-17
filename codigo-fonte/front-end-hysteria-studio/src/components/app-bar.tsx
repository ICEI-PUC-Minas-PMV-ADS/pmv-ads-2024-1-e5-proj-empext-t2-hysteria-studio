import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const logoStyle = {
  width: "70px",
  height: "auto",
  cursor: "pointer",
};

const AppAppBar = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => setOpen((state) => !state);

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 1,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            borderRadius: "999px",
            bgcolor:
              theme.palette.mode === "light"
                ? "rgba(255, 255, 255, 0.4)"
                : "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(24px)",
            maxHeight: 40,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`,
          })}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              ml: "-18px",
              px: 0,
            }}
          >
            <img
              src="../../public/logo.png"
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
                  backgroundColor: "background.paper",
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
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppAppBar;
