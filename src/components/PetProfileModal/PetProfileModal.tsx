import { useState, useEffect } from "react";
import { Pet } from "../../interfaces/Pet";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface PetProfileModalProps {
  idMascota: string;
  show: boolean;
  onHide: () => void;
}

const handleFetch = async (parametro: string) => {
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
        const response = await handleFetch(idMascota);
        setPetInformation(response.data);
        setIsLoading(false);
      };

      fetchData();
    }
  }, [idMascota, show]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Perfil de Mascota</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading && <p className="text-center">Cargando datos....</p>}
        {!isLoading && petInformation && (
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
                <strong>Fecha de Nacimiento:</strong> {petInformation.fecNac}
              </p>
            )}
          </div>
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
