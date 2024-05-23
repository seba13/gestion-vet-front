import { useEffect, useState } from "react";
import Alert, { AlertProperties } from "../Alert/Alert";

import { Tratamiento } from "../../interfaces/Tratamiento";
import { getCurrentDateTimeLocal, parseDate } from "../../utils/utils";
import { IMedicalRecord } from "../../interfaces/MedicalRecord";
import useFetch from "../../hooks/useFetch";

export const FormNewTreatment = ({
  filteredRecord,
  formSaved,
}: {
  formSaved: () => void;
  filteredRecord: IMedicalRecord;
}) => {
  const formInitialData: Tratamiento = {
    costo: 0,
    descripcion: "",
    fecha: parseDate(getCurrentDateTimeLocal()),
    idTratamiento: "",
    tipo: "",
    idFichaClinica: "" || filteredRecord?.idFichaClinica,
  };
  const [formData, setFormData] = useState(formInitialData);
  const [formAlert, setFormAlert] = useState<AlertProperties | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isReady, setIsReady] = useState(false);
  const { fetchData } = useFetch(
    `${import.meta.env.VITE_API_URL}/tratamiento-mascota/ficha-clinica/${
      filteredRecord?.idFichaClinica
    }`,
    {
      method: "POST",
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

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let errors: Array<string> = [];

    if (formData.costo.toString().trim() === "") {
      errors.push("Falta campo costo.");
    }
    if (formData.descripcion.trim() === "") {
      errors.push("Falta campo descripcion.");
    }
    if (formData.fecha.trim() === "") {
      errors.push("Falta campo fecha.");
    }
    if (formData.tipo.trim() === "") {
      errors.push("Falta campo tipo.");
    }
    if (filteredRecord.idFichaClinica?.trim() === "") {
      errors.push("Falta campo idFichaIngreso.");
    }
    if (errors.length > 0) {
      setFormAlert({
        typeOf: "danger",
        messages: errors,
      });
      setShowAlert(true);
    } else {
      fetchData().then((data) => {
        if (data.success) {
          setFormAlert({
            typeOf: "success",
            messages: ["Tratamiento generada con exito! ✅🧾"],
          });
          setIsReady(true);
          setShowAlert(true);
        } else {
          setFormAlert({
            typeOf: "danger",
            messages: ["Hubo problemas al generar Tratamiento❌"],
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

  return (
    <>
      {showAlert && formAlert && (
        <Alert alertProperties={formAlert} handlerCloseAlert={onCloseAlert} />
      )}

      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-around gap-2">
          <label htmlFor="medico" className="form-label w-50 ">
            ID Ficha Clinica
            <input
              type="text"
              className="form-control bg-warning"
              id="medico"
              name="medico"
              value={formData.idFichaClinica || idFichaIngreso}
              placeholder="#"
              disabled
            />
          </label>
          <label htmlFor="fecha" className="form-label w-50 ">
            Fecha Emision
            <input
              type="date"
              className="form-control"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleInputChange}
              placeholder="Fecha emision"
              required
              disabled={isReady}
            />
          </label>
        </div>

        <div className="d-flex justify-content-around gap-2">
          <label htmlFor="tipo" className="form-label w-50 ">
            Tipo tratamiento💊
            <input
              type="text"
              className="form-control"
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
              placeholder="Tipo de tratamiento"
              required
              disabled={isReady}
            />
          </label>
          <label htmlFor="costo" className="form-label w-50 ">
            Costo 💵
            <input
              type="number"
              className="form-control"
              id="costo"
              name="costo"
              value={formData.costo}
              onChange={handleInputChange}
              placeholder="Costo tratamiento"
              required
              disabled={isReady}
            />
          </label>
        </div>

        <div className="d-flex form-group">
          <label
            htmlFor="descripcion"
            className="form-label w-100 m-3 text-center"
          >
            <h5>Descripcion de tratamiento💊</h5>
            <textarea
              className="form-control"
              id="descripcion"
              name="descripcion"
              rows={6}
              value={formData.descripcion}
              onChange={handleInputChange}
              placeholder="Descripción del tratamiento medico...."
              required
              disabled={isReady}
            />
          </label>
        </div>
        <div className="d-flex gap-5">
          <button
            type="submit"
            className="btn btn-success w-100 mt-3"
            disabled={isReady}
          >
            Generar Tratamiento🧾
          </button>
          <button
            type="button"
            className="btn btn-secondary w-100 mt-3"
            onClick={() => setFormData(formInitialData)}
          >
            Limpiar campos
          </button>
        </div>
      </form>
    </>
  );
};
