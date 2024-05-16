import { useState, useEffect } from "react";
import FormNewPet from "../../components/NewPet/FormNewPet";
import { IFormNewPet } from "../../interfaces/formNewPet";
import Alert from "../../components/Alert/Alert";

export default function NewPet() {
  const initialData: IFormNewPet = {
    edadMascota: "",
    especie: "",
    genero: "",
    nombreMascota: "",
    raza: "",
    rutDueno: "",
  };

  const [formData, setFormData] = useState<IFormNewPet>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState<any>(null);

  const onSubmit = (formDataParam: IFormNewPet) => {
    formDataParam.edadMascota = parseInt(formDataParam.edadMascota);
    setFormData(formDataParam);
    setIsLoading(true);
  };

  // pasra esto al custom hook de useFetch
  useEffect(() => {
    const sendFormData = async () => {
      try {
        if (isLoading) {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/titular-mascota/rut/${
              formData.rutDueno
            }/mascota`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );
          const results = await response.json();
          if (!results.success) {
            setAlert({
              typeOf: "danger",
              messages: [
                "Rut dueño no encontrado ❌",
                "Error al registrar mascota ❌",
              ],
            });
          }
          if (results.success) {
            setAlert({
              typeOf: "success",
              messages: ["Nueva mascota registrada! ✅"],
            });
          }

          setShowAlert(true);
          setIsLoading(false);
          setFormData(initialData);
        }
      } catch (error) {
        console.error("Error al enviar los datos:", error);
        setAlert({
          typeOf: "danger",
          messages: ["Error al registrar mascota ❌"],
        });
        setShowAlert(true);
        setIsLoading(false);
        setFormData(initialData);
      }
    };

    sendFormData();
  }, [isLoading]);
  const onCloseAlert = () => {
    setShowAlert(false);
    setAlert(null);
  };
  return (
    <>
      {showAlert && (
        <Alert alertProperties={alert} handlerCloseAlert={onCloseAlert} />
      )}
      <FormNewPet onSubmit={onSubmit} />
    </>
  );
}
