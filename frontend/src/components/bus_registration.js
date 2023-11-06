import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import TManager_Header from "./TManager_Header";
import axios from "axios";

export default function Busregistration() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // State variables to manage form data and modal visibility
  const [showModal, setShowModal] = useState(true);
  const [route, setroute] = useState("");
  const [busno, setbusno] = useState("");
  const [driver, setdriver] = useState("");
  const [contact, setcontact] = useState("");
  const [selectedRouteName, setSelectedRouteName] = useState("");
  const [buses, setbuses] = useState([]);
  const [schedule, setschedule] = useState([]);

  // Function to fetch bus routes from the server
  const getRoutes = () => {
    axios
      .get("http://localhost:3001/bus-route/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setschedule(response.data);
      });
  };

  useEffect(() => {
    getRoutes();

    // Update the selected route name when the route number changes
    const selectedBus = schedule.find((item) => item._id === route); // Update the selected route name when the route number changes
    if (selectedBus) {
      setSelectedRouteName(selectedBus.startCity + "-" + selectedBus.endCity);
    } else {
      setSelectedRouteName(""); // Reset the text field if no route matches the selected route number
    }
  }, [route, buses]);

  // Function to handle form submission
  function insertdata(e) {
    e.preventDefault();

    const newbus = {
      busNumber: busno,
      route: route,
      currentCity: 0,
    };

    axios
      .post("http://localhost:3001/bus/create", newbus, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // Display a success toast message
        toast.success("bus registration Successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        // Navigate to the buses page after a delay
        const timer = setTimeout(() => {
          navigate("/buses/");
        }, 2000);
        return () => clearTimeout(timer);

        {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <TManager_Header />
      {showModal && (
        <div
          className="modal show"
          style={{
            display: "block",
            position: "fixed",
            marginTop: "150px",
            background: "linear-gradient(to right, #60758a, lightblue)",
            boxShadow: "5px 2px 2px #5555",
          }}
        >
          <Modal.Dialog>
            <Modal.Header
              closeButton
              onClick={() => {
                setShowModal(false);
                navigate("/buses/");
              }}
            >
              <Modal.Title>Bus Registration</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ background: "lightblue" }}>
              {/*bus registration form */}
              <Form
                onSubmit={insertdata}
                style={{
                  padding: "5px",
                  marginTop: "10%",
                  color: "black",
                  marginLeft: "2%",
                  marginRight: "2%",
                  marginBottom: "5%",
                }}
              >
                <Form.Group as={Col} controlId="Busno">
                  <Form.Label>Bus No</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Bus No"
                    required
                    onChange={(e) => {
                      setbusno(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="RouteNo">
                  <Form.Label>Route No</Form.Label>
                  <Form.Select
                    defaultValue="Choose..."
                    required
                    onChange={(e) => {
                      setroute(e.target.value);
                    }}
                  >
                    <option>choose...</option>
                    {schedule.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.routeNo}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="RouteName">
                  <Form.Label>Route Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedRouteName}
                    readOnly
                  />{" "}
                  {/*route name show according to to the selected route no*/}
                </Form.Group>

                <Form.Group as={Col} controlId="driver">
                  <Form.Label>Driver</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Driver name"
                    required
                    onChange={(e) => {
                      setdriver(e.target.value);
                    }}
                  />{" "}
                  {/*driver name input field */}
                </Form.Group>

                <Form.Group as={Col} controlId="phoneno">
                  <Form.Label>Contact no</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Contact no"
                    required
                    onChange={(e) => {
                      setcontact(e.target.value);
                    }}
                  />
                  {/*driver's contact no input field */}
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    alignContent: "center",
                    alignItems: "center",
                    marginLeft: "40%",
                    marginTop: "5%",
                  }}
                >
                  Submit
                </Button>
              </Form>
            </Modal.Body>

            <Modal.Footer></Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
