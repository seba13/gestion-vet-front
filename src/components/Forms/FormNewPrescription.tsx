import { useEffect, useState } from "react";
import Alert, { AlertProperties } from "../Alert/Alert";
import useFetch from "../../hooks/useFetch";
import { IPrescription } from "../../interfaces/Prescription";
import { getCurrentDateTimeLocal, parseDate } from "../../utils/utils";

const formInitialData: IPrescription = {
  descripcion: "",
  fechaEmision: parseDate(getCurrentDateTimeLocal()),
  medico: "",
  retieneReceta: 0,
  vigencia: 7,
  idReceta: "",
  idFichaIngreso: "",
};

export const FormNewTreatment = ({
  idFichaIngreso,
  formSaved,
}: {
  formSaved: () => void;
  idFichaIngreso: string;
}) => {
  const tempId = localStorage.getItem("session-info");
  const [formData, setFormData] = useState(formInitialData);
  const [formAlert, setFormAlert] = useState<AlertProperties | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isReady, setIsReady] = useState(false);
  const [doctorId, setDoctorId] = useState("");

  useEffect(() => {
    if (tempId) {
      let parsed = JSON.parse(tempId);
      setDoctorId(parsed.usuario.idEmpleado);
    }
  }, [tempId]);

  useEffect(() => {
    if (idFichaIngreso) {
      setFormData((prevFormData) => ({ ...prevFormData, idFichaIngreso }));
    }
  }, [idFichaIngreso]);

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
    if (formData.descripcion.trim() === "") {
      errors.push("Falta campo descripcion.");
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
      const updatedFormData = { ...formData, idFichaIngreso, medico: doctorId };
      setFormData(updatedFormData);

      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/receta-mascota/ficha-ingreso/${idFichaIngreso}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFormData),
          }
        );
        const data = await response.json();
        if (data.success) {
          setFormAlert({
            typeOf: "success",
            messages: ["Receta generada con exito! ✅🧾"],
          });
          setIsReady(true);
          setShowAlert(true);
          formSaved();
        } else {
          setFormAlert({
            typeOf: "danger",
            messages: ["Hubo problemas al generar la receta❌"],
          });
          setShowAlert(true);
        }
      } catch (error) {
        setFormAlert({
          typeOf: "danger",
          messages: ["Error en la comunicación con el servidor❌"],
        });
        setShowAlert(true);
      }
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
            ID Medico
            <input
              type="text"
              className="form-control bg-warning"
              id="medico"
              name="medico"
              value={formData.medico || doctorId}
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
            className="btn btn-success w-100 mt-3"
            disabled={isReady}
          >
            Generar receta🧾
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
