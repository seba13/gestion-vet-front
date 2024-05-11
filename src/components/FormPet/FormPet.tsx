import { useState } from "react";
import { NavbarDashboard } from "../Nabvar/Navbar";
import styles from "./FormPet.module.css";

export default function FormPet() {
  // Estados para los valores del formulario
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    diagnosis: "",
  });

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
    // Aquí puedes agregar la lógica para enviar los datos del formulario
    console.log(formData);
    // Limpia el formulario después del envío
    setFormData({
      name: "",
      age: "",
      gender: "",
      diagnosis: "",
    });
  };

  return (
    <>
      <NavbarDashboard
        inputComponent={null}
        handleInput={null}
      ></NavbarDashboard>
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
              required
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
              required
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
              required
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
              required
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
