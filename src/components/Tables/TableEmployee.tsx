import {
  Cargos,
  Especialidad,
  EstadoEmpleado,
  IEmployee,
  Sexo,
} from "../../interfaces/Employee";
import { NavLink } from "react-router-dom";
import { parseDate } from "../../utils/utils";
import { useEffect, useState } from "react";
import ModalComponent, { IModalContent } from "../Modal/ModalComponent";
import { FormNewSpecialist } from "../Forms/FormNewSpecialist";
import useFetch from "../../hooks/useFetch";
import { HttpMethods } from "../../interfaces/httpMethods";
import { ISpeciality } from "../../interfaces/specialities";

export interface ITable {
  heads: Array<string>;
  rows: Array<any>;
}

function TableEmployee({ heads, rows }: ITable) {
  const [specialities, setSpecialities] = useState<ISpeciality[]>([]);
  const { loading, fetchData } = useFetch(
    `${import.meta.env.VITE_API_URL}/especialidades`,
    {
      method: HttpMethods.GET,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  useEffect(() => {
    fetchData().then((result) => {
      setSpecialities(result.data);
      console.log(specialities);
    });
  }, [loading]);
  const hideModal = () => {
    setShowModal(false);
  };
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="table-responsive">
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-success mb-2 "
                onClick={handleShowModal}
              >
                ✅ Especialistas
              </button>
            </div>

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
                    <td>
                      {row.sexo === Sexo.Femenino ? "Femenino" : "Masculino"}
                    </td>
                    <td>{EstadoEmpleado[row.idEstadoEmpleado]}</td>
                    <td>{Cargos[row.idCargo]}</td>
                    <td>
                      {specialities.map((sp) => {
                        if (sp.idEspecialidad === row.idEspecialidad) {
                          return sp.tipo;
                        }
                      })}
                    </td>
                    <td className="d-flex justify-content-center">
                      <NavLink
                        className={`btn btn-primary m-1`}
                        to={`/actualizar-empleado/${row.idPersona}`}
                      >
                        Editar✏️
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showModal && (
              <ModalComponent
                showModal={showModal}
                onClose={() => setShowModal(false)}
                modalContent={
                  {
                    body: <FormNewSpecialist hideModal={hideModal} />,
                    title: "Agregar Especialista",
                  } as IModalContent
                }
              ></ModalComponent>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableEmployee;
