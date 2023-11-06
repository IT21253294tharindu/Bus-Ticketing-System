import { React, useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TManager_Header from "./TManager_Header";
import axios from "axios";


// Define the CreateSchedule component
export default function Createschedule() {


   // Initialize state variables and retrieve token from local storage
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [route, setroute] = useState("");
  const [gap, setgap] = useState("");
  const [starthrs, setstarthrs] = useState("");
  const [startmins, setstartmins] = useState("");
  const [endhrs, setendhrs] = useState("");
  const [endmins, setendmins] = useState("");
  const [schedule, setschedule] = useState([]);



// Concatenate start hours and minutes to form a time string
  const startjourney = starthrs + ":" + startmins;
  const endjourney = endhrs + ":" + endmins;


// Function to send form data to the server
  function senddata(e) {
    e.preventDefault();
    console.log("form submitted");


// Create an object with form data
    const newschedule = {
      routeNo: route,
      generalTimeGap: gap,
      firstBusTime: startjourney,
      lastBusTime: endjourney,
    };
    console.log(newschedule);
    



 // Send a POST request to the server to create a new bus schedule
    axios
      .post("http://localhost:3001/bus-shedule/create", newschedule, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {

         // Display a success toast message
        toast.success("bus schedule Added Successfully!", {
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

        {
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

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
  }, []);

  return (
    <>
      {" "}
      <TManager_Header />
      <div
        style={{
          background: "linear-gradient(to right, #60758a, lightblue)",
          marginLeft: "10%",
          marginTop: "15%",
          width: "70%",
          border: "1px solid #ddd",
          borderRadius: "5%",
          boxShadow: "5px 5px 10px #afc4c4",
        }}
      >
        <Form
          onSubmit={senddata}
          style={{
            marginTop: "10%",
            color: "black",
            marginLeft: "2%",
            marginRight: "2%",
            marginBottom: "5%",
          }}
        >
          <Row className="mb-3">
            <Form.Group as={Col} controlId="RouteNo">
              <Form.Label>Route No</Form.Label>
              <Form.Select
                defaultValue="Choose..."
                required
                onChange={(e) => {
                  setroute(e.target.value);
                }}
              >
                {schedule.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.routeNo}- {item.startCity}-{item.endCity}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="Timegap">
              <Form.Label>Time Gap</Form.Label>
              <Form.Control
                type="number"
                placeholder="in minutes"
                required
                onChange={(e) => {
                  setgap(e.target.value);
                }}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="startTime">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["TimeField", "TimeField", "TimeField"]}
                >
                  <TimeField
                    label="start time"
                    style={{ width: "30%" }}
                    required
                    onChange={(newValue) => {
                      const starthrs = newValue.hour();
                      const startmins = newValue.minute();
                      setstarthrs(starthrs);
                      setstartmins(startmins);
                      //const inputDate = new Date(newValue.$d);
                      //setstarttime(inputDate)
                    }}
                    format="HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Form.Group>

            <Form.Group as={Col} controlId="EndTime">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["TimeField", "TimeField", "TimeField"]}
                >
                  <TimeField
                    label="end time"
                    style={{ width: "30%" }}
                    required
                    onChange={(newvalue) => {
                      const endhrs = newvalue.hour();
                      const endmins = newvalue.minute();
                      setendhrs(endhrs);
                      setendmins(endmins);
                    }}
                    format="HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Form.Group>
          </Row>

          <Button
            variant="primary"
            type="submit"
            style={{
              alignContent: "center",
              alignItems: "center",
              marginLeft: "40%",
              marginTop: "2%",
            }}
          >
            Submit
          </Button>
        </Form>
      </div>
      <ToastContainer />
    </>
  );
}
