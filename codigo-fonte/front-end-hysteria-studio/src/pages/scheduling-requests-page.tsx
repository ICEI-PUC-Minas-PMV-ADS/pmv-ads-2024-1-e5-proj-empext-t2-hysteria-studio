import { Box, Container, CssBaseline, Stack } from "@mui/material";
import SchedulingRequestsList from "./scheduling-requests-list";

const SchedulingRequestsPage = () => {
  return (
    <>
      <CssBaseline />
      <Box
        id="hero"
        sx={{
          width: "100%",
          backgroundSize: "100% 20%",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 15 },
            pb: { xs: 8 },
          }}
        >
          <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%" } }}>
            <SchedulingRequestsList />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default SchedulingRequestsPage;
