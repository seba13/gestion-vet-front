import { useState } from "react";

function InputSearch({ returnValue }) {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputText(value);
    returnValue(value); // Pasar directamente el valor actualizado
  };

  return (
    <div className="d-flex col justify-content-center m-3">
      <input
        type="text"
        name="inputSearchPet"
        id="inputSearchPet"
        placeholder="Nombre mascota"
        value={inputText}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default InputSearch;
