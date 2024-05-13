import { useState } from "react";
import { NavbarDashboard } from "../Nabvar/Navbar";
import styles from "./FormPet.module.css";
import Alert from "../Alert/Alert";

export default function FormPet() {
  // Estados para los valores del formulario
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    diagnosis: "",
  });
  const [formErrors, setFormErrors] = useState<object | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event: any) => {
    event.preventDefault();
    let errors: Array<string> = [];
    // Aquí puedes agregar la lógica para enviar los datos del formulario
    console.log(formData);
    if (formData.name.trim() === "") {
      console.error("Error falta campo nombre.");
      errors.push("Falta campo nombre.");
    }
    if (formData.gender.trim() === "") {
      console.error("Error falta campo genero.");
      errors.push("Falta campo genero.");
    }
    if (formData.diagnosis.trim() === "") {
      console.error("Error falta campo diagnostico.");
      errors.push("Falta campo diagnostico.");
    }
    if (formData.age.trim() === "") {
      console.error("Error falta campo edad.");
      errors.push("Falta campo edad.");
    }
    setFormErrors({
      typeOfAlert: "danger",
      errors: errors,
    });
    setShowAlert(true);
    // Limpia el formulario después del envío
    setFormData({
      name: "",
      age: "",
      gender: "",
      diagnosis: "",
    });
  };
  const onCloseAlert = () => {
    setShowAlert(false);
  };
  return (
    <>
      {showAlert && (
        <Alert alertProperties={formErrors} handlerCloseAlert={onCloseAlert} />
      )}
      <div className={`d-flex justify-content-center align-items-center`}>
        <form onSubmit={handleSubmit} className={`${styles.patientForm}`}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre del paciente:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nombre del paciente"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Edad del paciente:
            </label>
            <input
              type="number"
              className="form-control"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Edad del paciente"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Género del paciente:
            </label>
            <select
              className="form-select"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="">Seleccionar género</option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="diagnosis" className="form-label">
              Diagnóstico:
            </label>
            <textarea
              className="form-control"
              id="diagnosis"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleInputChange}
              placeholder="Diagnóstico del paciente"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Ingresar paciente
          </button>
        </form>
      </div>
    </>
  );
}
