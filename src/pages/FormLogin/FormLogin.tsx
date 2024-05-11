import Login from "../../components/FormLogin/FormLogin";

export default function FormLogin() {
  const handleLogin = (username: string, password: string) => {
    // console.log(username);
    // console.log(password);

    if (username !== "admin" || password !== "1234") {
      console.error("CREDENCIALES INVALIDAS ❌");
    } else {
      console.log("CREDENCIALES VALIDAS ✅");
      localStorage.setItem(
        "session-info",
        JSON.stringify({ isLogged: true, username })
      );
      window.location.reload();
    }
  };

  return (
    <>
      <Login onLogin={handleLogin} />
    </>
  );
}
