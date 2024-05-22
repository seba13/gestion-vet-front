import { useEffect, useState } from "react";
import { IMedicalRecord } from "../../interfaces/MedicalRecord";

import PetProfileModal from "../PetProfileModal/PetProfileModal";
import ModalComponent from "../Modal/ModalComponent";
import FormUpdateClinicalRecord from "../Forms/FormUpdateClinicalRecord";
export interface ITable {
  heads: Array<string>;
  rows: Array<any>;
  handleUpdate: () => void;
}

export const TableMedicalRecords = ({ heads, rows, handleUpdate }: ITable) => {
  const [selectedId, setSelectedId] = useState<string>("");
  const [filteredRecord, setFilteredRecord] = useState({});
  const [showModalPets, setShowModalPets] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const onClickButtonEdit = (row: IMedicalRecord) => {
    setFilteredRecord(row);
    setShowModalEdit(!showModalEdit);
  };
  const onClickButtonProfile = (row: IMedicalRecord) => {
    setSelectedId(row.idMascota);
    setShowModalPets(!showModalPets);
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
            {showModalPets && (
              <PetProfileModal
                idMascota={selectedId}
                show={showModalPets}
                onHide={() => setShowModalPets(false)}
              ></PetProfileModal>
            )}
            {showModalEdit && (
              <ModalComponent
                showModal={showModalEdit}
                onClose={() => setShowModalEdit(false)}
                modalContent={{
                  title: "Editar Ficha Clinica",
                  body: (
                    <FormUpdateClinicalRecord
                      medicalRecord={filteredRecord}
                      handleUpdate={handleUpdate}
                    ></FormUpdateClinicalRecord>
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
