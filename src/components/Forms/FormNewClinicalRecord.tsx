import { useEffect, useState } from "react";
import styles from "./styles/FormPet.module.css";
import Alert, { AlertProperties } from "../Alert/Alert";
import { IFormNewRecord } from "../../interfaces/formNewRecord";
import { getCurrentDateTimeLocal } from "../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Pet } from "../../interfaces/Pet";
import ListPets from "./Lists/ListPets";
import ModalComponent from "../Modal/ModalComponent";
import { ListPetsMR } from "./Lists/ListPetsMR";

export default function FormNewClinicalRecord({ onSubmit }: any) {
  const { idMascota = "" } = useParams();
  const navigate = useNavigate();
  const formInitialData: IFormNewRecord = {
    antecedentes: "",
    enfermedades: "",
    fechaIngreso: getCurrentDateTimeLocal(),
    idMascota: idMascota || "",
    observaciones: "",
    peso: 0,
  };
  const [formData, setFormData] = useState<IFormNewRecord>(formInitialData);
  const [formAlert, setFormAlert] = useState<AlertProperties | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [rutToSearch, setRutToSearch] = useState("");
  const [show, setShow] = useState(false);
  const [listOfPets, setlistOfPets] = useState<Pet[]>([]);
  const { fetchData } = useFetch(
    `${import.meta.env.VITE_API_URL}/ficha-clinica`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChangeSearch = (event: any) => {
    const { value } = event.target;
    setRutToSearch(value);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    let errors: Array<string> = [];

    if (formData.idMascota.trim() === "") {
      errors.push("Falta campo idMascota.");
    }
    if (formData.fechaIngreso.toString().trim() === "") {
      errors.push("Falta campo fechaIngreso.");
    }
    if (formData.observaciones.trim() === "") {
      errors.push("Falta campo observaciones.");
    }
    if (
      formData.peso.toString().trim() === "" ||
      formData.peso.toString().trim() === "0"
    ) {
      errors.push("Falta campo peso.");
    }
    if (errors.length > 0) {
      setFormAlert({
        typeOf: "danger",
        messages: errors,
      });
      setShowAlert(true);
    } else {
      fetchData().then((result: any) => {
        if (result.success) {
          setFormAlert({
            typeOf: "success",
            messages: ["Registro ficha clinica ingresada con exito! 🕛✅"],
          });
          setFormData(formInitialData);
          setShowAlert(true);
          setTimeout(() => {
            navigate("/mascotas");
          }, 2000);
        } else {
          setFormAlert({
            typeOf: "warning",
            messages: ["No se pudo ingresar la ficha clinica ❌"],
          });
          setShowAlert(true);
        }
      });
    }
  };

  const onClickButtonSearch = async () => {
    console.log("click");
    console.log(rutToSearch);
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/titular-mascota/rut/${rutToSearch}/mascotas`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        setlistOfPets(json.data);
        setShow(true);
      });
  };
  const onCloseAlert = () => {
    setShowAlert(false);
    setFormAlert(null);
  };
  const handleClickSubmit = (idMascota: string) => {
    // console.log({ idMascota });
    formData.idMascota = idMascota;
    setFormData(formData);
    setShow(false);
  };
  useEffect(() => {
    console.log(listOfPets);
  }, [listOfPets, show]);
  return (
    <>
      {showAlert && formAlert && (
        <Alert alertProperties={formAlert} handlerCloseAlert={onCloseAlert} />
      )}
      <div
        className={`d-flex justify-content-center align-items-center flex-column`}
      >
        <div className="d-flex gap-3 mb-3 align-items-center">
          <label htmlFor="buscador">
            Buscar RUT{" "}
            <input
              className="form-control"
              id="buscador"
              name="buscador"
              type="text"
              value={rutToSearch}
              onChange={handleInputChangeSearch}
              min={7}
              max={10}
              required
            />
          </label>{" "}
          <button className="btn btn-primary" onClick={onClickButtonSearch}>
            Buscar Dueño
          </button>
        </div>

        <form onSubmit={handleSubmit} className={`${styles.patientForm}`}>
          <h5 className="text-center mb-4">Identificacion</h5>

          <div className="mb-3 d-flex justify-content-between gap-3">
            <label htmlFor="idMascota" className="form-label">
              ID Mascota
              <input
                type="text"
                className="form-control"
                id="idMascota"
                name="idMascota"
                value={formData.idMascota}
                placeholder="#0000000A"
                disabled
              />
            </label>
            <label htmlFor="edadMascota" className="form-label">
              Peso
              <input
                type="number"
                className="form-control"
                id="peso"
                name="peso"
                value={formData.peso}
                onChange={handleInputChange}
                placeholder="Peso en KG"
              />
            </label>
          </div>
          <div>
            <hr />
            <h5 className="text-center mb-4">Antecedentes</h5>
          </div>
          <div className="mb-3 d-flex justify-content-around gap-3">
            <label htmlFor="antecedentes" className="form-label">
              Antecedentes:
              <input
                type="text"
                className="form-control w-100"
                id="antecedentes"
                name="antecedentes"
                value={formData.antecedentes}
                onChange={handleInputChange}
                placeholder="Antecedentes de mascota aqui."
              />
            </label>

            <label htmlFor="enfermedades" className="form-label">
              Enfermedades
              <input
                type="text"
                className="form-control"
                id="enfermedades"
                name="enfermedades"
                value={formData.enfermedades}
                onChange={handleInputChange}
                placeholder="Escribir aqui"
              />{" "}
            </label>
            <label htmlFor="fechaIngreso" className="form-label">
              Fecha ingreso:
              <input
                type="datetime-local"
                className="form-control"
                id="fechaIngreso"
                name="fechaIngreso"
                value={formData.fechaIngreso}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="observaciones" className="form-label">
              Observaciones:
            </label>
            <input
              type="text"
              className="form-control"
              id="observaciones"
              name="observaciones"
              value={formData.observaciones}
              onChange={handleInputChange}
              placeholder="vómitos, diarrea, sin apetito, etc, etc...."
            />
          </div>
          <div className="d-flex gap-5">
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Crear ficha clinica 📋
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
        {show && listOfPets && (
          <ModalComponent
            showModal={show}
            onClose={() => setShow(false)}
            modalContent={{
              title: "Lista de mascotas",
              size: "m",
              body: (
                <ListPetsMR
                  list={listOfPets}
                  handleClickSubmit={handleClickSubmit}
                ></ListPetsMR>
              ),
            }}
          ></ModalComponent>
        )}
      </div>
    </>
  );
}
