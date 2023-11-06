import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function TManager_Header() {


  return (

    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <span style={{ marginRight: "10px" }}>
            <img
              src="/assets/logo.png"
              alt="Profile Image"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "20%"
              }}
            />
          </span>
          <text style={{ letterSpacing: "5px", fontFamily: "Times-New-roman,Times,serif", textShadow: "15px -5px 10px #70b6c4", fontSize: "22px", color: "#1f239c" }}>TICKET EASE</text></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text >
           <span style={{ display: "flex", alignItems: "center" }}>
           <Link to={'/myprofile'}> <span style={{ marginRight: "10px" }}>
                <img
                  src="/assets/userprofile.png"
                  alt="Profile Image"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%"
                  }}
                />
              </span></Link> 
              <span style={{ alignContent: "center", alignItems: "center" }}>
                <text style={{ fontFamily: "serif" }}>Scott Maccole</text>
                <Button variant="outline-secondary" style={{ display: "flex", marginLeft: "8%", fontFamily: "serif" }}>Log Out</Button> 

              </span>


            </span>

          </Navbar.Text>

        </Navbar.Collapse>
      </Container>
    </Navbar>

  );

}

export default TManager_Header;
