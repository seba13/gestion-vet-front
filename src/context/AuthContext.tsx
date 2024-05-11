import React, { createContext, useEffect, useMemo, useState } from "react";
import { AuthenticateUser } from "../interfaces/authenticateUser";

export const AuthContext = createContext<AuthenticateUser | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [sessionInfo, setSessionInfo] = useState<any | null>(null);
  const [usuario, setUsuario] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState<boolean | null>(null);

  useEffect(() => {
    const storageData = localStorage.getItem("session-info");
    if (storageData) {
      const parsedData = JSON.parse(storageData);
      setUsuario(parsedData.username);
      setIsLogged(parsedData.isLogged);
      // console.log(sessionInfo)
    }
  }, [sessionInfo]); // Solo se ejecuta una vez al montar el componente

  const handleChangeSession = useMemo(
    () => () => {
      const storageData = localStorage.getItem("session-info");
      if (storageData) {
        const parsedData = JSON.parse(storageData);
        setSessionInfo(parsedData);
      }
    },
    []
  );

  useEffect(() => {
    handleChangeSession();
  }, [handleChangeSession]); // Se ejecuta cada vez que handleChangeSession cambia

  const validateSession = () => {
    return sessionInfo ? sessionInfo.isLogged : false;
  };

  const logout = () => {
    localStorage.removeItem("session-info");
    setSessionInfo(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        validateSession,
        sessionInfo,
        handleChangeSession,
        usuario,
        isLogged,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
