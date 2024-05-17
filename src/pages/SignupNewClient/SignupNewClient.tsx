import React, { useState } from "react";
import FormNewClient from "../../components/Forms/FormNewClient";

const SignupNewClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {isLoading && <p className="p text-center">Cargando informacion...</p>}
      {!isLoading && <FormNewClient />}
    </>
  );
};

export default SignupNewClient;
