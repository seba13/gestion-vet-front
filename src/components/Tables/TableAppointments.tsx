import { EstadosCita, IAppointment } from "../../interfaces/Appointment";
import { useEffect, useState } from "react";
import ModalComponent from "../Modal/ModalComponent";
import { FormUpdateAppointment } from "../Forms/FormUpdateAppointment";
import { FormNewAppointment } from "../Forms/FormNewAppointment";
import { useParams } from "react-router-dom";
export interface ITable {
  heads: Array<string>;
  rows: Array<any>;
  handleUpdate: () => void;
}

const parseDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};
const initialData: IAppointment = {
  fechaCitaMedica: "",
  horaCitaMedica: "",
  idCitaMedica: "",
  idEstadoCita: 0,
  idMascota: "",
};
export const TableAppointments = ({ heads, rows, handleUpdate }: ITable) => {
  const { idMascota = "" } = useParams();
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [filteredData, setFilteredData] = useState<IAppointment>(initialData);
  const onClickButton = (row: IAppointment) => {
    setShowModalEdit(true);
    row.fechaCitaMedica = parseDate(row.fechaCitaMedica);
    setFilteredData(row);
  };
  useEffect(() => {
    if (idMascota.trim() !== "") {
      setShowModalAdd(true);
    }
  }, [idMascota]);
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered text-center ">
              <thead className="table-light">
                <tr>
                  {heads.map((head: string, index: number) => (
                    <th key={index}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row: IAppointment, rowIndex: number) => (
                  <tr key={rowIndex}>
                    <td>{row.idCitaMedica}</td>
                    <td>{parseDate(row.fechaCitaMedica)}</td>
                    <td>{row.horaCitaMedica}</td>
                    <td
                      className={
                        row.idEstadoCita == EstadosCita.Agendado
                          ? "bg-success"
                          : row.idEstadoCita == EstadosCita.Cancelado
                          ? "bg-danger"
                          : "bg-primary"
                      }
                    >
                      {EstadosCita[row.idEstadoCita]}
                    </td>
                    <td className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => onClickButton(row)}
                      >
                        Editar✏️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showModalEdit && !showModalAdd && (
              <ModalComponent
                showModal={showModalEdit}
                onClose={() => setShowModalEdit(!showModalEdit)}
                modalContent={{
                  title: "Editar cita",
                  body: (
                    <FormUpdateAppointment
                      actualAppointment={filteredData}
                      handleUpdate={handleUpdate}
                    ></FormUpdateAppointment>
                  ),
                }}
              ></ModalComponent>
            )}
            {showModalAdd && !showModalEdit && (
              <ModalComponent
                showModal={showModalAdd}
                onClose={() => setShowModalAdd(!showModalAdd)}
                modalContent={{
                  title: "Agendar cita",
                  body: (
                    <FormNewAppointment
                      isIncomingId={idMascota.trim() !== ""}
                      id={idMascota}
                    ></FormNewAppointment>
                  ),
                }}
              ></ModalComponent>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
