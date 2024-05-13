import { Outlet } from "react-router-dom";
import { NavbarDashboard } from "../../components/Nabvar/Navbar";

export default function Dashboard() {
  return (
    <>
      <NavbarDashboard inputComponent={null} handleInput={null} />
      <Outlet></Outlet>
    </>
  );
}
