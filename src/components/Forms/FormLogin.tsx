import React, { useState } from "react";
import Alert from "../Alert/Alert";

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

interface AlertProperties {
  typeOf: string;
  messages: string[];
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<AlertProperties | null>(null);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let myErrors: string[] = [];

    if (username.trim() === "") {
      myErrors.push("Falta campo usuario");
    }
    if (password.trim() === "") {
      myErrors.push("Falta campo contraseña");
    }
    if (myErrors.length > 0) {
      setFormErrors({
        typeOf: "danger",
        messages: myErrors,
      });
      setShowAlert(true);
    } else {
      onLogin(username, password);
    }
  };

  const handlerCloseAlert = () => {
    setShowAlert(false);
    setFormErrors(null);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      {showAlert && formErrors && (
        <Alert
          alertProperties={formErrors}
          handlerCloseAlert={handlerCloseAlert}
        />
      )}
      <div className="card p-4">
        <h2 className="mb-4 text-center">Sistema veterinario 😼</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Usuario
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Ingrese usuario"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Ingrese contraseña"
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-100">
              Acceder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
