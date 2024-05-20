import { useEffect, useState } from "react";
import Alert, { AlertProperties } from "../Alert/Alert";
import { EstadosCita, IAppointment } from "../../interfaces/Appointment";
import useFetch from "../../hooks/useFetch";

const formInitialData: IAppointment = {
  fechaCitaMedica: "",
  horaCitaMedica: "",
  idCitaMedica: "",
  idEstadoCita: EstadosCita.Ninguno,
  idMascota: "",
};
export const FormNewAppointment = () => {
  const [formData, setFormData] = useState<IAppointment>(formInitialData);
  const [formAlert, setFormAlert] = useState<AlertProperties | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isReadyToSave, setisReadyToSave] = useState(false);
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { data, loading, setLoading } = useFetch(
    `${import.meta.env.VITE_API_URL}/cita-medica`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      //   ```json
      //   {
      //     "idCitaMedica": "07ee7083-40f1-436c-be07-15f5033e953e",
      //     "fechaCitaMedica": "2024-01-01",
      //     "horaCitaMedica": "15:30:00"
      //   }
      body: JSON.stringify(formData),
    }
  );
  useEffect(() => {
    if (isReadyToSave) {
      console.log(data);
    }
    if (formData.idMascota.trim() !== "") {
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
      setisReadyToSave(true);
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
              value={formData.idMascota}
              onChange={handleInputChange}
              placeholder="ID# Mascota"
              required
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
              id="sexo"
              name="sexo"
              value={formData.horaCitaMedica}
              onChange={handleInputChange}
            >
              <option value="">Horarios</option>
              <option value="m">09:00</option>
              <option value="m">09:30</option>
              <option value="m">10:00</option>
              <option value="m">10:30</option>
              <option value="m">11:00</option>
              <option value="m">11:30</option>
              <option value="m">12:00</option>
              <option value="m">12:30</option>
              <option value="m">14:00</option>
              <option value="m">14:30</option>
              <option value="m">15:00</option>
              <option value="m">15:30</option>
              <option value="m">16:00</option>
              <option value="m">16:30</option>
              <option value="m">17:00</option>
              <option value="m">17:30</option>
              <option value="m">18:00</option>
              <option value="m">18:30</option>
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
