import { useEffect, useState } from "react";
import styles from "./Alert.module.css";
interface IAlertProperties {
  alertProperties: {
    typeOf: string;
    messages: string[];
  };
  handlerCloseAlert: () => void;
}
function Alert({ alertProperties, handlerCloseAlert }: IAlertProperties) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // Oculta el alert después de 2 segundos
      handlerCloseAlert();
    }, 3900);

    return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
  }, [handlerCloseAlert, alertProperties]); // El efecto se ejecuta solo una vez al montar el componente

  // Renderiza el alert solo si es visible
  return visible ? (
    <div
      className={`w-25 alert alert-${alertProperties.typeOf} ${styles.fadeOut} mx-auto`}
      role="alert"
    >
      {alertProperties.messages.map((message: string, index: number) => {
        return (
          <p key={`alerta-${index + 1}`} className="text-center">
            #{index + 1} - {message}
          </p>
        );
      })}
    </div>
  ) : null;
}

export default Alert;
