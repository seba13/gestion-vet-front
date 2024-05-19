import { useEffect, useState } from "react";
import styles from "./Alert.module.css";

export interface AlertProperties {
  // Asegúrate de exportar la interfaz
  typeOf: string;
  messages: string[];
}

export interface AlertProps {
  alertProperties: AlertProperties; // Aquí usas la interfaz exportada
  handlerCloseAlert: () => void;
}

const Alert: React.FC<AlertProps> = ({
  alertProperties,
  handlerCloseAlert,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      handlerCloseAlert();
    }, 3900);

    return () => clearTimeout(timer);
  }, [handlerCloseAlert]);

  if (!alertProperties) {
    return null;
  }

  return visible ? (
    <div
      className={`w-25 alert alert-${alertProperties.typeOf} ${styles.fadeOut} mx-auto`}
      role="alert"
    >
      {alertProperties.messages.map((message: string, index: number) => (
        <p key={`alert-${index + 1}`} className="text-center">
          {message}
        </p>
      ))}
    </div>
  ) : null;
};

export default Alert;
