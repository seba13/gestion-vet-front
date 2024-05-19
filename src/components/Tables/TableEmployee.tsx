import {
  Cargos,
  Especialidad,
  EstadoEmpleado,
  IEmployee,
  Sexo,
} from "../../interfaces/Employee";
import { NavLink } from "react-router-dom";

export interface ITable {
  heads: Array<string>;
  rows: Array<any>;
}

const parseDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};
function TableEmployee({ heads, rows }: ITable) {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered text-center">
              <thead className="table-light">
                <tr>
                  {heads.map((head: string, index: number) => (
                    <th key={index}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row: IEmployee, rowIndex: number) => (
                  <tr key={rowIndex}>
                    <td>
                      {row.rut} - {row.dv}
                    </td>
                    <td>{row.nombre}</td>
                    <td>{row.apellidoPaterno}</td>
                    <td>{row.apellidoMaterno}</td>
                    <td>{parseDate(row.fechaNacimiento)}</td>
                    <td>{row.direccion}</td>
                    <td>{row.telefono}</td>
                    <td>{row.email}</td>
                    <td>{row.sexo === Sexo.Femenino ? "Femenino" : "Masculino"}</td>
                    <td>{EstadoEmpleado[row.idEstadoEmpleado]}</td>
                    <td>{Cargos[row.idCargo]}</td>
                    <td>{Especialidad[row.idEspecialidad]}</td>
                    <td className="d-flex justify-content-center">
                      <NavLink
                        className={`btn btn-primary m-1`}
                        to={`/actualizar-empleado/rut/${row.rut}`}
                      >
                        Editar✏️
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableEmployee;
