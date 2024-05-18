import { useEffect, useState } from "react";

function ModalComponent({ showModal, onClose, modalContent }) {
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
      {show.show && (
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
      )}
    </>
  );
}

export default ModalComponent;
