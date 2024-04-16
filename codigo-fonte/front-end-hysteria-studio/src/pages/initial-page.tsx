import { Box, Container, CssBaseline, Stack } from "@mui/material";

const InitialPage = () => {
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
            pt: { xs: 20 },
            pb: { xs: 8 },
          }}
        >
          <Stack
            spacing={2}
            useFlexGap
            sx={{ width: { xs: "100%", sm: "70%" } }}
          >
            {/* <img
              src="../../public/logo-branca.svg"
              style={{
                width: "50%",
                maxWidth: "300px",
                height: "auto",
              }}
              // onClick={() => navigate("/")}
            /> */}
            {/* <Typography
              component="h1"
              variant="h3"
              color="white"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              Marque um horário com a gente
            </Typography> */}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default InitialPage;
