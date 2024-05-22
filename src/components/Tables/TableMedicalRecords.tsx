import { useState } from "react";
import { IMedicalRecord } from "../../interfaces/MedicalRecord";

import ModalComponent from "../Modal/ModalComponent";
import PetProfileModal from "../PetProfileModal/PetProfileModal";
import { NavLink } from "react-router-dom";
export interface ITable {
  heads: Array<string>;
  rows: Array<any>;
  // handleUpdate: () => void;
}

export const TableMedicalRecords = ({ heads, rows }: ITable) => {
  const [selectedId, setSelectedId] = useState<string>("");
  const [show, setShow] = useState(false);
  const onClickButtonEdit = (row: IMedicalRecord) => {
    console.log("click");
  };
  const onClickButtonProfile = (row: IMedicalRecord) => {
    setSelectedId(row.idMascota);
    setShow(!show);
  };

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
                {rows.map((row: IMedicalRecord, rowIndex: number) => (
                  <tr key={row.idFichaClinica}>
                    <td>{rowIndex + 1}</td>
                    <td>{row.idMascota || "Sin ID Mascota"}</td>
                    <td>{row.idCitaMedica || "Atencion normal"}</td>
                    <td>{row.fechaIngreso}</td>
                    <td>{row.enfermedades}</td>
                    <td>{row.peso}</td>
                    <td>{row.observaciones}</td>

                    <td className="d-flex justify-content-center gap-2">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => onClickButtonProfile(row)}
                      >
                        Ver mascota👁️
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => onClickButtonEdit(row)}
                      >
                        Editar✏️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {show && (
              <PetProfileModal
                idMascota={selectedId}
                show={show}
                onHide={() => setShow(false)}
              ></PetProfileModal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
