import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import styles from "./Nabbar.module.css";

export const NavbarDashboard: React.FC = () => {
  const { logout, nombreUsuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    logout();
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-light bg-light mb-4 ${styles.principalNav}`}
      >
        <div className="container-fluid">
          <NavLink to={"/"} className="navbar-brand">
            🐶
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item">
                <NavLink to={"/"} className="nav-link active">
                  <div>
                    <span>
                      <i></i>
                    </span>
                    <span>Inicio</span>
                  </div>
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ display: nombreUsuario !== "admin" ? "" : "none" }}
                >
                  Empleados
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    {" "}
                    <NavLink to={"/ver-empleados"} className="nav-link">
                      <div>
                        <span>
                          <i></i>
                        </span>
                        <span>Ver empleados</span>
                      </div>
                    </NavLink>
                  </li>
                  <li className="dropdown-item">
                    {" "}
                    <NavLink to={"/nuevo-empleado"} className="nav-link">
                      <div>
                        <span>
                          <i></i>
                        </span>
                        <span>Nuevo empleado</span>
                      </div>
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dueños mascotas
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <NavLink to={"/dueños"} className="nav-link">
                      <div>
                        <span>
                          <i></i>
                        </span>
                        <span>Ver dueños</span>
                      </div>
                    </NavLink>
                  </li>
                  <li className="dropdown-item">
                    {" "}
                    <NavLink
                      to={"/registrar/titular-mascota"}
                      className="nav-link"
                    >
                      <div>
                        <span>
                          <i></i>
                        </span>
                        <span>Registrar dueño</span>
                      </div>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mascotas
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <NavLink to={"/mascotas"} className="nav-link active">
                      <div>
                        <span>
                          <i></i>
                        </span>
                        <span>Ver mascotas</span>
                      </div>
                    </NavLink>
                  </li>
                  <li className="dropdown-item">
                    <NavLink to={"/nueva-mascota"} className="nav-link">
                      <div>
                        <span>
                          <i></i>
                        </span>
                        <span>Nueva mascota</span>
                      </div>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink to={"/user-profile"} className="nav-link">
                  <div>
                    <span>
                      <i></i>
                    </span>
                    <span>Perfil</span>
                  </div>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/"} className="nav-link" onClick={handleLogout}>
                  <div>
                    <span>
                      <i></i>
                    </span>
                    <span>Salir</span>
                  </div>
                </NavLink>
              </li>
            </ul>
            {/* {Component ? <Component returnValue={handleInput} /> : null} */}
          </div>
        </div>
      </nav>
    </>
  );
};
