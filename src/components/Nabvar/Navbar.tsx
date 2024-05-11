import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import styles from "./Nabbar.module.css";

export const NavbarDashboard = ({ inputComponent: Component, handleInput }) => {
  // Renombré inputComponent a Component para seguir la convención de nombres de componentes con mayúscula inicial
  const authContext = useContext(AuthContext)!;
  const { logout } = authContext;

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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
              <li className="nav-item">
                <NavLink to={"/registrar-paciente"} className="nav-link">
                  <div>
                    <span>
                      <i></i>
                    </span>
                    <span>Ingresar paciente</span>
                  </div>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/"} className="nav-link" onClick={logout}>
                  <div>
                    <span>
                      <i></i>
                    </span>
                    <span>Salir</span>
                  </div>
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link disabled"
                  href="#"
                  tabIndex={-1}
                  aria-disabled="true"
                >
                  Disabled
                </a>
              </li>
            </ul>
            {Component ? <Component returnValue={handleInput} /> : null}
          </div>
        </div>
      </nav>
    </>
  );
};
