import { useNavigate } from "react-router-dom";

export default function SiteNotFound() {
  const navigate = useNavigate();
  const handleButton = () => {
    navigate("/");
  };
  return (
    <>
      <h1>Sitio no encontrado...</h1>
      <button className="btn btn-primary" onClick={handleButton}>
        Regresar
      </button>
    </>
  );
}
