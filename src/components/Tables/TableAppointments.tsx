import { EstadosCita, IAppointment } from "../../interfaces/Appointment";
import { useEffect, useState } from "react";
import ModalComponent from "../Modal/ModalComponent";
import { FormUpdateAppointment } from "../Forms/FormUpdateAppointment";
import { FormNewAppointment } from "../Forms/FormNewAppointment";
import { useLocation, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { HttpMethods } from "../../interfaces/httpMethods";
import { parseDate } from "../../utils/utils";
import { ITable } from "../../interfaces/Table";

const initialData: IAppointment = {
  fechaCitaMedica: "",
  horaCitaMedica: "",
  idCitaMedica: "",
  idEstadoCita: 0,
  idMascota: "",
};
export const TableAppointments = ({ heads, rows, handleUpdate }: ITable) => {
  const { idMascota = "", idCitaMedica = "" } = useParams();
  const location = useLocation().pathname.split("/")[2];
  const [parameters, setParameters] = useState<string>(location); // parametro url para detectar accion
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [filteredData, setFilteredData] = useState<IAppointment>(initialData);
  const { fetchData, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/cita-medica/${idCitaMedica}`,
    {
      method: HttpMethods.GET,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const onClickButton = (row: IAppointment) => {
    row.fechaCitaMedica = parseDate(row.fechaCitaMedica);
    setFilteredData(row);
    setShowModalEdit(true);
  };

  useEffect(() => {
    if (
      parameters &&
      parameters.trim() !== "" &&
      location &&
      parameters === "agendar"
    ) {
      setShowModalAdd(true);
    }
    if (
      parameters &&
      parameters.trim() !== "" &&
      location &&
      parameters === "editar"
    ) {
      //aca logica
      fetchData().then((result) => {
        // console.log("result fetch", result.data);
        setFilteredData(result.data);
      });
      setShowModalEdit(true);
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
                      closeModal={() => {
                        setTimeout(() => {
                          setShowModalEdit(false);
                        }, 2000);
                      }}
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
