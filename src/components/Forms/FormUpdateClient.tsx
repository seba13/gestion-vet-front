import { useState } from "react";
import Alert from "../Alert/Alert";
import { IOwner } from "../../interfaces/Owners";
// Función para manejar cambios en los campos del formulario
const handleApiRequest: any = (requestBody: any) => {
  return fetch(`${import.meta.env.VITE_API_URL}/mascota`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      return response.json();
    })
    .then((data: any) => {
      console.log("DATA:", data);
      return data;
    })
    .catch((error) => {
      // Maneja los errores
      console.error("ACA Error:", error.message);
    });
};

function FormUpdateClient({ actualOwner, showModal }: any) {
  console.log("ACTUAL PET: ", actualOwner);
  const [formData, setFormData] = useState<IOwner>(actualOwner[0]);
  const [formErrors, setFormErrors] = useState<object | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [confirmarFormulario, setConfirmarFormulario] =
    useState<boolean>(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setConfirmarFormulario(checked);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let errors: Array<string> = [];
    if (!confirmarFormulario) {
      console.error("Debes confirmar el formulario.");
      errors.push("Debes confirmar el formulario.");
    }
    // Aquí puedes agregar la lógica para enviar los datos del formulario
    if (formData.nombre.trim() === "") {
      console.error("Error falta campo nombre.");
      errors.push("Falta campo nombre.");
    }

    if (formData.apellidoMaterno.toString().trim() === "") {
      console.error("Error falta campo edad.");
      errors.push("Falta campo edad.");
    }
    if (formData.apellidoMaterno.trim() === "") {
      console.error("Error falta campo especie.");
      errors.push("Falta campo especie.");
    }

    if (formData.rut.toString().trim() === "") {
      console.error("Error falta campo raza.");
      errors.push("Falta campo raza.");
    }
    if (formData.dv.toString().trim() === "") {
      console.error("Error falta campo genero.");
      errors.push("Falta campo genero.");
    }
    if (formData.direccion.trim() === "") {
      console.error("Error falta campo especie.");
      errors.push("Falta campo especie.");
    }
    if (formData.email.trim() === "") {
      console.error("Error falta campo especie.");
      errors.push("Falta campo especie.");
    }
    if (formData.fechaNacimiento.trim() === "") {
      console.error("Error falta campo especie.");
      errors.push("Falta campo especie.");
    }
    if (formData.sexo.trim() === "") {
      console.error("Error falta campo especie.");
      errors.push("Falta campo especie.");
    }
    if (formData.telefono.toString().trim() === "") {
      console.error("Error falta campo especie.");
      errors.push("Falta campo especie.");
    }

    if (errors.length > 0) {
      setFormErrors({
        typeOf: "danger",
        messages: errors,
      });
      setShowAlert(true);
    } else if (errors.length === 0) {
      handleApiRequest(formData).then((result: any) => {
        // console.log("API RESPONSE: ", result);
        if (result.success === false) {
          // console.log(result);
          setFormErrors({
            typeOf: "danger",
            messages: [`${result.message} ❌.`],
          });
        } else {
          setFormErrors({
            typeOf: "success",
            messages: ["Mascota actualizada con exito! ✅."],
          });
          setShowAlert(true);
        }
      });
      // .finally(() => {
      //   setFormErrors(null);
      //   setShowAlert(false);
      //   setConfirmarFormulario(false);
      // });
      // Cerrar el modal
      setTimeout(() => {
        showModal(false);
        setFormErrors(null);
        setShowAlert(false);
        setConfirmarFormulario(false);
        setFormData({
          apellidoMaterno: "",
          apellidoPaterno: "",
          direccion: "",
          dv: "",
          email: "",
          fechaNacimiento: "",
          idDueño: "",
          idPersona: "",
          nombre: "",
          rut: "",
          sexo: "",
          telefono: 0,
        });
      }, 3500);
    }
  };
  const onCloseAlert = () => {
    setShowAlert(false);
    setFormErrors(null);
  };
  return (
    <>
      {showAlert && (
        <Alert alertProperties={formErrors} handlerCloseAlert={onCloseAlert} />
      )}
      <div className={`d-flex justify-content-center align-items-center`}>
        <form onSubmit={handleSubmit} className="">
          <div className="gap-3">
            <div className="mb-3">
              <label htmlFor="idMascota">#ID: </label>

              <input
                type="text"
                className="form-control"
                id="idPersona"
                name="idPersona"
                value={formData.idPersona}
                onChange={handleInputChange}
                placeholder="Id persona aqui"
                disabled
              />
            </div>
            <div className="d-flex flex-column">
              <div className="d-flex gap-3">
                <div className="mb-3">
                  <label htmlFor="nombre">Nombres:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Apellido paterno"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="apellidoPaterno">Paterno:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellidoPaterno"
                    name="apellidoPaterno"
                    value={formData.apellidoPaterno}
                    onChange={handleInputChange}
                    placeholder="Apellido paterno"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="especie">Materno:</label>

                  <input
                    type="text"
                    className="form-control"
                    id="apellidoMaterno"
                    name="apellidoMaterno"
                    value={formData.apellidoMaterno}
                    onChange={handleInputChange}
                    placeholder="Apellido materno"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="fechaNacimiento">Nacimiento:</label>

                <input
                  type="date"
                  className="form-control"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleInputChange}
                  placeholder="Nacimiento"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="sexo">Sexo:</label>

                <select
                  className="form-select"
                  id="sexo"
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar sexo</option>
                  <option value="m">Masculino</option>
                  <option value="f">Femenino</option>
                  <option value="o">Otro</option>
                </select>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-2">
            <label className="" htmlFor="confirmarForm">
              Confirmar cambios:{" "}
              <input
                type="checkbox"
                id="confirmarForm"
                name="confirmarForm"
                checked={confirmarFormulario}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>
          <div className="d-flex justify-content-center gap-5 mt-3">
            <button
              type="submit"
              className="btn btn-primary d-flex w-50 justify-content-center"
            >
              Actualizar mascota
            </button>
            <button
              type="reset"
              className="btn btn-primary d-flex w-50 justify-content-center"
              onClick={() => {
                setFormData({
                  apellidoMaterno: "",
                  apellidoPaterno: "",
                  direccion: "",
                  dv: "",
                  email: "",
                  fechaNacimiento: "",
                  idDueño: "",
                  idPersona: "",
                  nombre: "",
                  rut: "",
                  sexo: "",
                  telefono: 0,
                });
              }}
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormUpdateClient;
