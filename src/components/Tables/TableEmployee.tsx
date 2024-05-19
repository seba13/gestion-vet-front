import { IEmployee } from "../../interfaces/Employee";

export interface ITable {
  heads: Array<string>;
  rows: Array<any>;
  keys: Array<string>; // Lista de claves para definir el orden de los valores en cada fila
}
const parseDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};
function TableComponent({ heads, rows }: ITable) {
  // Transformamos las filas dentro del componente TableComponent
  // const transformedRows = rows.map((row) => keys.map((key) => row[key]));
  const onClickButtonList = () => {};
  const onClickButtonEdit = () => {};
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
                    <td>{row.sexo}</td>
                    <td>{row.idEstadoEmpleado}</td>
                    <td>{row.idCargo}</td>
                    <td>{row.idEspecialidad}</td>
                    <td className="d-flex justify-content-center">
                      <button
                        className={`btn btn-primary m-1`}
                        onClick={() => onClickButtonList()}
                      >
                        Perfil📋
                      </button>
                      <button
                        className={`btn btn-primary m-1`}
                        onClick={() => onClickButtonEdit()}
                      >
                        Editar✏️
                      </button>
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

export default TableComponent;
