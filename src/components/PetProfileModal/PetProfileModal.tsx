import { useState, useEffect } from "react";
import { Pet } from "../../interfaces/Pet";
import { PetHistory } from "../../interfaces/PetHistory";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { NavLink } from "react-router-dom";
import { IAppointment, IAppointments } from "../../interfaces/Appointment";
import { Appointment } from "../../pages/Appointment/Appointment";

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

const fetchCitas = async (idMascota: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/citas-medicas/mascota/${idMascota}`
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching citas:", error.message);
  }
};
const PetProfileModal: React.FC<PetProfileModalProps> = ({
  idMascota,
  show,
  onHide,
}) => {
  const [petInformation, setPetInformation] = useState<Pet | null>(null);
  const [historialMedico, setHistorialMedico] = useState<PetHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistorial, setIsLoadingHistorial] = useState(false);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  useEffect(() => {
    if (isLoadingAppointments) {
      console.log("AKIII");
      fetchCitas(idMascota).then((response) => {
        console.log(response);
        setAppointments(response);
      });
    }
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
    setIsLoadingAppointments(true);
    const fetchHistorial = async () => {
      const response = await fetchCitas(idMascota);
      setAppointments(response.data);
      setIsLoadingAppointments(false);
      console.log(response);
    };

    fetchHistorial();
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
              <div>
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
              {isLoadingHistorial && (
                <p className="text-center">Cargando historial....</p>
              )}
              {!isLoadingHistorial && (
                <div>
                  {historialMedico.length === 0 ? (
                    <p>No hay historial médico disponible.</p>
                  ) : (
                    historialMedico.map((record, index) => (
                      <div key={index}>
                        <p>
                          <strong>Fecha:</strong> {record.date}
                        </p>
                        <p>
                          <strong>Descripción:</strong> {record.description}
                        </p>
                        <p>
                          <strong>Veterinario:</strong> {record.vetName}
                        </p>
                        <hr />
                      </div>
                    ))
                  )}
                </div>
              )}
            </Tab>
            <Tab eventKey="citas" title="Citas">
              {isLoadingAppointments && (
                <p className="p text-center">Cargando datos....</p>
              )}
              {!isLoadingAppointments && (
                <div className="">
                  <NavLink
                    to={`/citas/${petInformation.idMascota}`}
                    className="btn btn-primary d-block w-25 mb-2"
                  >
                    Agendar🕛
                  </NavLink>
                  <ul className="list-group">
                    <li className="list-group-item list-group-item-primary"></li>
                  </ul>{" "}
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
