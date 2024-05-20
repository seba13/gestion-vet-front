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
      {/* {show && (
        <div
          className="modal"
          tabIndex={-1}
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalContent.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">{modalContent.body}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
      <Modal show={show} onHide={handleClose}>
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
