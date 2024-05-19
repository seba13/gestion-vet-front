import { useState } from "react";
import styles from "./styles/FormPet.module.css";
import Alert, { AlertProperties } from "../Alert/Alert";
import { IFormNewPet } from "../../interfaces/formNewPet";

const formInitialData: IFormNewPet = {
  nombreMascota: "",
  edadMascota: "",
  especie: "",
  genero: "",
  raza: "",
  rutDueno: "",
};

export default function FormNewPet({ onSubmit }: any) {
  const [formData, setFormData] = useState<IFormNewPet>(formInitialData);
  const [formAlert, setFormAlert] = useState<AlertProperties | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

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

    if (formData.nombreMascota.trim() === "") {
      errors.push("Falta campo nombre.");
    }
    if (formData.edadMascota.toString().trim() === "") {
      errors.push("Falta campo edad.");
    }
    if (formData.especie.trim() === "") {
      errors.push("Falta campo especie.");
    }
    if (formData.raza.trim() === "") {
      errors.push("Falta campo raza.");
    }
    if (formData.genero.trim() === "") {
      errors.push("Falta campo genero.");
    }
    if (formData.rutDueno.toString().trim() === "") {
      errors.push("Falta campo rut.");
    }
    if (errors.length > 0) {
      setFormAlert({
        typeOf: "danger",
        messages: errors,
      });
      setShowAlert(true);
    } else {
      onSubmit(formData);
      setFormData(formInitialData);
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
      <div
        className={`d-flex justify-content-center align-items-center flex-column`}
      >
        <h1 className="mb-5">Formulario de registro mascotas</h1>
        <form onSubmit={handleSubmit} className={`${styles.patientForm}`}>
          <div className="d-flex gap-4">
            <div className="mb-3">
              <label htmlFor="rutDueno" className="form-label">
                Rut dueño:
              </label>
              <input
                type="number"
                className="form-control"
                id="rutDueno"
                name="rutDueno"
                value={formData.rutDueno}
                onChange={handleInputChange}
                placeholder="Rut del dueño"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nombreMascota" className="form-label">
                Nombre:
              </label>
              <input
                type="text"
                className="form-control"
                id="nombreMascota"
                name="nombreMascota"
                value={formData.nombreMascota}
                onChange={handleInputChange}
                placeholder="Nombre del paciente"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="edadMascota" className="form-label">
                Edad:
              </label>
              <input
                type="number"
                className="form-control"
                id="edadMascota"
                name="edadMascota"
                value={formData.edadMascota}
                onChange={handleInputChange}
                placeholder="Edad del paciente"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="genero" className="form-label">
              Género:
            </label>
            <select
              className="form-select"
              id="genero"
              name="genero"
              value={formData.genero}
              onChange={handleInputChange}
            >
              <option value="">Seleccionar género</option>
              <option value="macho">Masculino</option>
              <option value="hembra">Femenino</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="especie" className="form-label">
              Especie:
            </label>
            <input
              type="text"
              className="form-control"
              id="especie"
              name="especie"
              value={formData.especie}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="raza" className="form-label">
              Raza:
            </label>
            <input
              type="text"
              className="form-control"
              id="raza"
              name="raza"
              value={formData.raza}
              onChange={handleInputChange}
            />
          </div>
          <div className="d-flex gap-5">
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Registrar nueva mascota
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
