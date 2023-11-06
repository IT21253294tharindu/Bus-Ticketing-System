import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/pages/login";
import Dashboard_New from "./components/dashboard-new";
import BusSchedule from "./components/bus_schedule";
import Createschedule from "./components/create_busschedule";
import Buses from "./components/buses";
import Busregistration from "./components/bus_registration";
import Busupdate from "./components/updatebus";
function App() {
  const isLogged = window.localStorage.getItem("LoggedIn");
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={isLogged === "true" ? <Dashboard_New /> : <Login />}
        />
        <Route path="/" element={<Dashboard_New />} />
        <Route path="/schedule/" element={<BusSchedule />} />
        <Route path="/schedule/create/" element={<Createschedule />} />
        <Route path="/buses/" element={<Buses />} />
        <Route path="/buses/create" element={<Busregistration />} />
        <Route path="/buses/update/:id" element={<Busupdate />} />
      </Routes>
    </div>
  );
}

export default App;
