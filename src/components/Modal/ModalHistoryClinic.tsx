import { useEffect, useState } from "react";

function ModalHistoryClinic({ showModal, onClose, petInfo }) {
  const [show, setShow] = useState(showModal);

  useEffect(() => {
    setShow(showModal);
    // console.log("PET INFO MODAL: ", petInfo);
  }, [showModal]);

  const handleClose = () => {
    setShow(false);
    onClose(); // Llamamos a la función onClose proporcionada por el padre
  };
  return (
    <>
      {/* <button className="btn btn-primary" onClick={handleShow}>
        Abrir Modal
      </button> */}

      {show && (
        <div
          className="modal"
          tabIndex={-1}
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Historial clinico N°{petInfo.id}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                Informacion sobre la mascota qla aca Nombre: {petInfo.nombre}
              </div>
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
      )}
    </>
  );
}

export default ModalHistoryClinic;
