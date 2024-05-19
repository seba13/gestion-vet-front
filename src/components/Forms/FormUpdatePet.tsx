import { useState } from "react";
import Alert, { AlertProperties } from "../Alert/Alert";
import { Pet } from "../../interfaces/Pet";

const handleApiRequest = (requestBody: any) => {
  return fetch(`${import.meta.env.VITE_API_URL}/mascota`, {
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
      console.error("ACA Error:", error.message);
    });
};

function FormUpdatePet({ actualPet, showModal }: any) {
  const [formData, setFormData] = useState<Pet>(actualPet[0]);
  const [formErrors, setFormErrors] = useState<AlertProperties | null>(null);
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
    let errors: Array<string> = [];
    if (!confirmarFormulario) {
      errors.push("Debes confirmar el formulario.");
    }
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
    if (errors.length > 0) {
      setFormErrors({
        typeOf: "danger",
        messages: errors,
      });
      setShowAlert(true);
    } else {
      handleApiRequest(formData).then((result: any) => {
        if (result.success === false) {
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
      setTimeout(() => {
        showModal(false);
        setFormErrors(null);
        setShowAlert(false);
        setConfirmarFormulario(false);
        setFormData({
          edadMascota: 0,
          especie: "",
          genero: "",
          idMascota: formData.idMascota,
          nombreMascota: "",
          raza: "",
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
      {showAlert && formErrors && (
        <Alert alertProperties={formErrors} handlerCloseAlert={onCloseAlert} />
      )}
      <div className={`d-flex justify-content-center align-items-center`}>
        <form onSubmit={handleSubmit} className="">
          <div className="gap-3">
            <label htmlFor="idMascota">#ID: </label>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="idMascota"
                name="idMascota"
                value={formData.idMascota.toString()}
                onChange={handleInputChange}
                placeholder="Id mascota aqui"
                disabled
              />
            </div>
            <div className="d-flex flex-column">
              <div className="d-flex gap-3">
                <div className="mb-3">
                  <label htmlFor="nombreMascota">Nuevo nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombreMascota"
                    name="nombreMascota"
                    value={formData.nombreMascota}
                    onChange={handleInputChange}
                    placeholder="Nombre"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="especie">Nueva especie:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="especie"
                    name="especie"
                    value={formData.especie}
                    onChange={handleInputChange}
                    placeholder="Especie"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="raza">Nueva raza:</label>
                <input
                  type="text"
                  className="form-control"
                  id="raza"
                  name="raza"
                  value={formData.raza}
                  onChange={handleInputChange}
                  placeholder="Raza"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="genero">Nuevo genero:</label>
                <select
                  className="form-select"
                  id="genero"
                  name="genero"
                  value={formData.genero}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar genero</option>
                  <option value="macho">Macho</option>
                  <option value="hembra">Hembra</option>
                  <option value="otro">Otro</option>
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
                  edadMascota: 0,
                  especie: "",
                  genero: "",
                  idMascota: formData.idMascota,
                  nombreMascota: "",
                  raza: "",
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

export default FormUpdatePet;
