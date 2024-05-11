import { useEffect, useState } from "react";
import styles from "./Alert.module.css";

function Alert({ alertProperties, handlerCloseAlert }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // Oculta el alert después de 2 segundos
      handlerCloseAlert();
    }, 3900);

    return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
  }, []); // El efecto se ejecuta solo una vez al montar el componente

  // Renderiza el alert solo si es visible
  return visible ? (
    <div
      className={`w-25 alert alert-${alertProperties.typeOfAlert} ${styles.fadeOut} mx-auto`}
      role="alert"
    >
      {alertProperties.errors.map((error: string) => {
        return <p className="text-center">* {error} *</p>;
      })}
    </div>
  ) : null;
}

export default Alert;
