import { useState } from "react";
import { IFormEmployee } from "../../interfaces/formEmployee";
import Alert, { AlertProperties } from "../Alert/Alert";

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
  const [formErrors, setFormErrors] = useState<AlertProperties | null>(null);
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

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let myErrors: string[] = [];

    if (!confirmarFormulario) {
      myErrors.push("Debes confirmar el formulario.");
    }
    if (formData.nombre.trim() === "") {
      myErrors.push("Falta campo nombre.");
    }
    if (formData.apellidoPaterno.trim() === "") {
      myErrors.push("Falta campo apellido paterno.");
    }
    if (formData.apellidoMaterno.trim() === "") {
      myErrors.push("Falta campo apellido materno.");
    }
    if (formData.dv.trim() === "") {
      myErrors.push("Falta campo dv.");
    }
    if (formData.rut.toString().trim() === "") {
      myErrors.push("Falta campo rut.");
    }
    if (formData.sexo.trim() === "") {
      myErrors.push("Falta campo sexo.");
    }
    if (formData.telefono.toString().trim() === "") {
      myErrors.push("Falta campo telefono.");
    }
    if (formData.direccion.trim() === "") {
      myErrors.push("Falta campo direccion.");
    }
    if (formData.email.trim() === "") {
      myErrors.push("Falta campo email.");
    }
    if (formData.codMedico.trim() === "") {
      myErrors.push("Falta campo codigo medico.");
    }
    if (formData.nombreUsuario.trim() === "") {
      myErrors.push("Falta campo nombre de usuario.");
    }
    if (formData.password.trim() === "") {
      myErrors.push("Falta campo contraseña de usuario.");
    }

    if (myErrors.length > 0) {
      setFormErrors({ typeOf: "danger", messages: myErrors });
      setShowAlert(true);
    } else {
      handleApiRequest(formData)
        .then((result: any) => {
          if (result.success === false) {
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
      {showAlert && formErrors && (
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
