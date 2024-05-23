import { useEffect, useState } from "react";
import Alert, { AlertProperties } from "../Alert/Alert";
import { IEntryForm } from "../../interfaces/EntryForm";
import useFetch from "../../hooks/useFetch";
import { IMedicalRecord } from "../../interfaces/MedicalRecord";
import { getCurrentDateTimeLocal, parseDate } from "../../utils/utils";
import ModalComponent from "../Modal/ModalComponent";

export const FormUpdateEntryForm = ({
  filteredRecord,
}: {
  filteredRecord: IMedicalRecord;
}) => {
  const formInitialData: IEntryForm = {
    antecedentes: "",
    fechaIngreso: parseDate(getCurrentDateTimeLocal()),
    idFichaClinica: "" || filteredRecord.idFichaClinica,
    observaciones: "",
    diagnostico: "",
    fechaAlta: parseDate(getCurrentDateTimeLocal()),
    idEstados: 9,
    sintomas: "",
    temperatura: 1,
  };
  const [formData, setFormData] = useState<IEntryForm>(formInitialData);
  const [formAlert, setFormAlert] = useState<AlertProperties | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState(false);
  const [existsEntryForm, setExistsEntryForm] = useState(false);

  const { fetchData } = useFetch(
    `${import.meta.env.VITE_API_URL}/ficha-ingreso/Ficha-clinica/${
      filteredRecord?.idFichaClinica
    }`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let errors: Array<string> = [];

    if (filteredRecord!.idFichaClinica.trim() === "") {
      errors.push("Falta campo idFichaClinica.");
    }
    if (filteredRecord!.idMascota?.toString().trim() === "") {
      errors.push("Falta campo idMascota.");
    }
    // ///
    if (formData.idEstados.toString().trim() === "") {
      errors.push("Falta campo idEstados.");
    }

    if (formData.sintomas?.trim() === "") {
      errors.push("Falta campo sintomas.");
    }
    if (formData.fechaIngreso?.toString().trim() === "") {
      errors.push("Falta campo fechaIngreso.");
    }
    if (formData.antecedentes?.trim() === "") {
      errors.push("Falta campo antecedentes.");
    }
    if (errors.length > 0) {
      setFormAlert({
        typeOf: "danger",
        messages: errors,
      });
      setShowAlert(true);
    } else {
      formData.idFichaClinica = filteredRecord!.idFichaClinica;
      formData.fechaAlta = parseDate(formData.fechaAlta);
      formData.fechaIngreso = parseDate(formData.fechaIngreso);
      setFormData({ ...formData });
      if (existsEntryForm) {
        fetch(`${import.meta.env.VITE_API_URL}/ficha-ingreso`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            if (json.success) {
              setFormAlert({
                typeOf: "success",
                messages: ["Ficha de ingreso actualizada correctamente✅"],
              });
              setShowAlert(true);
              setIsSaved(true);
            } else {
              setFormAlert({
                typeOf: "danger",
                messages: ["Error al actualizar ficha❌"],
              });
              setShowAlert(true);
            }
          })
          .catch((error) => {
            console.error({ error });
          });
      }
    }
  };

  const onCloseAlert = () => {
    setShowAlert(false);
    setFormAlert(null);
  };
  useEffect(() => {
    if (filteredRecord) {
      fetchData().then((data) => {
        if (data) {
          setFormData({ ...data.data });
          setExistsEntryForm(true);
        }
      });
    }
  }, [filteredRecord]);

  return (
    <>
      {showAlert && formAlert && (
        <Alert alertProperties={formAlert} handlerCloseAlert={onCloseAlert} />
      )}
      <div
        className={`d-flex justify-content-center align-items-center flex-column`}
      >
        <div>
          <form onSubmit={handleSubmit} className="p-2">
            <div className="mb-3 d-flex justify-content-around gap-3">
              <div className="row">
                <label htmlFor="idFichaClinica" className="form-label">
                  {filteredRecord?.idFichaClinica ? "✅" : "❌"}
                  ID Ficha Clinica
                  <input
                    type="text"
                    className={`form-control w-75 ${
                      filteredRecord?.idFichaClinica
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                    id="idFichaClinica"
                    name="idFichaClinica"
                    value={filteredRecord?.idFichaClinica || ""}
                    placeholder="#0000000A"
                    disabled
                  />
                </label>

                <label htmlFor="idFichaClinica" className="form-label">
                  {filteredRecord?.idFichaClinica ? "✅" : "❌"}
                  ID Mascota
                  <input
                    type="text"
                    className={`w-75 form-control ${
                      filteredRecord?.idMascota ? "bg-success" : "bg-danger"
                    }`}
                    id="idMascota"
                    name="idMascota"
                    value={filteredRecord?.idMascota || ""}
                    placeholder="#0000000A"
                    disabled
                  />
                </label>
              </div>
              <div className="text-center me-5 pe-5">
                <label htmlFor="idEstados" className="form-label">
                  [Estado Ficha Actual]
                  <select
                    className={`form-select ${
                      formData.idEstados === 9
                        ? "bg-warning"
                        : formData.idEstados === 1
                        ? "bg-success"
                        : ""
                    }`}
                    id="idEstados"
                    name="idEstados"
                    value={formData.idEstados}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccionar estado de atencion</option>
                    <option value={1}>{"Activo"}</option>
                    <option value={2}>{"Inactivo"}</option>
                    <option value={3}>{"En Espera"}</option>
                    <option value={4}>{"En Tratamiento"}</option>
                    <option value={5}>{"Dado de alta"}</option>
                    <option value={6}>{"En Observacion"}</option>
                    <option value={7}>{"En Recuperacion"}</option>
                    <option value={8}>{"En Espera de pago"}</option>
                    <option value={9}>{"En Proceso"}</option>
                    <option value={10}>{"Cancelado"}</option>
                  </select>
                </label>
                <label htmlFor="temperatura" className="form-label col-8">
                  Temperatura C°:
                  <input
                    type="number"
                    className="form-control bg-info"
                    id="temperatura"
                    name="temperatura"
                    value={formData.temperatura}
                    onChange={handleInputChange}
                    placeholder="Escribir temperatura aqui..  "
                  />
                </label>
              </div>

              <div className="row w-25 text-start">
                <label htmlFor="fechaIngreso" className="form-label">
                  Fecha de Ingreso
                  <input
                    type="date"
                    className="form-control"
                    id="fechaIngreso"
                    name="fechaIngreso"
                    value={formData.fechaIngreso}
                    onChange={handleInputChange}
                    placeholder="Fecha de ingreso"
                  />{" "}
                </label>
                <label htmlFor="fechaAlta" className="form-label">
                  Fecha de Alta:
                  <input
                    type="date"
                    className="form-control"
                    id="fechaAlta"
                    name="fechaAlta"
                    value={formData.fechaAlta}
                    onChange={handleInputChange}
                    disabled
                  />
                </label>
              </div>
            </div>
            <div>
              <hr />
              <h5 className="text-center">Antecedentes</h5>
            </div>
            <div className="row justify-content-around m-2">
              <label htmlFor="sintomas" className="form-label">
                Sintomas
                <input
                  type="text"
                  className="form-control"
                  id="sintomas"
                  name="sintomas"
                  value={formData.sintomas}
                  onChange={handleInputChange}
                  placeholder="Ej: Diarrea acuosa y frecuente durante los últimos tres días..."
                  required
                  disabled={isSaved}
                />
              </label>

              <label htmlFor="antecedentes" className="form-label">
                Antecedentes:
                <input
                  type="text"
                  className="form-control w-100"
                  id="antecedentes"
                  name="antecedentes"
                  value={formData.antecedentes}
                  onChange={handleInputChange}
                  placeholder="Ej: Comenzó con diarrea hace tres días con...."
                  required
                  disabled={isSaved}
                />
              </label>

              <label htmlFor="observaciones" className="form-label">
                Observaciones:
                <input
                  type="text"
                  className="form-control"
                  id="observaciones"
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleInputChange}
                  placeholder="Instrucciones al propietario para monitorear la ingesta de agua y comida de Mascota, así como la consistencia de sus heces."
                  disabled={isSaved}
                />
              </label>
            </div>
            <hr />

            <div className="d-flex justify-content-center">
              <span className="">🩹</span>
              <h5 className="">Diagnostico</h5>
              <span className="">💊</span>
            </div>
            <div className="row">
              <label
                htmlFor="diagnostico"
                className="form-label w-100 m-3 text-center"
              >
                <textarea
                  className="form-control"
                  id="diagnostico"
                  name="diagnostico"
                  rows={6}
                  value={formData.diagnostico}
                  onChange={handleInputChange}
                  disabled={isSaved}
                  placeholder="Escribir diagnostico, tratamiento, recomendaciones, etc, Ej: Gastroenteritis infecciosa (bacteriana, viral o parasitaria)"
                />
              </label>
            </div>
            <div className="d-flex gap-5">
              <button
                type="submit"
                className="btn btn-primary w-100 mt-3"
                value={"Guardar"}
                disabled={isSaved}
              >
                Actualizar 📋
              </button>

              <button
                type="button"
                className="btn btn-warning w-100 mt-3"
                onClick={() => setFormData(formInitialData)}
              >
                Limpiar formulario
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
