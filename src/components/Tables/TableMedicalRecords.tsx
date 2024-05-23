import { useEffect, useState } from "react";
import { IMedicalRecord } from "../../interfaces/MedicalRecord";

import PetProfileModal from "../PetProfileModal/PetProfileModal";
import ModalComponent from "../Modal/ModalComponent";
import FormUpdateClinicalRecord from "../Forms/FormUpdateClinicalRecord";
import { Tab, Tabs } from "react-bootstrap";
import { TableTreatments } from "./TableTreatments";
import useFetch from "../../hooks/useFetch";
import { HttpMethods } from "../../interfaces/httpMethods";
import { Tratamiento } from "../../interfaces/Tratamiento";
import { FormNewTreatment } from "../Forms/FormNewTreatment";
import { IEntryForm } from "../../interfaces/EntryForm";
import { FormUpdateEntryForm } from "../Forms/FormUpdateEntryForm";
import { FormNewEntryForm } from "../Forms/FormNewEntryForm";
export interface ITable {
  heads: Array<string>;
  rows: Array<any>;
  handleUpdate: () => void;
}

export const TableMedicalRecords = ({ heads, rows, handleUpdate }: ITable) => {
  const [selectedId, setSelectedId] = useState<string>("");
  const [filteredRecord, setFilteredRecord] = useState<IMedicalRecord>({
    antecedentes: "",
    enfermedades: "",
    fechaIngreso: "",
    idFichaClinica: "",
    idMascota: "",
    observaciones: "",
    peso: 0,
    idCitaMedica: "",
  });
  const [showModalPets, setShowModalPets] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [treatmentsList, setTreatmentsList] = useState<Tratamiento[]>([]);
  const [showModalTreatment, setShowModalTreatment] = useState(false);
  const [showModalAddTreatment, setShowModalAddTreatment] = useState(false);
  const [showModalFicha, setShowModalFicha] = useState(false);
  const [existsEntryForm, setExistsEntryForm] = useState(false);
  const { fetchData } = useFetch(
    `${
      import.meta.env.VITE_API_URL
    }/tratamientos-mascotas/ficha-clinica/${selectedId}'`,
    {
      method: HttpMethods.GET,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const onClickButtonEdit = (clinicalRecord: IMedicalRecord) => {
    setFilteredRecord(clinicalRecord);
    setShowModalEdit(!showModalEdit);
  };
  const onClickButtonProfile = (row: IMedicalRecord) => {
    setSelectedId(row.idMascota);
    setShowModalPets(!showModalPets);
  };
  const onClickButtonTreatments = (row: IMedicalRecord) => {
    setSelectedId(row.idFichaClinica);
    setFilteredRecord(row);
    setShowModalTreatment(!showModalTreatment);
  };
  const handleTreatmentClick = () => {
    fetchData().then((data) => {
      if (data.success) {
        setTreatmentsList(data.data);
      }
    });
  };
  const handleClickAddTreatment = () => {
    setShowModalAddTreatment(true);
  };
  const onClickButtonFormEntry = async (medicalRecord: IMedicalRecord) => {
    setFilteredRecord(medicalRecord);

    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/ficha-ingreso/Ficha-clinica/${
          medicalRecord?.idFichaClinica
        }`,
        {
          method: HttpMethods.GET,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((data) => {
          return data.json();
        })
        .then((json) => {
          if (json.success) {
            console.log({ json });
            setExistsEntryForm(true);
            setShowModalFicha(!showModalFicha);
          } else {
            setExistsEntryForm(false);
            setShowModalFicha(!showModalFicha);
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Fetch error:", error);
    }
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
                {rows.length > 0 ? (
                  rows.map((row: IMedicalRecord, rowIndex: number) => (
                    <tr key={row.idFichaClinica}>
                      <td>{rowIndex + 1}</td>
                      <td>{row.idMascota.split("-") || "Sin ID Mascota"}</td>
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
                          Mascota
                        </button>

                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => onClickButtonTreatments(row)}
                        >
                          Tratamientos
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            onClickButtonFormEntry(row);
                          }}
                        >
                          Ficha
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => onClickButtonEdit(row)}
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8}>Cargando datos...</td>
                  </tr>
                )}
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
            {showModalTreatment && (
              <ModalComponent
                showModal={showModalTreatment}
                modalContent={{
                  title: "Tratamientos",
                  size: "xl",
                  body: (
                    <Tabs
                      defaultActiveKey="tratamientos"
                      id="pet-profile-tabs"
                      className="mb-3"
                      onSelect={(eventKey) => {
                        if (eventKey === "tratamientos") {
                          handleTreatmentClick();
                        }
                      }}
                    >
                      <Tab eventKey="tratamientos" title="Tratamientos">
                        <div className="d-flex flex-column gap-3">
                          <div className="d-flex gap-2 justify-content-end me-5 pe-5">
                            <button
                              className="btn btn-primary"
                              onClick={() => handleClickAddTreatment()}
                            >
                              Ingresar tratamiento💊
                            </button>
                          </div>
                          <TableTreatments
                            selectedId={selectedId}
                            filteredRecord={filteredRecord}
                          />
                        </div>
                      </Tab>
                    </Tabs>
                  ),
                }}
                onClose={() => setShowModalTreatment(false)}
              ></ModalComponent>
            )}
            {showModalAddTreatment && (
              <ModalComponent
                modalContent={{
                  title: "Agregar Tratamiento💊",
                  body: (
                    <FormNewTreatment
                      hideModal={() =>
                        setShowModalAddTreatment(!showModalAddTreatment)
                      }
                      idMedicalRecord={selectedId}
                    ></FormNewTreatment>
                  ),
                  size: "s",
                }}
                onClose={() => setShowModalAddTreatment(false)}
                showModal={showModalAddTreatment}
              ></ModalComponent>
            )}
            {showModalFicha && (
              <ModalComponent
                modalContent={{
                  title: "Ficha de Ingreso 📝💊",
                  body: existsEntryForm ? (
                    <FormUpdateEntryForm filteredRecord={filteredRecord} />
                  ) : (
                    <FormNewEntryForm filteredRecord={filteredRecord} />
                  ),
                  size: "s",
                }}
                onClose={() => setShowModalFicha(false)}
                showModal={showModalFicha}
              ></ModalComponent>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
