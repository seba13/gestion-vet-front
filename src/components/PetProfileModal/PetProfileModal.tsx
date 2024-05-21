import { useState, useEffect } from "react";
import { Pet } from "../../interfaces/Pet";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import PetHistoryMedModal from "./PetHistoryMedModal";
import PetCitasModal from "./PetCitasModal";
import "./PetProfileModal.css"; // Import the CSS file
import { NavLink } from "react-router-dom";
import { parseDate } from "../../utils/utils";
import { EstadosCita, IAppointment } from "../../interfaces/Appointment";
import useFetch from "../../hooks/useFetch";

interface PetProfileModalProps {
  idMascota: string;
  show: boolean;
  onHide: () => void;
}

const handleFetchPet = async (parametro: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/mascota/${parametro}`
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error en: ", error.message);
  }
};

const fetchHistorialMedico = async (idMascota: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/historial-medico/${idMascota}`
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching historial medico:", error.message);
  }
};

const PetProfileModal: React.FC<PetProfileModalProps> = ({
  idMascota,
  show,
  onHide,
}) => {
  const [petInformation, setPetInformation] = useState<Pet | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingHistorial, setIsLoadingHistorial] = useState(false);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const { fetchData, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/citas-medicas/mascota/${idMascota}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  useEffect(() => {
    if (show) {
      setIsLoading(true);
      const fetchData = async () => {
        const response = await handleFetchPet(idMascota);
        setPetInformation(response.data);
        setIsLoading(false);
      };

      fetchData();
    }
  }, [idMascota, show]);

  const handleHistorialClick = () => {
    setIsLoadingHistorial(true);
    const fetchHistorial = async () => {
      const response = await fetchHistorialMedico(idMascota);
      setHistorialMedico(response.data);
      setIsLoadingHistorial(false);
    };

    fetchHistorial();
  };
  const handleAppointmentsClick = () => {
    fetchData().then((result) => {
      setAppointments(result.data);
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Perfil de Mascota</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading && <p className="text-center">Cargando datos....</p>}
        {!isLoading && petInformation && (
          <Tabs
            defaultActiveKey="profile"
            id="pet-profile-tabs"
            className="mb-3"
            onSelect={(eventKey) => {
              if (eventKey === "historial") {
                handleHistorialClick();
              } else if (eventKey === "citas") {
                handleAppointmentsClick();
              }
            }}
          >
            <Tab eventKey="profile" title="Perfil">
              <div className="pet-profile">
                <h3>{petInformation.nombreMascota}</h3>
                <p>
                  <strong>Edad:</strong> {petInformation.edadMascota}
                </p>
                <p>
                  <strong>Especie:</strong> {petInformation.especie}
                </p>
                <p>
                  <strong>Raza:</strong> {petInformation.raza}
                </p>
                <p>
                  <strong>Género:</strong> {petInformation.genero}
                </p>
                {petInformation.fecNac && (
                  <p>
                    <strong>Fecha de Nacimiento:</strong>{" "}
                    {petInformation.fecNac}
                  </p>
                )}
              </div>
            </Tab>
            <Tab eventKey="historial" title="Historial Clínico">
              <PetHistoryMedModal idMascota={idMascota} />
            </Tab>
            <Tab eventKey="citas" title="Citas">
              {/* <PetCitasModal idMascota={idMascota} /> */}
              {loading && <p className="p text-center">Cargando citas....</p>}
              {!loading && (
                <div className="">
                  <NavLink
                    to={`/citas/agendar/${petInformation.idMascota}`}
                    className="btn btn-primary d-block w-25 mb-2"
                  >
                    Agendar🕛
                  </NavLink>
                  <ul className="list-group gap-1">
                    {appointments.map((appointment: IAppointment) => {
                      return (
                        <li
                          key={appointment.idCitaMedica}
                          className={`d-flex justify-content-between list-group-item list-group-item-${
                            appointment.idEstadoCita === 1
                              ? "success"
                              : appointment.idEstadoCita === 2
                              ? "danger"
                              : appointment.idEstadoCita === 3
                              ? "warning"
                              : "secondary"
                          } `}
                        >
                          <div>
                            <p>
                              Fecha:{" "}
                              <b>{parseDate(appointment.fechaCitaMedica)}</b>
                              <br />
                              Estado cita:{" "}
                              <b>{EstadosCita[appointment.idEstadoCita]}</b>
                            </p>
                          </div>

                          <div>
                            <NavLink
                              to={`/citas/editar/${appointment.idCitaMedica}`}
                              className="btn btn-primary w-10"
                            >
                              Editar✏️🕛
                            </NavLink>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </Tab>
          </Tabs>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PetProfileModal;
