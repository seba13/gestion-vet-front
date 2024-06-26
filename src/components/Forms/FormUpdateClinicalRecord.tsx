import { useEffect, useState } from "react";
import styles from "./styles/FormPet.module.css";
import Alert, { AlertProperties } from "../Alert/Alert";
import { IFormNewRecord } from "../../interfaces/formNewRecord";
import { getCurrentDateTimeLocal } from "../../utils/utils";
import useFetch from "../../hooks/useFetch";
import { IMedicalRecord } from "../../interfaces/MedicalRecord";

export default function FormUpdateClinicalRecord({
  medicalRecord,
  handleUpdate,
}: {
  medicalRecord: IMedicalRecord;
  handleUpdate: () => void;
}) {
  const formInitialData: IMedicalRecord = {
    antecedentes: "" || medicalRecord.antecedentes,
    enfermedades: "" || medicalRecord.enfermedades,
    fechaIngreso: getCurrentDateTimeLocal(),
    idMascota: "" || medicalRecord.idMascota,
    observaciones: "" || medicalRecord.observaciones,
    peso: 0 || medicalRecord.peso,
    idFichaClinica: "" || medicalRecord.idFichaClinica,
    idCitaMedica: "" || medicalRecord.idCitaMedica,
  };
  const [formData, setFormData] = useState<IFormNewRecord>(formInitialData);
  const [formAlert, setFormAlert] = useState<AlertProperties | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { fetchData } = useFetch(
    `${import.meta.env.VITE_API_URL}/ficha-clinica`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let errors: Array<string> = [];

    if (formData.idMascota.trim() === "") {
      errors.push("Falta campo idMascota.");
    }
    if (formData.fechaIngreso.toString().trim() === "") {
      errors.push("Falta campo fechaIngreso.");
    }
    if (formData.observaciones.trim() === "") {
      errors.push("Falta campo observaciones.");
    }
    if (
      formData.peso.toString().trim() === "" ||
      formData.peso.toString().trim() === "0"
    ) {
      errors.push("Falta campo peso.");
    }
    if (errors.length > 0) {
      setFormAlert({
        typeOf: "danger",
        messages: errors,
      });
      setShowAlert(true);
    } else {
      fetchData().then((result: any) => {
        if (result.success) {
          setFormAlert({
            typeOf: "success",
            messages: ["Registro ficha clinica actualizada con exito! 🕛✅"],
          });
          setFormData(formInitialData);
          setShowAlert(true);
          setTimeout(() => {
            handleUpdate();
          }, 1500);
        } else {
          setFormAlert({
            typeOf: "warning",
            messages: ["No se pudo actualizar la ficha clinica ❌"],
          });
          setShowAlert(true);
        }
      });
    }
  };

  const onCloseAlert = () => {
    setShowAlert(false);
    setFormAlert(null);
  };

  useEffect(() => {
    if (medicalRecord.idCitaMedica) {
      setFormData(medicalRecord);
    }
  }, [medicalRecord]);
  return (
    <>
      {showAlert && formAlert && (
        <Alert alertProperties={formAlert} handlerCloseAlert={onCloseAlert} />
      )}
      <div
        className={`d-flex justify-content-center align-items-center flex-column`}
      >
        <form onSubmit={handleSubmit} className={`${styles.patientForm}`}>
          <h5 className="text-center mb-4">Identificacion</h5>

          <div className="mb-3 d-flex justify-content-between gap-3">
            <label htmlFor="idMascota" className="form-label">
              ID Mascota
              <input
                type="text"
                className="form-control"
                id="idMascota"
                name="idMascota"
                value={formData.idMascota}
                placeholder="#0000000A"
                disabled
              />
            </label>
            <label htmlFor="edadMascota" className="form-label">
              Peso
              <input
                type="number"
                className="form-control"
                id="peso"
                name="peso"
                value={formData.peso}
                onChange={handleInputChange}
                placeholder="Peso en KG"
              />
            </label>
          </div>
          <div>
            <hr />
            <h5 className="text-center mb-4">Antecedentes</h5>
          </div>
          <div className="mb-3 d-flex justify-content-around gap-3">
            <label htmlFor="antecedentes" className="form-label">
              Antecedentes:
              <input
                type="text"
                className="form-control w-100"
                id="antecedentes"
                name="antecedentes"
                value={formData.antecedentes}
                onChange={handleInputChange}
                placeholder="Antecedentes de mascota aqui."
              />
            </label>

            <label htmlFor="enfermedades" className="form-label">
              Enfermedades
              <input
                type="text"
                className="form-control"
                id="enfermedades"
                name="enfermedades"
                value={formData.enfermedades}
                onChange={handleInputChange}
                placeholder="Escribir aqui"
              />{" "}
            </label>
            <label htmlFor="fechaIngreso" className="form-label">
              Fecha ingreso:
              <input
                type="datetime-local"
                className="form-control"
                id="fechaIngreso"
                name="fechaIngreso"
                value={formData.fechaIngreso}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="observaciones" className="form-label">
              Observaciones:
            </label>
            <input
              type="text"
              className="form-control"
              id="observaciones"
              name="observaciones"
              value={formData.observaciones}
              onChange={handleInputChange}
              placeholder="vómitos, diarrea, sin apetito, etc, etc...."
            />
          </div>
          <div className="d-flex gap-5">
            <button type="submit" className="btn btn-success w-100 mt-3">
              Actualizar Ficha Clinica 📋
            </button>
            <button
              type="button"
              className="btn btn-warning w-100 mt-3"
              onClick={() => setFormData(formInitialData)}
            >
              Limpiar formulario
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
