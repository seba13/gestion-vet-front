import { useState, useEffect } from "react";
import {
  ClinicalRecord,
  Treatment,
  AdmissionRecord,
} from "../../interfaces/PetHistory";
import Accordion from "react-bootstrap/Accordion";

interface PetHistoryMedModalProps {
  idMascota: string;
}

const fetchHistorialMedico = async (idMascota: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/historial/${idMascota}`
  );
  const data = await response.json();
  return data;
};

const fetchClinicalRecords = async (idMascota: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/clinicalrecords/${idMascota}`
  );
  const data = await response.json();
  return data;
};

const fetchTreatments = async (idMascota: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/treatments/${idMascota}`
  );
  const data = await response.json();
  return data;
};

const fetchAdmissionRecords = async (idFichaClinica: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/admissionrecords/${idFichaClinica}`
  );
  const data = await response.json();
  return data;
};

const PetHistoryMedModal: React.FC<PetHistoryMedModalProps> = ({
  idMascota,
}) => {
  const [clinicalRecords, setClinicalRecords] = useState<ClinicalRecord[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [admissionRecords, setAdmissionRecords] = useState<AdmissionRecord[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const historialResponse = await fetchHistorialMedico(idMascota);
        const clinicalResponse = await fetchClinicalRecords(idMascota);
        const treatmentsResponse = await fetchTreatments(idMascota);
        const admissionResponse = await fetchAdmissionRecords(
          clinicalResponse.data[0]?.idFichaClinica
        );

        // setHistorialMedico(historialResponse.data); // Eliminado porque no se usa
        setClinicalRecords(clinicalResponse.data);
        setTreatments(treatmentsResponse.data);
        setAdmissionRecords(admissionResponse.data);
      } catch (error: any) {
        console.error("Error al cargar los datos: ", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [idMascota]);

  return (
    <div>
      {isLoading && <p className="text-center">Cargando datos....</p>}
      {!isLoading && (
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Ficha Clínica</Accordion.Header>
            <Accordion.Body>
              {clinicalRecords.map((record, index) => (
                <div key={index}>
                  <p>
                    <strong>Fecha:</strong> {record.fechaIngreso}
                  </p>
                  <p>
                    <strong>Enfermedades:</strong> {record.enfermedades}
                  </p>
                  <p>
                    <strong>Peso:</strong> {record.peso} kg
                  </p>
                  <p>
                    <strong>Observaciones:</strong> {record.observaciones}
                  </p>
                  <hr />
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Ficha de Ingreso</Accordion.Header>
            <Accordion.Body>
              {admissionRecords.map((record, index) => (
                <div key={index}>
                  <p>
                    <strong>Síntomas:</strong> {record.sintomas}
                  </p>
                  <p>
                    <strong>Antecedentes:</strong> {record.antecedentes}
                  </p>
                  <p>
                    <strong>Diagnóstico:</strong> {record.diagnostico}
                  </p>
                  <p>
                    <strong>Fecha de Ingreso:</strong> {record.fechaIngreso}
                  </p>
                  <p>
                    <strong>Fecha de Alta:</strong> {record.fechaAlta}
                  </p>
                  <hr />
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Tratamientos</Accordion.Header>
            <Accordion.Body>
              {treatments.map((treatment, index) => (
                <div key={index}>
                  <p>
                    <strong>Descripción:</strong> {treatment.descripcion}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {treatment.fecha}
                  </p>
                  <p>
                    <strong>Tipo:</strong> {treatment.tipo}
                  </p>
                  <p>
                    <strong>Costo:</strong> ${treatment.costo}
                  </p>
                  <hr />
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </div>
  );
};

export default PetHistoryMedModal;
