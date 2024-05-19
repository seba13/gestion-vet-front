import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Alert from "../../components/Alert/Alert";
import "./UserProfilePage.css";
import userProfileImage from "../../img/perfilDogDoc.jpg"; // Importa la imagen

interface AlertProperties {
  typeOf: string;
  messages: string[];
}

const UserProfilePage: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext) {
      navigate("/login");
    }
  }, [authContext, navigate]);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const {
    nombreUsuario,
    nombreEmpleado,
    apellidoPaterno,
    idUsuario,
    handleChangeSession,
    logout,
  } = authContext;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alertProperties, setAlertProperties] =
    useState<AlertProperties | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const validateForm = async () => {
    const errors: string[] = [];

    if (!oldPassword.trim()) {
      errors.push("La contraseña antigua es obligatoria.");
    }

    if (!newPassword.trim()) {
      errors.push("La nueva contraseña es obligatoria.");
    }

    if (!confirmPassword.trim()) {
      errors.push("La confirmación de la nueva contraseña es obligatoria.");
    } else if (newPassword !== confirmPassword) {
      errors.push("Las nuevas contraseñas no coinciden.");
    }

    if (errors.length > 0) {
      setAlertProperties({ typeOf: "danger", messages: errors });
      setShowAlert(true);
      return false;
    }

    // Verificar la contraseña antigua
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/user/${idUsuario}/validate-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Contraseña incorrecta.");
      }
    } catch (error) {
      setAlertProperties({
        typeOf: "danger",
        messages: ["Contraseña incorrecta."],
      });
      setShowAlert(true);
      return false;
    }

    return true;
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!(await validateForm())) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/${idUsuario}/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error changing password.");
      }

      setMessage("Password changed successfully.");
      setAlertProperties({
        typeOf: "success",
        messages: ["Password changed successfully."],
      });
      setShowAlert(true);
      handleChangeSession(); // Update session information if needed
    } catch (error) {
      setMessage("Error changing password.");
      setAlertProperties({
        typeOf: "danger",
        messages: ["Error changing password."],
      });
      setShowAlert(true);
      console.error(error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setAlertProperties(null);
  };

  return (
    <div className="container mt-5 user-profile">
      {showAlert && alertProperties && (
        <Alert
          alertProperties={alertProperties}
          handlerCloseAlert={handleCloseAlert}
        />
      )}
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">¡Bienvenido! {nombreUsuario}</h2>
          <div className="d-flex align-items-center user-info mb-4">
            <img
              src={userProfileImage}
              alt="User Profile"
              className="user-profile-image mb-3"
            />
            <div className="ml-3">
              <label>
                <strong>Nombre:</strong> {nombreEmpleado} {apellidoPaterno}
              </label>
            </div>
          </div>
          <form onSubmit={handlePasswordChange}>
            <h3 className="mb-3">Cambiar Contraseña</h3>
            <div className="form-group">
              <label>Contraseña Actual:</label>
              <div className="input-group">
                <input
                  type={showOldPassword ? "text" : "password"}
                  className="form-control"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Nueva Contraseña:</label>
              <div className="input-group">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Confirm Contraseña:</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Cambiar Contraseña
            </button>
            {message && <p className="mt-3">{message}</p>}
          </form>
          <button onClick={handleLogout} className="btn btn-danger mt-4">
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
