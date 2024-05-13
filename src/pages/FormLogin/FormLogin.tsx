import { useNavigate } from "react-router-dom";
import Login from "../../components/FormLogin/FormLogin";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function FormLogin() {
  const [userCredentials, setUserCredentials] = useState<object | null>(null);
  const { handleChangeSession } = useContext(AuthContext)!;
  const apiUrl = "http://localhost:80";
  const navigate = useNavigate();

  useEffect(() => {
    if (userCredentials) {
      fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      })
        .then((response) => {
          if (response.status === 200) {
            // localStorage.setItem("session-info", {});
            // La petición fue exitosa
            return response.json(); // Devuelve los datos en formato JSON
          } else if (response.status === 401) {
            // El usuario no está autorizado
            throw new Error("Usuario no autorizado");
          } else {
            // Otro tipo de error
            throw new Error("Error en la petición");
          }
        })
        .then((data: any) => {
          const { token, usuario } = data;
          const storage = { token, usuario };
          localStorage.setItem("session-info", JSON.stringify(storage));
          navigate("/");
          handleChangeSession();
          // Hacer algo con los datos obtenidos si la respuesta fue exitosa
        })
        .catch((error) => {
          // Maneja los errores
          console.error("Error:", error);
        });
    }
  }, [userCredentials]);

  const handleLogin = (username: string, password: string) => {
    setUserCredentials({ nombreUsuario: username, password: password });
    console.log(userCredentials);
  };

  return (
    <>
      <Login onLogin={handleLogin} />
    </>
  );
}
