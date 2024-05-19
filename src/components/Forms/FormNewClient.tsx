import { useState } from "react";
import Alert, { AlertProperties } from "../Alert/Alert"; // Importa la interfaz AlertProperties
import { INewClientForm } from "../../interfaces/formNewClient";

const initialFormData: INewClientForm = {
  apellidoMaterno: "",
  apellidoPaterno: "",
  direccion: "",
  dv: "",
  rut: "",
  email: "",
  nombre: "",
  sexo: "",
  telefono: "",
  fechaNacimiento: "",
};

const handleApiRequest: any = (requestBody: any) => {
  return fetch(`${import.meta.env.VITE_API_URL}/titular-mascota`, {
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

const FormNewClient = () => {
  const [formData, setFormData] = useState<INewClientForm>(initialFormData);
  const [formErrors, setFormErrors] = useState<AlertProperties | null>(null); // Usa la interfaz AlertProperties
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

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let myErrors: string[] = [];
    if (!confirmarFormulario) {
      console.error("Debes confirmar el formulario.");
      myErrors.push("Debes confirmar el formulario.");
    }

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
      console.error("Error falta campo rut.");
      myErrors.push("Falta campo rut.");
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
    if (formData.fechaNacimiento.trim() === "") {
      console.error("Error falta campo Fecha nacimiento.");
      myErrors.push("Falta campo Fecha nacimiento.");
    }

    if (myErrors.length > 0) {
      setFormErrors({ typeOf: "danger", messages: myErrors });
      setShowAlert(true);
    }
    if (myErrors.length === 0) {
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
          <div className="d-flex justify-content-center gap-5">
            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                id="fechaNacimiento"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
              />
            </div>
            <div className=" mt-2">
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
};

export default FormNewClient;
