import React, { createContext, useEffect, useMemo, useState } from "react";
import { AuthenticateUser } from "../interfaces/authenticateUser";

export const AuthContext = createContext<AuthenticateUser>(
  {} as AuthenticateUser
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [nombreUsuario, setNombreUsuario] = useState<string | null>(null);
  const [idUsuario, setIdUsuario] = useState<string | null>(null);
  const [idEmpleado, setIdEmpleado] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storageData = localStorage.getItem("session-info");
    if (storageData) {
      const parsedData = JSON.parse(storageData);
      setNombreUsuario(parsedData.usuario.nombreUsuario);
      setIdEmpleado(parsedData.usuario.idEmpleado);
      setIdUsuario(parsedData.usuario.idUsuario);
      setToken(parsedData.token);
      // console.log(sessionInfo)
    }
  }, [token]); // Solo se ejecuta una vez al montar el componente

  const handleChangeSession = useMemo(
    () => () => {
      const storageData = localStorage.getItem("session-info");
      if (storageData) {
        const parsedData = JSON.parse(storageData);
        setToken(parsedData.token!);
      }
    },
    []
  );
  // const handleChangeToken = useMemo(
  //   () => () => {
  //     console.log("entra en handleChangeToken");

  //     if (cookies.get("cookie-token")) {
  //       console.log("se setea token de cookie");
  //       setToken(cookies.get("cookie-token"));
  //     }
  //   },
  //   []
  // );
  useEffect(() => {
    handleChangeSession();
  }, [handleChangeSession]); // Se ejecuta cada vez que handleChangeSession cambia

  const validateSession = () => {
    return new Promise<boolean>((resolve) => {
      if (!token) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  };

  const logout = () => {
    localStorage.removeItem("session-info");
    setIdEmpleado(null);
    setIdUsuario(null);
    setNombreUsuario(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        validateSession,
        handleChangeSession,
        nombreUsuario,
        idEmpleado,
        idUsuario,
        token,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
