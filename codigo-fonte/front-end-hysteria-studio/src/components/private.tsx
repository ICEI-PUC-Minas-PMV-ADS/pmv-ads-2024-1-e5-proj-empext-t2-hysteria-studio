import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { Navigate, Outlet } from "react-router-dom";

const Private = () => {
  const { signed } = useContext(AuthContext);

  return signed ? <Outlet /> : <Navigate to="/login" />;
};

const Public = () => {
  const { signed } = useContext(AuthContext);

  return signed ? <Navigate to="/inicio" /> : <Outlet />;
};

export { Private, Public };
