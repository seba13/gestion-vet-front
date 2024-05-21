import { useEffect, useState } from "react";
import Alert, { AlertProperties } from "../Alert/Alert";
import { EstadosCita, IAppointment } from "../../interfaces/Appointment";
import useFetch from "../../hooks/useFetch";
import { HttpMethods } from "../../interfaces/httpMethods";

const formInitialData: IAppointment = {
  fechaCitaMedica: "",
  horaCitaMedica: "",
  idCitaMedica: "",
  idEstadoCita: 0,
  idMascota: "",
};
export const FormUpdateAppointment = ({
  actualAppointment,
  handleUpdate,
}: {
  actualAppointment: IAppointment;
  handleUpdate: () => void;
}) => {
  const [formData, setFormData] = useState<IAppointment>(actualAppointment);
  const [formAlert, setFormAlert] = useState<AlertProperties | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isReadyToUpdate, setisReadyToUpdate] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleInputSelect = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: parseInt(value),
    });
  };

  useEffect(() => {
    if (isReadyToUpdate) {
      console.log(formData);
      setisReadyToUpdate(false);
      const results = fetch(`${import.meta.env.VITE_API_URL}/cita-medica`, {
        method: HttpMethods.PATCH,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          console.log(json);
          if (json.success) {
            setFormAlert({
              typeOf: "success",
              messages: ["Cita editada con exito! ✏️✅"],
            });
            setShowAlert(true);
            handleUpdate();
          } else {
            setFormAlert({
              typeOf: "warning",
              messages: ["Error interno al agendar cita ❌"],
            });
            setShowAlert(true);
          }
        })
        .catch((error) => console.error("Errror: ", error.message));
    }
  }, [isReadyToUpdate]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let errors: Array<string> = [];

    if (formData.horaCitaMedica.toString().trim() === "") {
      errors.push("Falta campo hora.");
    }

    if (formData.fechaCitaMedica.toString().trim() === "") {
      errors.push("Falta campo fecha.");
    }
    if (formData.idEstadoCita.toString().trim() === "") {
      errors.push("Falta campo estado cita.");
    }

    if (errors.length > 0) {
      setFormAlert({
        typeOf: "danger",
        messages: errors,
      });
      setShowAlert(true);
    } else {
      setisReadyToUpdate(true);
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
        <div className="d-flex justify-content-around">
          <label htmlFor="rutDueno" className="form-label">
            Fecha
            <input
              type="date"
              className="form-control"
              id="fechaCitaMedica"
              name="fechaCitaMedica"
              value={formData.fechaCitaMedica}
              onChange={handleInputChange}
              placeholder="Fecha cita medica"
              required
            />
          </label>
          <label htmlFor="idEstadoCita" className="form-label">
            Estado cita
            <select
              className="form-select"
              id="idEstadoCita"
              name="idEstadoCita"
              value={formData.idEstadoCita}
              onChange={handleInputSelect}
            >
              <option value={EstadosCita.Agendado}>Agendado</option>
              <option value={EstadosCita.Cancelado}>Cancelado</option>
              <option value={EstadosCita.Finalizado}>Finalizado</option>
            </select>
          </label>
          <label htmlFor="sexo" className="form-label">
            Horarios
            <select
              className="form-select"
              id="horaCitaMedica"
              name="horaCitaMedica"
              value={formData.horaCitaMedica}
              onChange={handleInputChange}
            >
              <option value="">Horarios</option>
              <option value="09:00:00">09:00</option>
              <option value="09:30:00">09:30</option>
              <option value="10:00:00">10:00</option>
              <option value="10:30:00">10:30</option>
              <option value="11:00:00">11:00</option>
              <option value="11:30:00">11:30</option>
              <option value="12:00:00">12:00</option>
              <option value="12:30:00">12:30</option>
              <option value="14:00:00">14:00</option>
              <option value="14:30:00">14:30</option>
              <option value="15:00:00">15:00</option>
              <option value="15:30:00">15:30</option>
              <option value="16:00:00">16:00</option>
              <option value="16:30:00">16:30</option>
              <option value="17:00:00">17:00</option>
              <option value="17:30:00">17:30</option>
              <option value="18:00:00">18:00</option>
              <option value="18:30:00">18:30</option>
            </select>
          </label>

          <hr />
        </div>

        <div className="d-flex gap-5">
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Editar cita 🕛
          </button>
          <button
            type="button"
            className="btn btn-warning w-100 mt-3"
            onClick={() => setFormData(formInitialData)}
          >
            Limpiar campos
          </button>
        </div>
      </form>
    </>
  );
};
