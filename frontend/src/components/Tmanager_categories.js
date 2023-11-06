import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function TMcategories() {
  return (
    <Card
      bg="tertiary"
      style={{
        backgroundColor: "rgb(238, 245, 255)",
        width: "80%",
        height: "500px",
        marginLeft: "10%",
        marginTop: "5%",
        boxShadow: "5px 5px 10px #afc4c4",
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Card.Body
        style={{
          display: "flex",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <Card
          style={{
            background: "#a3cbcc",
            width: "40%",
            height: "10rem",
            marginLeft: "5%",
            gap: "5%",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            alignContent: "center",
          }}
        >
          <Link to={"/schedule/"} style={{ textDecoration: "none" }}>
            <Card.Body
              style={{
                alignItems: "center",
                flexDirection: "row",
                display: "flex",
                flex: 1,
                justifyContent: "space-around",
              }}
            >
              <img
                src="/assets/bus-schedule.png"
                alt="bus image"
                style={{ width: "100px", height: "100px", marginLeft: "10%" }}
              />
              <Card.Title style={{ fontFamily: "serif", letterSpacing: "2px" }}>
                {" "}
                Bus Schedules
              </Card.Title>
            </Card.Body>
          </Link>
        </Card>

        <Card
          style={{
            backgroundColor: "#a3cbcc",
            width: "40%",
            height: "10rem",
            marginRight: "10%",
            gap: "5px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Link to={"/buses/"} style={{ textDecoration: "none" }}>
            <Card.Body
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                flex: 1,
              }}
            >
              <img
                src="/assets/bus.png"
                alt="bus image"
                style={{ width: "100px", height: "100px", marginLeft: "10%" }}
              />
              <Card.Title style={{ fontFamily: "serif", letterSpacing: "2px" }}>
                Buses
              </Card.Title>
            </Card.Body>
          </Link>
        </Card>
      </Card.Body>
    </Card>
  );
}

export default TMcategories;
