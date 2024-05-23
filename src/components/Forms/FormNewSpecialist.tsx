import { useEffect, useState } from "react";
import Alert, { AlertProperties } from "../Alert/Alert";
import { EstadosCita, IAppointment } from "../../interfaces/Appointment";
import { useNavigate } from "react-router-dom";

export const FormNewSpecialist = ({ hideModal }: { hideModal: () => void }) => {
  const formInitialData = {
    tipo: "",
  };
  const [formData, setFormData] = useState(formInitialData);
  const [formAlert, setFormAlert] = useState<AlertProperties | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const navigate = useNavigate();
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
      const response = fetch(`${import.meta.env.VITE_API_URL}/especialidad`, {
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
              messages: ["Especialidad agregada con exito! ✅🕛"],
            });
            setShowAlert(true);
            setTimeout(() => {
              hideModal();
            }, 2000);
          } else {
            setFormAlert({
              typeOf: "danger",
              messages: ["Hubo problemas al crear especialidad"],
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
          <label htmlFor="rutDueno" className="form-label w-50 ">
            Nueva especialidad
            <input
              type="text"
              className="form-control"
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
              placeholder="Eespecialidad"
              required
            />
          </label>
          <hr />
        </div>

        <div className="d-flex gap-5">
          <button
            type="submit"
            className="btn btn-success w-100 mt-3"
            disabled={formData.tipo.length < 4 ? true : false}
          >
            Registar especialidad 👨‍⚕️
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
