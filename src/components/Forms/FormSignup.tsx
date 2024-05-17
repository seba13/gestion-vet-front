import { useState } from "react";
import { IFormEmployee } from "../../interfaces/formEmployee";
import Alert from "../Alert/Alert";
const initialFormData: IFormEmployee = {
  apellidoMaterno: "",
  apellidoPaterno: "",
  codMedico: "",
  password: "",
  direccion: "",
  dv: "",
  rut: "",
  email: "",
  nombre: "",
  nombreUsuario: "",
  sexo: "",
  telefono: "",
};
function FormSignup() {
  const [formData, setFormData] = useState<IFormEmployee>(initialFormData);
  const [formErrors, setFormErrors] = useState<object | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [confirmarFormulario, setConfirmarFormulario] =
    useState<boolean>(false);

  // Función para manejar cambios en los campos del formulario
  const handleApiRequest: any = (requestBody: any) => {
    const petitionBody = requestBody;
    petitionBody.rut = parseInt(petitionBody.rut);
    petitionBody.telefono = parseInt(petitionBody.telefono);
    return fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
      method: "POST",
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

    let myErrors: string[] = [];
    if (!confirmarFormulario) {
      console.error("Debes confirmar el formulario.");
      myErrors.push("Debes confirmar el formulario.");
    }
    // Aquí puedes agregar la lógica para enviar los datos del formulario
    if (formData.nombre.trim() === "") {
      console.error("Error falta campo nombre.");
      myErrors.push("Falta campo nombre.");
    }
    if (formData.apellidoPaterno.trim() === "") {
      console.error("Error falta campo apellido paterno.");
      myErrors.push("Falta campo apellido paterno.");
    }
    if (formData.apellidoMaterno.trim() === "") {
      console.error("Error falta campo apellido materno.");
      myErrors.push("Falta campo apellido materno.");
    }
    if (formData.dv.trim() === "") {
      console.error("Error falta campo dv.");
      myErrors.push("Falta campo dv.");
    }
    if (formData.rut.toString().trim() === "") {
      console.error("Error falta campo dv.");
      myErrors.push("Falta campo dv.");
    }
    if (formData.sexo.trim() === "") {
      console.error("Error falta campo sexo.");
      myErrors.push("Falta campo sexo.");
    }
    if (formData.telefono.toString().trim() === "") {
      console.error("Error falta campo telefono.");
      myErrors.push("Falta campo telefono.");
    }
    if (formData.direccion.trim() === "") {
      console.error("Error falta campo direccion.");
      myErrors.push("Falta campo direccion.");
    }
    if (formData.email.trim() === "") {
      console.error("Error falta campo email.");
      myErrors.push("Falta campo email.");
    }
    if (formData.codMedico.trim() === "") {
      console.error("Error falta campo codigo medico.");
      myErrors.push("Falta campo codigo medico.");
    }
    if (formData.nombreUsuario.trim() === "") {
      console.error("Error falta campo nombre de usuario.");
      myErrors.push("Falta campo nombre de usuario.");
    }
    if (formData.password.trim() === "") {
      console.error("Error falta campo contraseña de usuario.");
      myErrors.push("Falta campo contraseña de usuario.");
    }

    if (myErrors.length > 0) {
      setFormErrors({ typeOf: "danger", messages: myErrors });
      setShowAlert(true);
    }
    if (myErrors.length === 0) {
      handleApiRequest(formData)
        .then((result: any) => {
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
              messages: ["Empleado registrado con exito! ✅."],
            });
          }
        })
        .finally(() => {
          setShowAlert(true);
          // setFormErrors(null);
          // setShowAlert(false);
          setConfirmarFormulario(false);
          // setFormData(initialFormData);
        });
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
          <div className="d-flex gap-3">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Nombre del dueño"
              />
            </div>
            <div className="mb-3">
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
            <div className="mb-3">
              <select
                className="form-select"
                id="sexo"
                name="sexo"
                value={formData.sexo}
                onChange={handleInputChange}
              >
                <option value="">Seleccionar género</option>
                <option value="m">Masculino</option>
                <option value="f">Femenino</option>
                <option value="o">Otro</option>
              </select>
            </div>
          </div>
          <div className="d-flex gap-3">
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                id="rut"
                name="rut"
                value={formData.rut}
                onChange={handleInputChange}
                placeholder="Rut aqui"
              />
            </div>
            -
            <div className="mb-3">
              <input
                type="text"
                className="form-control w-25"
                id="dv"
                name="dv"
                value={formData.dv}
                onChange={handleInputChange}
                placeholder="DV"
              />
            </div>
          </div>

          {/* /////////////////////////////////// */}

          <div className="d-flex gap-3">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="codMedico"
                name="codMedico"
                value={formData.codMedico}
                onChange={handleInputChange}
                placeholder="#Codigo medico"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Correo electronico"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                placeholder="Telefono"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                placeholder="Direccion"
              />
            </div>
          </div>
          <div className="d-flex gap-3">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="nombreUsuario"
                name="nombreUsuario"
                value={formData.nombreUsuario}
                onChange={handleInputChange}
                placeholder="Nombre de usuario"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Contraseña"
              />
            </div>
          </div>

          <div className="d-flex justify-content-center mt-2">
            <label className="" htmlFor="confirmarForm">
              Confirmar registro:{" "}
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
              className="btn btn-success d-flex w-50 justify-content-center"
            >
              Ingresar paciente
            </button>
            <button
              type="reset"
              className="btn btn-warning d-flex w-50 justify-content-center"
              onClick={() => {
                setFormData(initialFormData);
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

export default FormSignup;
