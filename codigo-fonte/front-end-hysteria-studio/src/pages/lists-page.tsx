import {
  Box,
  Container,
  CssBaseline,
  Stack,
  Tab,
  Tabs,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import TableSchedulingLists from "../components/table-scheduling-lists";
import TableServicesList from "../components/table-services-list";
import NewSchedulingDialog from "../dialogs/new-scheduling-dialog";
import SchedulingList from "./scheduling-list";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const ListsPage = () => {
  const [value, setValue] = useState(0);
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              variant={isSmallScreen ? "scrollable" : "fullWidth"}
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              <Tab label="Agendamentos" />
              <Tab label="Histórico" />
              <Tab label="Serviços" />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
              <SchedulingList />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              {/* @ts-ignore */}
              <TableSchedulingLists listType="history" />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <TableServicesList />
            </CustomTabPanel>
            <NewSchedulingDialog />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default ListsPage;
