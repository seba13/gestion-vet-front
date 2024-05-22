import { useEffect, useState } from "react";
import Alert, { AlertProperties } from "../Alert/Alert";
import useFetch from "../../hooks/useFetch";
import { Tratamiento } from "../../interfaces/Tratamiento";
import { parseDate } from "../../utils/utils";

export const FormUpdateTreatment = ({
  hideModal,
  idMedicalTreatment,
  idClinicalRecord,
  onUpdate,
}: {
  hideModal: () => void;
  onUpdate: () => void;
  idMedicalTreatment: string;
  idClinicalRecord: string;
}) => {
  const initialForm: Tratamiento = {
    tipo: "",
    costo: 0,
    descripcion: "",
    fecha: parseDate(new Date().toString()),
    idTratamiento: "",
    idFichaClinica: "",
  };

  const [formData, setFormData] = useState<Tratamiento>(initialForm);
  const [formAlert, setFormAlert] = useState<AlertProperties | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isReady, setIsReady] = useState(false);
  const [medicalTreatment, setMedicalTreatment] = useState("");

  const { fetchData } = useFetch(
    `${
      import.meta.env.VITE_API_URL
    }/tratamiento-mascota/tratamiento/${medicalTreatment}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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

    if (formData.tipo.trim() === "") {
      errors.push("Falta campo especialidad.");
    }

    if (errors.length > 0) {
      setFormAlert({
        typeOf: "danger",
        messages: errors,
      });
      setShowAlert(true);
    } else {
      formData.fecha = parseDate(formData.fecha);
      setFormData({ ...formData });
      console.log(formData);
      await fetch(`${import.meta.env.VITE_API_URL}/tratamiento-mascota`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((results) => {
          return results.json();
        })
        .then((json) => {
          if (json.success) {
            setFormAlert({
              typeOf: "success",
              messages: ["Tratamiento actualizado con éxito! ✅💊"],
            });
            setShowAlert(true);
            setFormData(initialForm);
            setIsReady(true);
            setTimeout(() => {
              onUpdate();
              hideModal();
            }, 1500);
          } else {
            setFormAlert({
              typeOf: "danger",
              messages: ["Hubo problemas al actualizar Tratamiento❌"],
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
    if (idMedicalTreatment) {
      setMedicalTreatment(idMedicalTreatment);
    }
  }, [idMedicalTreatment]);
  useEffect(() => {
    console.log({ medicalTreatment });
    if (medicalTreatment) {
      fetchData().then((data) => {
        console.log({ data });
        setFormData({ ...data.data });
      });
    }
  }, [medicalTreatment]);
  return (
    <>
      {showAlert && formAlert && (
        <Alert alertProperties={formAlert} handlerCloseAlert={onCloseAlert} />
      )}

      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-around gap-2">
          <label htmlFor="idFichaClinica" className="form-label w-50 ">
            ID Ficha Clinica
            <input
              type="text"
              className="form-control bg-warning"
              id="idFichaClinica"
              name="idFichaClinica"
              value={idClinicalRecord}
              placeholder="#ID Ficha Clinica"
              disabled
            />
          </label>
          <label htmlFor="idFichaClinica" className="form-label w-50 ">
            ID Tratamiento medico
            <input
              type="text"
              className="form-control bg-warning"
              id="idMedicalTreatment"
              name="idMedicalTreatment"
              value={idMedicalTreatment}
              placeholder="#ID Tratamiento"
              disabled
            />
          </label>
        </div>

        <div className="d-flex justify-content-around gap-2">
          <label htmlFor="tipo" className="form-label w-50">
            Tratamiento
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
          <label htmlFor="costo" className="form-label w-50">
            Costo $
            <input
              type="number"
              className="form-control"
              id="costo"
              name="costo"
              value={parseInt(formData.costo)}
              onChange={handleInputChange}
              placeholder="Costo tratamiento"
              min={1}
              required
              disabled={isReady}
            />
          </label>
          <label htmlFor="fecha" className="form-label w-50">
            Fecha ingreso
            <input
              type="date"
              className="form-control"
              id="fecha"
              name="fecha"
              value={parseDate(formData.fecha)}
              onChange={handleInputChange}
              placeholder="Fecha actual"
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
            <h5>Descripción de tratamiento💊</h5>
            <textarea
              className="form-control"
              id="descripcion"
              name="descripcion"
              rows={6}
              value={formData.descripcion}
              onChange={handleInputChange}
              placeholder="Descripción del tratamiento"
              required
              disabled={isReady}
            />
          </label>
        </div>
        <div className="d-flex gap-5">
          <button type="submit" className="btn btn-success w-100 mt-3">
            Actualizar tratamiento🩹
          </button>
          <button
            type="button"
            className="btn btn-secondary w-100 mt-3"
            onClick={() => setFormData(initialForm)}
          >
            Limpiar campos
          </button>
        </div>
      </form>
    </>
  );
};
