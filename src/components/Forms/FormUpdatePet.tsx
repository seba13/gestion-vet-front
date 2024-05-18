import { useState } from "react";
import Alert from "../Alert/Alert";
import { Pet } from "../../interfaces/Pet";
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

function FormUpdatePet({ actualPet, showModal }: any) {
  console.log("ACTUAL PET: ", actualPet);
  const [formData, setFormData] = useState<Pet>(actualPet[0]);
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
    // event.preventDefault();

    // let myErrors: string[] = [];
    // if (!confirmarFormulario) {
    //   console.error("Debes confirmar el formulario.");
    //   myErrors.push("Debes confirmar el formulario.");
    // }
    // // Aquí puedes agregar la lógica para enviar los datos del formulario
    // if (formData.nombreMascota.trim() === "") {
    //   console.error("Error falta campo nombre.");
    //   myErrors.push("Falta campo nombre.");
    // }

    // if (formData.edadMascota.toString().trim() === "") {
    //   console.error("Error falta campo edad.");
    //   myErrors.push("Falta campo edad.");
    // }
    // if (formData.especie.trim() === "") {
    //   console.error("Error falta campo especie.");
    //   myErrors.push("Falta campo especie.");
    // }
    // if (formData.raza.toString().trim() === "") {
    //   console.error("Error falta campo raza.");
    //   myErrors.push("Falta campo raza.");
    // }
    // if (formData.genero.toString().trim() === "") {
    //   console.error("Error falta campo genero.");
    //   myErrors.push("Falta campo genero.");
    // }

    // if (myErrors.length > 0) {
    //   setFormErrors({ typeOf: "danger", messages: myErrors });
    //   setShowAlert(true);
    // }
    // if (myErrors.length === 0) {
    //   handleApiRequest(formData)
    //     .then((result: any) => {
    //       // console.log("API RESPONSE: ", result);
    //       if (result.success === false) {
    //         // console.log(result);
    //         setFormErrors({
    //           typeOf: "danger",
    //           messages: [`${result.message} ❌.`],
    //         });
    //       } else {
    //         setFormErrors({
    //           typeOf: "success",
    //           messages: ["Mascota actualizada con exito! ✅."],
    //         });
    //         setShowAlert(true);
    //       }
    //     })
    //     .finally(() => {
    //       setFormErrors(null);
    //       setShowAlert(false);
    //       setConfirmarFormulario(false);
    //       setFormData({
    //         edadMascota: 0,
    //         especie: "",
    //         genero: "",
    //         idMascota: formData.idMascota,
    //         nombreMascota: "",
    //         raza: "",
    //       });
    //     });
    //   setTimeout(() => {
    //     showModal(false);
    //   }, 3000);
    //   console.log("Form data: ", formData);
    // }
    event.preventDefault();
    let errors: Array<string> = [];
    if (!confirmarFormulario) {
      console.error("Debes confirmar el formulario.");
      errors.push("Debes confirmar el formulario.");
    }
    // Aquí puedes agregar la lógica para enviar los datos del formulario
    if (formData.nombreMascota.trim() === "") {
      console.error("Error falta campo nombre.");
      errors.push("Falta campo nombre.");
    }

    if (formData.edadMascota.toString().trim() === "") {
      console.error("Error falta campo edad.");
      errors.push("Falta campo edad.");
    }
    if (formData.especie.trim() === "") {
      console.error("Error falta campo especie.");
      errors.push("Falta campo especie.");
    }
    if (formData.raza.toString().trim() === "") {
      console.error("Error falta campo raza.");
      errors.push("Falta campo raza.");
    }
    if (formData.genero.toString().trim() === "") {
      console.error("Error falta campo genero.");
      errors.push("Falta campo genero.");
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
      {showAlert && (
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
