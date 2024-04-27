import { ReactNode, createContext, useState } from "react";
import { LoginResult } from "../services/endpoins";

interface AuthContext {
  user: LoginResult | null;
  signIn: (data: LoginResult) => void;
  signed: boolean;
  isAdmin: boolean;
  signOut: () => void;
}
export const AuthContext = createContext<AuthContext>({
  user: null,
  signIn: () => {},
  signed: false,
  isAdmin: false,
  signOut: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const loginInformation = localStorage.getItem("login");
  const [user, setUser] = useState<LoginResult | null>(
    loginInformation ? JSON.parse(loginInformation) : null
  );

  const signIn = (data: LoginResult) => {
    setUser(data);
    localStorage.setItem("login", JSON.stringify(data));
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signed: !!user,
        isAdmin: Boolean(user?.flag_admin),
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
