import { useEffect, useState } from "react";
import Alert, { AlertProperties } from "../Alert/Alert";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  Cargos,
  Especialidad,
  EstadoEmpleado,
  IEmployee,
  Sexo,
} from "../../interfaces/Employee";

const initialFormData: IEmployee = {
  apellidoMaterno: "",
  apellidoPaterno: "",
  codMedico: "",
  direccion: "",
  dv: "",
  rut: "",
  email: "",
  nombre: "",
  sexo: "",
  telefono: "",
  fechaIngreso: "",
  fechaNacimiento: "",
  fechaSalida: "",
  idCargo: 0,
  idEmpleado: "",
  idEspecialidad: 0,
  idEstadoEmpleado: 0,
  idPersona: "",
};
const parseDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};
const FormUpdateEmployee: React.FC = () => {
  const { rut = "" } = useParams();
  const [formData, setFormData] = useState<IEmployee>(initialFormData);
  const [formErrors, setFormErrors] = useState<AlertProperties | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReadyForUpdate, setIsReadyForUpdate] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleApiGetRequest = async (rut: string): Promise<void> => {
      setIsLoading(true);
      await fetch(`${import.meta.env.VITE_API_URL}/empleado/rut/${rut}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(requestBody),
      })
        .then((response) => {
          return response.json();
        })
        .then((data: any) => {
          setFormData(data.data);
        })
        .catch((error) => {
          // Maneja los errores
          console.error("ACA Error:", error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    const handleApiUpdateRequest = async (): Promise<void> => {
      setIsLoading(true);
      // {
      //   "idPersona": "67a3ef35-f069-49ee-89ac-b668a6382c52",
      //   "nombre": "Fabian andres",
      //   "apellidoPaterno": "Niclous",
      //   "apellidoMaterno": "Rodriguez",
      //   "fechaNacimiento": "1990-01-01",
      //   "rut": 9878745,
      //   "dv": "k",
      //   "sexo": "M",
      //   "telefono": 97878451,
      //   "direccion": "calle 1",
      //   "email": "fniclous977@gmail.cl"
      // }

      // Empleado:
      // {
      //   "idEmpleado": "###############",
      //   "codMedico": "AAD",
      //   "fechaIngreso": "2021-01-01",
      //   "fechaSalida": "201-01-01",
      //   "idCargo": 1,
      //   "idEstadoEmpleado": 5,
      //   "idEspecialidad": 1
      // }
      const personData = {
        idPersona: formData.idPersona,
        nombre: formData.nombre,
        apellidoPaterno: formData.apellidoPaterno,
        apellidoMaterno: formData.apellidoMaterno,
        fechaNacimiento: parseDate(formData.fechaNacimiento),
        rut: formData.rut,
        dv: formData.dv,
        sexo: formData.sexo,
        telefono: formData.telefono,
        direccion: formData.direccion,
        email: formData.email,
      };
      await fetch(`${import.meta.env.VITE_API_URL}/persona`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(personData),
      })
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          // Maneja los errores
          console.error("Hubo un error: ", error.message);
        })
        .finally(() => {
          const empData = {
            idEmpleado: formData.idEmpleado,
            codMedico: formData.codMedico,
            fechaIngreso: formData.fechaIngreso,
            fechaSalida: formData.fechaSalida,
            idCargo: formData.idCargo,
            idEstadoEmpleado: formData.idEstadoEmpleado,
            idEspecialidad: formData.idEspecialidad,
          };

          fetch(`${import.meta.env.VITE_API_URL}/empleado`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(empData),
          })
            .then((response: any) => {
              if (response.success) {
                setFormErrors({
                  typeOf: "success",
                  messages: ["Empleado actualizado con exito! ✅."],
                } as AlertProperties);
              } else {
                setFormErrors({
                  typeOf: "warning",
                  messages: ["Error al actualizar empleado❌."],
                } as AlertProperties);
              }
            })
            .catch((error) => {
              console.error("Error al editar empleado: ", error.message);
            })
            .finally(() => {
              setShowAlert(true);
              setIsLoading(false);
              setIsReadyForUpdate(false);
              setTimeout(() => {
                navigate("/ver-empleados");
              }, 2500);
            });
        });
    };
    if (!isLoading && !isReadyForUpdate) {
      handleApiGetRequest(rut);
    }
    if (!isLoading && isReadyForUpdate) {
      handleApiUpdateRequest();
      console.log(formData);
    }
  }, [rut, isReadyForUpdate]);
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlerCloseAlert = () => {
    setShowAlert(false);
    setFormErrors(null);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    let myErrors: string[] = [];

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
    if (formData.idEspecialidad.toString().trim() === "") {
      console.error("Error falta campo especialidad.");
      myErrors.push("Falta campo especialidad.");
    }
    if (formData.idCargo.toString().trim() === "") {
      console.error("Error falta campo cargo.");
      myErrors.push("Falta campo cargo.");
    }
    if (formData.idEstadoEmpleado.toString().trim() === "") {
      console.error("Error falta campo estado empleado.");
      myErrors.push("Falta campo estado empleado.");
    }

    if (myErrors.length > 0) {
      setFormErrors({
        typeOf: "danger",
        messages: myErrors,
      } as AlertProperties);
      setShowAlert(true);
    }
    if (myErrors.length === 0) {
      setIsReadyForUpdate(true);
    }
  };

  return (
    <>
      <div>
        {showAlert && (
          <Alert
            alertProperties={formErrors!}
            handlerCloseAlert={handlerCloseAlert}
          />
        )}
      </div>
      <div className={`d-flex justify-content-center align-items-center`}>
        <form onSubmit={handleSubmit} className="">
          <div className="row mb-3">
            <label htmlFor="rut" className="mb-2">
              RUT
            </label>
            <div className="d-flex gap-3">
              <input
                type="number"
                className="form-control w-75"
                id="rut"
                name="rut"
                value={formData.rut}
                onChange={handleInputChange}
                placeholder="Rut aqui"
              />
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
          <div>
            <hr className="mt-4" />
            <h5 className="text-center mb-4">Informacion Personal</h5>
          </div>

          <div className="d-flex gap-3">
            <div className="mb-3">
              <label htmlFor="nombre">
                Nombres
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="apellidoPaterno">
                Paterno
                <input
                  type="text"
                  className="form-control"
                  id="apellidoPaterno"
                  name="apellidoPaterno"
                  value={formData.apellidoPaterno}
                  onChange={handleInputChange}
                  placeholder="Apellido paterno"
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="apellidoMaterno">
                Materno
                <input
                  type="text"
                  className="form-control"
                  id="apellidoMaterno"
                  name="apellidoMaterno"
                  value={formData.apellidoMaterno}
                  onChange={handleInputChange}
                  placeholder="Apellido materno"
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="sexo">
                Sexo
                <select
                  className="form-select"
                  id="sexo"
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar género</option>
                  <option value={Sexo.Masculino}>Masculino</option>
                  <option value={Sexo.Femenino}>Femenino</option>
                </select>
              </label>
            </div>
          </div>

          {/* /////////////////////////////////// */}

          <div className="d-flex justify-content-between mb-3">
            <div className="">
              <label htmlFor="email">
                Correo
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Correo electronico"
                />
              </label>
            </div>
            <div className="">
              <label htmlFor="telefono">
                Telefono
                <input
                  type="number"
                  className="form-control"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="Telefono"
                />
              </label>
            </div>
            <div className="">
              <label htmlFor="direccion">
                Direccion
                <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  placeholder="Direccion"
                />
              </label>
            </div>
            <div>
              <label htmlFor="fechaNacimiento">
                Fecha nacimiento
                <input
                  type="date"
                  className="form-control"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento || ""}
                  onChange={handleInputChange}
                  placeholder="Fecha nacimiento"
                />
              </label>
            </div>
          </div>
          <div>
            <hr className="mt-4" />
            <h5 className="text-center mb-4">Informacion Empleado</h5>
          </div>
          <div className="row mb-3">
            <div className="d-flex justify-content-around">
              <label htmlFor="codMedico">
                #Codigo medico
                <input
                  type="text"
                  className="form-control"
                  id="codMedico"
                  name="codMedico"
                  value={formData.codMedico}
                  onChange={handleInputChange}
                  placeholder="#Codigo medico"
                />
              </label>
            </div>
          </div>
          <div className="row ">
            <div className="d-flex justify-content-between gap-3">
              <label htmlFor="idEstadoEmpleado" className="w-25">
                Estado empleado
                <select
                  className="form-select"
                  id="idEstadoEmpleado"
                  name="idEstadoEmpleado"
                  value={formData.idEstadoEmpleado}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar estado</option>
                  <option value={EstadoEmpleado.Activo}>Activo</option>
                  <option value={EstadoEmpleado.Inactivo}>Inactivo</option>
                  <option value={EstadoEmpleado.Desvinculado}>
                    Desvinculado
                  </option>
                  <option value={EstadoEmpleado.Vacaciones}>Vacaciones</option>
                  <option value={EstadoEmpleado.Licencia}>Licencia</option>
                </select>
              </label>

              <label htmlFor="idCargo" className="w-25">
                Cargo empleado
                <select
                  className="form-select"
                  id="idCargo"
                  name="idCargo"
                  value={formData.idCargo}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar Cargo</option>
                  <option value={Cargos.Veterinario}>Veterinario</option>
                  <option value={Cargos.Enfermero}>Enfermero</option>
                  <option value={Cargos.Recepcionista}>Recepcionista</option>
                  <option value={Cargos.Administrador}>Administrador</option>
                </select>
              </label>
              <label htmlFor="idEspecialidad" className="w-25">
                {" "}
                Especialidad
                <select
                  className="form-select"
                  id="idEspecialidad"
                  name="idEspecialidad"
                  value={formData.idEspecialidad}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar Especialidad</option>
                  <option value={Especialidad.Cirugia}>Cirugia</option>
                  <option value={Especialidad.Dermatologia}>
                    Dermatologia
                  </option>
                  <option value={Especialidad.Cardiologia}>Cardiologia</option>
                  <option value={Especialidad.Oftalmologia}>
                    Oftalmología
                  </option>
                  <option value={Especialidad.Neurologia}>Neurología</option>
                  <option value={Especialidad.Oncologia}>Oncología</option>
                  <option value={Especialidad.Exoticos}>
                    Medicina Animales Exóticos
                  </option>
                  <option value={Especialidad.MedicinaGeneral}>
                    Medicina General
                  </option>
                  <option value={Especialidad.Tens}>Tens</option>
                </select>
              </label>

              <label htmlFor="fechaIngreso">
                Fecha Ingreso
                <input
                  type="date"
                  className="form-control"
                  id="fechaIngreso"
                  name="fechaIngreso"
                  value={formData.fechaIngreso || ""}
                  onChange={handleInputChange}
                  placeholder="Fecha ingreso"
                />
              </label>
              <label htmlFor="fechaSalida">
                Fecha salida
                <input
                  type="date"
                  className="form-control"
                  id="fechaSalida"
                  name="fechaSalida"
                  value={formData.fechaSalida || ""}
                  onChange={handleInputChange}
                  placeholder="Fecha Salida"
                />
              </label>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-5 mt-3">
            <button
              type="submit"
              className="btn btn-primary d-flex w-50 justify-content-center"
            >
              Actualizar empleado
            </button>
            <button
              type="reset"
              className="btn btn-primary d-flex w-50 justify-content-center"
              onClick={() => {
                setFormData(initialFormData);
              }}
            >
              Limpiar
            </button>
          </div>
          <div className=" d-flex justify-content-center ">
            {
              <NavLink
                className={`btn btn-secondary  w-25 mt-5`}
                to={`/ver-empleados`}
              >
                ⬅️ Volver
              </NavLink>
            }
          </div>
        </form>
      </div>
    </>
  );
};

export default FormUpdateEmployee;
