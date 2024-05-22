import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

//function ModalComponent({ showModal, onClose, modalContent }) {
// const [show, setShow] = useState(showModal);

export interface ModalComponentProps {
  showModal: boolean;
  onClose: (show: boolean) => void;
  modalContent: IModalContent;
}

export interface IModalContent {
  title: string;
  size?: string;
  body: React.ReactNode | any;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  showModal,
  onClose,
  modalContent,
}) => {
  const [show, setShow] = useState(showModal);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setShow(showModal);
  }, [showModal]);

  const handleClose = () => {
    setShow(false);
    onClose(false); // Llamamos a la función onClose proporcionada por el padre
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className={`modal-${modalContent.size ? modalContent.size : "xl"}`}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading && <p className="text-center">Cargando datos....</p>}
          {!isLoading && modalContent && modalContent.body}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
