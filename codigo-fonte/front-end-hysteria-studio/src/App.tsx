import { BrowserRouter, Route, Routes } from "react-router-dom";
import InitialPage from "./pages/initial-page";
import AppAppBar from "./components/app-bar";
import { customTheme } from "./theme";
import { ThemeProvider, createTheme } from "@mui/material";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import ListsPage from "./pages/lists-page";

function App() {
  const theme = createTheme(customTheme);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppAppBar />
        <Routes>
          <Route path="/" element={<InitialPage />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Routes>
          <Route path="/cadastro" element={<RegisterPage />} />
        </Routes>
        <Routes>
          <Route path="/inicio" element={<ListsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
