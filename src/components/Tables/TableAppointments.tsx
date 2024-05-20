import { IAppointment } from "../../interfaces/Appointment";
import { useState } from "react";
import ModalComponent from "../Modal/ModalComponent";
import { FormUpdateAppointment } from "../Forms/FormUpdateAppointment";
import { FormNewAppointment } from "../Forms/FormNewAppointment";
export interface ITable {
  heads: Array<string>;
  rows: Array<any>;
}

const parseDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

export const TableAppointments = ({ heads, rows }: ITable) => {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const onClickButton = (parameter: any) => {
    setShowModalEdit(true);
  };
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
                {rows.map((row: IAppointment, rowIndex: number) => (
                  <tr key={rowIndex}>
                    <td>{row.idCitaMedica}</td>
                    <td>{parseDate(row.fechaCitaMedica)}</td>
                    <td>{row.horaCitaMedica}</td>
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
                  body: <FormUpdateAppointment></FormUpdateAppointment>,
                }}
              ></ModalComponent>
            )}
            {showModalAdd && !showModalEdit && (
              <ModalComponent
                showModal={showModalAdd}
                onClose={() => setShowModalAdd(!showModalAdd)}
                modalContent={{
                  title: "Agendar cita",
                  body: <FormNewAppointment></FormNewAppointment>,
                }}
              ></ModalComponent>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
