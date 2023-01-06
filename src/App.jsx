import Profile from "./components/profile/Profile";
import MyAppointments from "./components/MyAppointments/MyAppointments";
import CustomAppointment from "./components/CustomAppointment/CustomAppointment";
import Topbar from "./components/topbar/Topbar";
import Facilities from "./components/facilities/Facilities";
import AvailableAppointments from "./components/AvailableAppointments/AvailableAppointments";
import "./app.scss"
import { useState } from "react";
import Menu from "./components/menu/Menu";

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="app">
       <Topbar menuOpen={menuOpen} setMenuOpen = {setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen = {setMenuOpen}/>
      <div className="sections">
        <Profile/>
        <MyAppointments/>
        <AvailableAppointments/>
        <CustomAppointment/>
        <Facilities/>
      </div>
    </div>
  );
}

export default App;
