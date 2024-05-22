import { useEffect, useId, useState } from "react";
import Alert, { AlertProperties } from "../Alert/Alert";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Tratamiento } from "../../interfaces/Tratamiento";
import { parseDate } from "../../utils/utils";
const formInitialData: Tratamiento = {
  tipo: "",
  costo: "",
  descripcion: "",
  fecha: parseDate(new Date().toString()),
  idTratamiento: "",
  idFichaClinica: "",
};
export const FormNewTreatment = ({
  hideModal,
  idMedicalRecord,
}: {
  idMedicalRecord: string;
  hideModal: () => void;
}) => {
  const [formData, setFormData] = useState(formInitialData);
  const [formAlert, setFormAlert] = useState<AlertProperties | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [idToUpdate] = useState<string>(idMedicalRecord);
  const [isReady, setIsReady] = useState(false);
  const { fetchData } = useFetch(
    `${
      import.meta.env.VITE_API_URL
    }/tratamiento-mascota/ficha-clinica/${idToUpdate}`,
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

  const handleSubmit = (event: any) => {
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
      // console.log({ formData });
      fetchData().then((data) => {
        if (data.success) {
          setFormAlert({
            typeOf: "success",
            messages: ["Tratamiento ingresado con exito! ✅💊"],
          });
          setShowAlert(true);
          console.log(formData);
          setFormData(formInitialData);
          setIsReady(true);
          setTimeout(() => {
            hideModal();
          }, 2000);
        } else {
          setFormAlert({
            typeOf: "danger",
            messages: ["Hubo problemas al ingresar Tratamiento❌"],
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
    if (idMedicalRecord) {
      formData.idFichaClinica = idMedicalRecord;
      setFormData({ ...formData });
    }
  }, [idMedicalRecord]);
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
              value={formData.idFichaClinica}
              placeholder="#ID Ficha Clinica"
              disabled
            />
          </label>
          <label htmlFor="descripcion" className="form-label w-50 ">
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
        </div>

        <div className="d-flex justify-content-around gap-2">
          <label htmlFor="descripcion" className="form-label w-50 ">
            Costo $
            <input
              type="number"
              className="form-control"
              id="costo"
              name="costo"
              value={formData.costo}
              onChange={handleInputChange}
              placeholder="Costo tratamiento"
              min={1}
              required
              disabled={isReady}
            />
          </label>
          <label htmlFor="fecha" className="form-label w-50 ">
            Fecha ingreso
            <input
              type="date"
              className="form-control"
              id="fecha"
              name="fecha"
              value={formData.fecha}
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
            <h5>Descripcion de tratamiento💊</h5>
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
          <button
            type="submit"
            className="btn btn-success w-100 mt-3"
            disabled={
              formData.costo.toString().trim() !== "" &&
              formData.descripcion.trim() !== "" &&
              formData.descripcion.trim().length > 3 &&
              formData.tipo.trim() !== "" &&
              formData.fecha.trim() !== ""
                ? false
                : true
            }
          >
            Ingresar tratamiento💊
          </button>
          <button
            type="button"
            className="btn btn-secondary w-100 mt-3"
            onClick={() => setFormData(formInitialData)}
          >
            Limpiar campos
          </button>
          {/* <hr /> */}
        </div>
      </form>
    </>
  );
};
