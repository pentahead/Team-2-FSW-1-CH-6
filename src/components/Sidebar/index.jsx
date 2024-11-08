/* eslint-disable react/prop-types */
import {
  Container,
  Row,
  Col,
  Nav,
  Dropdown,
  Collapse,
  Image,
  Navbar,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

function NavbarLocal() {
  return (
    <>
      <Navbar expand="lg" className="bg-white px-0 shadow-sm">
        <Container fluid className="d-flex flex-row justify-content-end  gap-2">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav>
            <Nav.Link as={Link} to="/profile">
              <Image
                src={""}
                fluid
                style={{
                  width: "30px",
                  height: "30px",
                  display: "inline-block",
                  overflow: "hidden",
                  borderRadius: "50%",
                }}
              />
            </Nav.Link>
            <Dropdown as={ButtonGroup} className="pe-3">
              <Button variant="success">Split Button</Button>

              <Dropdown.Toggle
                split
                variant="success"
                id="dropdown-split-basic"
              />

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

function Sidebar({ children }) {
  return (
    <>
      <Container fluid>
        <Row className="flex-nowrap">
          <Col
            xs="auto"
            md={3}
            xl={2}
            className="bg-white shadaow-sm px-0 mx-0"
          >
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-black min-vh-100">
              <Nav
                variant="pills"
                className="flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start "
                id="menu"
              >
                <Nav.Item as={Row} className=" bg-primary d-">
                  <Nav.Link
                    as={Col}
                    xl={12}
                    href="#"
                    className="align-middle px-0 text-black w-100"
                  >
                    <i className="bi bi-house fs-4"></i>
                    <span className="ms-1 d-none d-sm-inline">Home</span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <hr className="text-black" />
              <Dropdown className="pb-4">
                <Dropdown.Toggle
                  variant="link"
                  id="dropdownUser1"
                  className="d-flex align-items-center text-white text-decoration-none"
                >
                  <Image
                    src="https://github.com/mdo.png"
                    alt="hugenerd"
                    width="30"
                    height="30"
                    roundedCircle
                  />
                  <span className="d-none d-sm-inline mx-1">loser</span>
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                  <Dropdown.Item href="#">New project...</Dropdown.Item>
                  <Dropdown.Item href="#">Settings</Dropdown.Item>
                  <Dropdown.Item href="#">Profile</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#">Sign out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
          <Col className=" m-0 p-0" style={{ background: "#CFD4ED" }}>
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default function IndexSidebar({ children }) {
  return (
    <>
      <NavbarLocal />
      <Sidebar>{children}</Sidebar>
    </>
  );
}
