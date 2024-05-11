import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
export const NavbarDashboard = () => {
  const authContext = useContext(AuthContext)!;
  const { logout } = authContext;
  return (
    <nav>
      <ul>
        <NavLink to={"/"} className="btn btn-primary">
          <div>
            <span>
              <i></i>
            </span>
            <span>Inicio</span>
          </div>
        </NavLink>

        <NavLink to={"/registrar-paciente"} className="btn btn-primary">
          <div>
            <span>
              <i></i>
            </span>
            <span>Ingresar paciente</span>
          </div>
        </NavLink>
        <button className="btn btn-primary" onClick={logout}>
          Salir
        </button>
      </ul>
    </nav>
  );
};
