import {
  Box,
  Button,
  Container,
  CssBaseline,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const InitialPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <CssBaseline />
      <Box
        id="hero"
        sx={{
          width: "100%",
          backgroundSize: "100% 20%",
          backgroundRepeat: "no-repeat",
          backgroundColor: "secondary.main",
          height: "100vh",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 10 },
            pb: { xs: 8 },
          }}
        >
          <Stack
            spacing={5}
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ width: { xs: "100%", sm: "70%" } }}
          >
            <img
              src="/logo-branca-completa.png"
              style={{
                width: "80%",
                height: "auto",
              }}
            />
            <Typography
              component="h1"
              variant="h4"
              color="white"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              Conheça nosso trabalho, marque um horário:
            </Typography>
            <Box
              width="100%"
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              gap={2}
            >
              <Button
                fullWidth
                color="primary"
                variant="outlined"
                size="large"
                component="a"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                size="large"
                component="a"
                onClick={() => navigate("/cadastro")}
              >
                Cadastro
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default InitialPage;
