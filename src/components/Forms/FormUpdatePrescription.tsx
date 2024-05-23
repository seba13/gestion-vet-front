import { useEffect, useState } from "react";
import Alert, { AlertProperties } from "../Alert/Alert";
import useFetch from "../../hooks/useFetch";
import { IPrescription } from "../../interfaces/Prescription";
import { getCurrentDateTimeLocal, parseDate } from "../../utils/utils";
import { HttpMethods } from "../../interfaces/httpMethods";

const formInitialData: IPrescription = {
  descripcion: "",
  fechaEmision: parseDate(getCurrentDateTimeLocal()),
  medico: "",
  retieneReceta: 0,
  vigencia: 7,
  idReceta: "",
  idFichaIngreso: "",
};

export const FormUpdatePrescription = ({
  prescription,
  formSaved,
}: {
  formSaved: () => void;
  prescription: IPrescription;
}) => {
  const [formData, setFormData] = useState(formInitialData);
  const [formAlert, setFormAlert] = useState<AlertProperties | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isReady, setIsReady] = useState(false);
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const { fetchData } = useFetch(
    `${import.meta.env.VITE_API_URL}/receta-mascota`,
    {
      method: HttpMethods.PATCH,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let errors: Array<string> = [];
    if (formData.descripcion.trim() === "") {
      errors.push("Falta campo descripcion.");
    }
    if (formData.idReceta?.trim() === "") {
      errors.push("Falta campo idReceta.");
    }
    if (formData.retieneReceta.toString().trim() === "") {
      errors.push("Falta campo retieneReceta.");
    }
    if (formData.vigencia.toString().trim() === "") {
      errors.push("Falta campo vigencia.");
    }
    if (formData.fechaEmision.trim() === "") {
      errors.push("Falta campo fechaEmision.");
    }
    if (errors.length > 0) {
      setFormAlert({
        typeOf: "danger",
        messages: errors,
      });
      setShowAlert(true);
    } else {
      formData.vigencia = parseInt(formData.vigencia);
      setFormData({ ...formData });
      fetchData().then((results) => {
        if (results.success) {
          setFormAlert({
            typeOf: "success",
            messages: ["Receta actualizada con exito! ✅🧾"],
          });
          setShowAlert(true);
          formSaved();
        } else {
          setFormAlert({
            typeOf: "warning",
            messages: ["Error al actualizar receta ❌🧾"],
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
    if (prescription) {
      setFormData({
        ...prescription,
        fechaEmision: parseDate(prescription.fechaEmision),
      });
    }
  }, [prescription]);
  return (
    <>
      {showAlert && formAlert && (
        <Alert alertProperties={formAlert} handlerCloseAlert={onCloseAlert} />
      )}

      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-around gap-2">
          <label htmlFor="medico" className="form-label w-50 ">
            N° Receta
            <input
              type="text"
              className="form-control bg-warning"
              id="medico"
              name="medico"
              value={formData?.idReceta || "N° receta no existe"}
              placeholder="#ID Medico"
              disabled
            />
          </label>
          <label htmlFor="retieneReceta" className="form-label w-50 ">
            Retencion de receta
            <select
              className="form-select"
              id="retieneReceta"
              name="retieneReceta"
              value={formData.retieneReceta}
              onChange={handleInputChange}
            >
              <option value="">Seleccionar género</option>
              <option value="1">Receta retenida</option>
              <option value="0">Receta liberada</option>
            </select>
          </label>
        </div>

        <div className="d-flex justify-content-around gap-2">
          <label htmlFor="vigencia" className="form-label w-50 ">
            Vigencia (Dias)
            <input
              type="number"
              className="form-control"
              id="vigencia"
              name="vigencia"
              value={formData.vigencia}
              onChange={handleInputChange}
              placeholder="Vigencia receta"
              required
              maxLength={3}
              minLength={1}
              min={1}
              max={120}
              disabled={isReady}
            />
          </label>
          <label htmlFor="fechaEmision" className="form-label w-50 ">
            Fecha Emision
            <input
              type="date"
              className="form-control"
              id="fechaEmision"
              name="fechaEmision"
              value={formData.fechaEmision}
              onChange={handleInputChange}
              placeholder="Fecha emision"
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
            className="btn btn-primary w-100 mt-3"
            disabled={isReady}
          >
            Actualizar receta🧾
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
