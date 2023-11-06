import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { MDBCol, MDBIcon } from "mdbreact";
import TManager_Header from "./TManager_Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function BusSchedule() {
  const token = localStorage.getItem("token");
  const [schedule, setschedule] = useState([]);
  const [search, setsearch] = useState("");
  const navigate = useNavigate();

  const getShedule = () => {
    axios
      .get("http://localhost:3001/bus-shedule/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setschedule(response.data);
        console.log(response.data);
      });
  };

  function deleteRoute(sheduleId) {
    console.log(sheduleId);
    axios
      .delete(`http://localhost:3001/bus-shedule/delete/${sheduleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("bus deleted Successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        const timer = setTimeout(() => {
          navigate("/schedule/");
        }, 2000);
        return () => clearTimeout(timer);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        getShedule();
      });
  }

  useEffect(() => {
    getShedule();
  }, []);

  return (
    <>
      {" "}
      <TManager_Header />
      <div style={{ marginTop: "10%", marginLeft: "30%" }}>
        <MDBCol md="8">
          <form className="form-inline mt-6 mb-4">
            <MDBIcon icon="search" />
            <input
              className="form-control form-control-sm ml-3 w-75"
              type="text"
              onChange={(e) => setsearch(e.target.value)}
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </MDBCol>
      </div>
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          flex: 1,
          justifyContent: "flex-end",
          marginLeft: "80%",
        }}
      >
        {" "}
        <Link to={"/schedule/create/"}>
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>{" "}
      </Box>
      <Table
        style={{
          marginTop: "5%",
          marginLeft: "5%",
          marginRight: "5%",
          width: "90%",
          backgroundColor: "#5555",
          boxShadow: "2px 2px 10px #5555",
          borderRadius: "2px",
        }}
      >
        <thead>
          <tr>
            <th>RouteNo</th>
            <th>RouteName</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Journy Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {schedule &&
            schedule.map((s, i) => {
              return (
                <tr key={i}>
                  <td>{s.routeNo.routeNo}</td>
                  <td>
                    {s.routeNo.startCity}-{s.routeNo.endCity}
                  </td>
                  <td>{s.firstBusTime}</td>
                  <td>{s.lastBusTime}</td>
                  <td>{s.routeNo.journyTime}</td>
                  <td>
                    <Button variant="danger" onClick={() => deleteRoute(s._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ToastContainer />
    </>
  );
}
