import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { MDBCol, MDBIcon } from "mdbreact";
import TManager_Header from "./TManager_Header";
import styles from "../styles/dashboard.css";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Busregistration from "./bus_registration";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Buses() {
  const [buses, setbuses] = useState([]);
  const [search, setsearch] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getAllBusses = () => {
    axios
      .get("http://localhost:3001/bus/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resonse) => {
        setbuses(resonse.data);
        console.log(resonse.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllBusses();
  }, []);

  function deletebus(busId) {
    toast.error("You can't delete bus until recreating the time tables!", {
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
      navigate("/buses/");
    }, 2000);
    return () => clearTimeout(timer);
  }
  return (
    <>
      {" "}
      <TManager_Header /> {/*Reusing navbar */}
      {/*search bar */}
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
      {/*icon to go to create buses component */}
      <Box sx={{ "& > :not(style)": { m: 1 }, marginLeft: "90%" }}>
        {" "}
        <Link to={"/buses/create/"}>
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>{" "}
      </Box>
      {/*retrieve all the buses to the table */}
      <Table
        class="tbl1"
        style={{
          marginTop: "5%",
          marginLeft: "5%",
          marginRight: "5%",
          width: "90%",
          boxShadow: "2px 2px 10px #5555",
          borderRadius: "2px",
        }}
      >
        <thead>
          <tr>
            <th>BusNo</th>
            <th>RouteNo</th>
            <th>Routename</th>
            <th>Driver</th>
            <th>Contact No</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {buses
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.busNumber?.toLowerCase().includes(search) ||
                    item.routeno?.toLowerCase().includes(search);
            })
            .map((b, i) => {
              return (
                <tr key={i}>
                  <td>{b.busNumber}</td> {/*Display busno */}
                  <td>{b.route.routeNo}</td> {/*Display routeno */}
                  <td>
                    {b.route.startCity} - {b.route.endCity}
                  </td>{" "}
                  {/*Display routename */}
                  <td>{b.Driver}</td> {/*Display driver name */}
                  <td>{b.contactno}</td> {/*Display contactno */}
                  <td>
                    <Link to={`/buses/update/${b._id}`}>
                      <Button variant="success">Update</Button>
                    </Link>
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => deletebus(b._id)}>
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
