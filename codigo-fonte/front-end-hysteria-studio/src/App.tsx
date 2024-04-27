import { BrowserRouter, Route, Routes } from "react-router-dom";
import InitialPage from "./pages/initial-page";
import AppAppBar from "./components/app-bar";
import { customTheme } from "./theme";
import { ThemeProvider, createTheme } from "@mui/material";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import ListsPage from "./pages/lists-page";
import SchedulingRequestsPage from "./pages/scheduling-requests-page";
import { Provider } from "react-redux";
import { store } from "./services/store";
import AuthProvider from "./contexts/auth";
import { Private, Public } from "./components/private";
import AddNewAdminPage from "./pages/add-new-admin-user-page";
import EditUsersInformationPage from "./pages/edit-users-information-page";

function App() {
  const theme = createTheme(customTheme);

  return (
    <AuthProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <AppAppBar />
            <Routes>
              <Route path="/" element={<Public />}>
                <Route path="/" element={<InitialPage />} />
              </Route>
              <Route path="/login" element={<Public />}>
                <Route path="/login" element={<LoginPage />} />
              </Route>
              <Route path="/cadastro" element={<Public />}>
                <Route path="/cadastro" element={<RegisterPage />} />
              </Route>
              <Route path="/inicio" element={<Private />}>
                <Route path="/inicio" element={<ListsPage />} />
              </Route>
              <Route
                path="/pedidos-de-agendamento"
                element={<SchedulingRequestsPage />}
              />
              <Route path="/adicionar-administrador" element={<Private />}>
                <Route
                  path="/adicionar-administrador"
                  element={<AddNewAdminPage />}
                />
              </Route>
              <Route path="/minhas-informacoes" element={<Private />}>
                <Route
                  path="/minhas-informacoes"
                  element={<EditUsersInformationPage />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </AuthProvider>
  );
}

export default App;
