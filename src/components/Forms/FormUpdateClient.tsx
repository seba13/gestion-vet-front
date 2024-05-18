import { useState } from "react";
import Alert from "../Alert/Alert";
import { IOwner } from "../../interfaces/Owners";
import { Form } from "react-router-dom";

const handleApiRequest = (requestBody: any) => {
  // {
  //   "idPersona": "6ac11a28-59ce-46e7-a95c-d3f47511d500",
  //   "nombre": "Ana",
  //   "apellidoPaterno": "Rodriguez",
  //   "apellidoMaterno": "Rodriguez",
  //   "fechaNacimiento": "1990-01-01",
  //   "rut": 9828745,
  //   "dv": "k",
  //   "sexo": "M",
  //   "telefono": 97878451,
  //   "direccion": "calle 1",
  //   "email": "ana@ana123.cl"
  // }
  console.log(requestBody);
  return fetch(`${import.meta.env.VITE_API_URL}/persona`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data: any) => {
      console.log("DATA:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
};

function FormUpdateClient({ actualOwner, showModal }: any) {
  const [formData, setFormData] = useState<IOwner>(actualOwner[0]);
  const [formErrors, setFormErrors] = useState<object | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let errors: Array<string> = [];

    if (formData.nombre.trim() === "") {
      errors.push("Falta campo nombre.");
    }
    if (formData.apellidoMaterno.trim() === "") {
      errors.push("Falta campo apellido materno.");
    }
    if (formData.apellidoPaterno.trim() === "") {
      errors.push("Falta campo apellido paterno.");
    }
    if (formData.rut.toString().trim() === "") {
      errors.push("Falta campo RUT.");
    }
    if (formData.dv.trim() === "") {
      errors.push("Falta campo DV.");
    }
    if (formData.direccion.trim() === "") {
      errors.push("Falta campo dirección.");
    }
    if (formData.email.trim() === "") {
      errors.push("Falta campo correo.");
    }
    if (formData.fechaNacimiento.trim() === "") {
      errors.push("Falta campo fecha de nacimiento.");
    }
    if (formData.sexo.trim() === "") {
      errors.push("Falta campo sexo.");
    }
    if (formData.telefono.toString().trim() === "") {
      errors.push("Falta campo teléfono.");
    }

    if (errors.length > 0) {
      setFormErrors({
        typeOf: "danger",
        messages: errors,
      });
      setShowAlert(true);
    } else {
      console.log(formData);
      handleApiRequest(formData).then((result: any) => {
        if (result.success === false) {
          setFormErrors({
            typeOf: "danger",
            messages: [`${result.message} ❌.`],
          });
        } else {
          setFormErrors({
            typeOf: "success",
            messages: ["Mascota actualizada con éxito! ✅."],
          });
          setShowAlert(true);
        }
      });

      setTimeout(() => {
        showModal(false);
        setFormErrors(null);
        setShowAlert(false);
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
      <div className="d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit} className="w-100">
          <div className="row">
            <div className="col-md-6 mb-3 ">
              <label htmlFor="rut" className="form-label">
                RUT:
              </label>
              <input
                type="text"
                className="form-control w-100"
                id="rut"
                name="rut"
                value={formData.rut}
                onChange={handleInputChange}
                placeholder="Rut"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="dv" className="form-label">
                DV:
              </label>
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

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombres:
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Nombres"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="apellidoPaterno" className="form-label">
                Apellido Paterno:
              </label>
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
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="apellidoMaterno" className="form-label">
                Apellido Materno:
              </label>
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

            <div className="col-md-6 mb-3">
              <label htmlFor="fechaNacimiento" className="form-label">
                Fecha de Nacimiento:
              </label>
              <input
                type="date"
                className="form-control"
                id="fechaNacimiento"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                placeholder="Fecha de nacimiento"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="sexo" className="form-label">
                Sexo:
              </label>
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

            <div className="col-md-6 mb-3">
              <label htmlFor="telefono" className="form-label">
                Teléfono:
              </label>
              <input
                type="text"
                className="form-control"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                placeholder="Teléfono"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="direccion" className="form-label">
                Dirección:
              </label>
              <input
                type="text"
                className="form-control"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                placeholder="Dirección"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label">
                Correo:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Correo"
              />
            </div>
          </div>

          <div className="d-flex justify-content-around">
            <button type="submit" className="btn btn-primary w-75">
              Actualizar persona
            </button>
            <button
              type="reset"
              className="btn btn-secondary w-45"
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
