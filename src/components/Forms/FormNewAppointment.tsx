import { useEffect, useState } from "react";
import Alert, { AlertProperties } from "../Alert/Alert";
import { EstadosCita, IAppointment } from "../../interfaces/Appointment";
import { parseDate } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

export const FormNewAppointment = ({
  isIncomingId,
  id,
}: {
  isIncomingId: boolean;
  id: string;
}) => {
  const formInitialData: IAppointment = {
    fechaCitaMedica: "",
    horaCitaMedica: "",
    idCitaMedica: "",
    idEstadoCita: EstadosCita.Agendado,
    idMascota: "",
  };
  const [formData, setFormData] = useState<IAppointment>(formInitialData);
  const [formAlert, setFormAlert] = useState<AlertProperties | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isReadyToSave, setisReadyToSave] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (id) {
      setisReadyToSave(true);
    } else {
      setisReadyToSave(false);
    }
  }, [formData.idMascota]);

  // useEffect(() => {
  //   if (formData.idMascota.trim() !== "") {
  //     setisReadyToSave(!isReadyToSave);
  //   }
  // }, []);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    let errors: Array<string> = [];

    if (formData.horaCitaMedica.trim() === "") {
      errors.push("Falta campo hora.");
    }

    if (formData.horaCitaMedica.trim() === "") {
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
      // delete formData.idCitaMedica;
      formData.fechaCitaMedica = parseDate(formData.fechaCitaMedica);
      formData.idMascota = id;
      const response = fetch(`${import.meta.env.VITE_API_URL}/cita-medica`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((data) => {
          return data.json();
        })
        .then((json) => {
          console.log(json);
          if (json.success) {
            setFormAlert({
              typeOf: "success",
              messages: ["Cita agendada con exito! ✅🕛"],
            });
            setShowAlert(true);
            setTimeout(() => {
              navigate("/mascotas");
            }, 1500);
          } else {
            setFormAlert({
              typeOf: "danger",
              messages: ["Hubo problemas al agendar la cita❌"],
            });
            setShowAlert(true);
          }
        })
        .catch((error: any) => {
          console.error("error: ", error);
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
          <label htmlFor="rutDueno" className="form-label w-50">
            N° ID mascota
            <input
              type="text"
              className="form-control"
              id="idMascota"
              name="idMascota"
              value={formData.idMascota || id}
              onChange={handleInputChange}
              placeholder="ID# Mascota"
              required
              disabled={isIncomingId}
            />
          </label>
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
          <label htmlFor="sexo" className="form-label w-50">
            Horarios
            <select
              className="form-select"
              id="horaCitaMedica"
              name="horaCitaMedica"
              value={formData.horaCitaMedica}
              onChange={handleInputChange}
              required
            >
              <option value="">Horarios</option>
              <option value="09:00">09:00</option>
              <option value="09:30">09:30</option>
              <option value="10:00">10:00</option>
              <option value="10:30">10:30</option>
              <option value="11:00">11:00</option>
              <option value="11:30">11:30</option>
              <option value="12:00">12:00</option>
              <option value="12:30">12:30</option>
              <option value="14:00">14:00</option>
              <option value="14:30">14:30</option>
              <option value="15:00">15:00</option>
              <option value="15:30">15:30</option>
              <option value="16:00">16:00</option>
              <option value="16:30">16:30</option>
              <option value="17:00">17:00</option>
              <option value="17:30">17:30</option>
              <option value="18:00">18:00</option>
              <option value="18:30">18:30</option>
            </select>
          </label>

          <hr />
        </div>

        <div className="d-flex gap-5">
          <button
            type="submit"
            className="btn btn-success w-100 mt-3"
            disabled={!isReadyToSave}
          >
            Agendar cita 🕛
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
