import { useState, useEffect } from "react";
import { Pet } from "../../interfaces/Pet";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import PetHistoryMedModal from "./PetHistoryMedModal";
import PetCitasModal from "./PetCitasModal";
import "./PetProfileModal.css"; // Import the CSS file

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

const PetProfileModal: React.FC<PetProfileModalProps> = ({
  idMascota,
  show,
  onHide,
}) => {
  const [petInformation, setPetInformation] = useState<Pet | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
              <PetCitasModal idMascota={idMascota} />
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
