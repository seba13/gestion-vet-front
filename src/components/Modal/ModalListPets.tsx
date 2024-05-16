import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Pet } from "../../interfaces/Pet";

function ModalListPets({ showModal, onClose, modalContent }) {
  const [show, setShow] = useState(showModal);
  useEffect(() => {
    setShow(showModal);
  }, [showModal]);

  const handleClose = () => {
    setShow(false);
    onClose(); // Llamamos a la función onClose proporcionada por el padre
  };

  return (
    <>
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
                <h5 className="modal-title">Lista de mascotas</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <ol className="d-flex flex-column gap-3 align-items-center">
                  {modalContent.data.map((pet: Pet, index: number) => (
                    <li key={index} className="">
                      {pet.nombreMascota} - {pet.especie} - {pet.raza}
                      <button className="btn btn-primary">
                        <NavLink
                          to={`${import.meta.env.VITE_APP_BASE_URL}/mascota/${
                            pet.idMascota
                          }`}
                        >
                          👁️
                        </NavLink>
                      </button>
                    </li>
                  ))}
                </ol>
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

export default ModalListPets;
