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
import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../../service/auth";
import { setToken, setUser } from "../../redux/slices/auth";

function NavbarLocal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const getProfile = async () => {
      // fetch get profile
      const result = await profile();
      if (result.success) {
        // set the user state here
        dispatch(setUser(result.data));
        return;
      }

      // If not success
      // delete the local storage here
      dispatch(setUser(null));
      dispatch(setToken(null));

      // redirect to login
      navigate({ to: "/login" });
    };

    if (token) {
      // hit api auth get profile and pass the token to the function
      getProfile();
    }
  }, [dispatch, navigate, token]);

  const logout = (event) => {
    event.preventDefault();

    // delete the local storage here
    dispatch(setUser(null));
    dispatch(setToken(null));

    // redirect to login
    navigate({ to: "/login" });
  };

  return (
    <>
      <Navbar expand="lg" className="bg-white px-5 shadow-sm">
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
            <Nav.Link>
              <Image
                src={user?.profile_picture}
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
            <Dropdown as={ButtonGroup} className="border-0">
              <Button className="bg-white px-4 text-black border-0">
                {user?.name}
              </Button>

              <Dropdown.Toggle
                split
                // variant="success"
                id="dropdown-split-basic"
                className=" bg-white border-0 text-black"
              />

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

function Sidebar({
  openCars,
  setOpenCars,
  openTransmission,
  setOpenTransmission,
  openModel,
  setOpenModel,
  openManufacture,
  setOpenManufacture,
  openType,
  setOpenType,
  children,
  setAvailabels,
  setSpec,
  setOptions,
  openAvailabels,
  openOptions,
  openSpec,
}) {
  const handleClick = (setterFunction) => {
    setOpenCars(false);
    setOpenTransmission(false);
    setOpenModel(false);
    setOpenManufacture(false);
    setOpenCars(false);
    setOpenType(false);
    setAvailabels(false);
    setSpec(false);
    setOptions(false);
    setterFunction((prev) => !prev); // Toggle the state
  };

  return (
    <>
      <Container fluid>
        <Row className="flex-nowrap w-">
          <Col
            xs="auto"
            md={3}
            xl={2}
            className="bg-white shadow-sm px-0 mx-0 "
          >
            <div className="d-flex flex-column align-items-center align-items-sm-start px-0 pt-0 text-black max-vh-100 m-0 p-0">
              <Nav
                className="flex-column mb-sm-auto align-items-center align-items-sm- w-100 m-0 p-0 m-0"
                id="menu"
              >
                <Nav.Item
                  as={Row}
                  className="w-100"
                  style={openCars ? { background: "#CFD4ED" } : {}}
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={3}
                    xl={0}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0 w-100"
                    onClick={() => handleClick(setOpenCars)}
                  >
                    <span className="ms-5 d-none d-sm-inline fs-5 w-100">
                      Cars
                    </span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  as={Row}
                  className="w-100"
                  style={openManufacture ? { background: "#CFD4ED" } : {}}
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={3}
                    xl={0}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0 w-100"
                    onClick={() => handleClick(setOpenManufacture)}
                  >
                    <span className="ms-5 d-none d-sm-inline fs-5 w-100">
                      Manufacturers
                    </span>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item
                  as={Row}
                  className="w-100"
                  style={openTransmission ? { background: "#CFD4ED" } : {}}
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={3}
                    xl={0}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0 w-100"
                    onClick={() => handleClick(setOpenTransmission)}
                  >
                    <span className="ms-5 d-none d-sm-inline fs-5 w-100">
                      Transmission
                    </span>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item
                  as={Row}
                  className="w-100"
                  style={openModel ? { background: "#CFD4ED" } : {}}
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={3}
                    xl={0}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0 w-100"
                    onClick={() => handleClick(setOpenModel)}
                  >
                    <span className="ms-5 d-none d-sm-inline fs-5 w-100">
                      Models
                    </span>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item
                  as={Row}
                  className="w-100"
                  style={openType ? { background: "#CFD4ED" } : {}}
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={3}
                    xl={0}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0 w-100"
                    onClick={() => handleClick(setOpenType)}
                  >
                    <span className="ms-5 d-none d-sm-inline fs-5 w-100">
                      Type
                    </span>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item
                  as={Row}
                  className="w-100"
                  style={openAvailabels ? { background: "#CFD4ED" } : {}}
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={3}
                    xl={0}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0 w-100"
                    onClick={() => handleClick(setAvailabels)}
                  >
                    <span className="ms-5 d-none d-sm-inline fs-5 w-100">
                      Availabels
                    </span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  as={Row}
                  className="w-100"
                  style={openSpec ? { background: "#CFD4ED" } : {}}
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={3}
                    xl={0}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0 w-100"
                    onClick={() => handleClick(setSpec)}
                  >
                    <span className="ms-5 d-none d-sm-inline fs-5 w-100">
                      Spec
                    </span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  as={Row}
                  className="w-100"
                  style={openOptions ? { background: "#CFD4ED" } : {}}
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={3}
                    xl={0}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0 w-100"
                    onClick={() => handleClick(setOptions)}
                  >
                    <span className="ms-5 d-none d-sm-inline fs-5 w-100">
                      Options
                    </span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Col>

          <Col
            className="m-0 p-0   min-vh-100 "
            style={{ background: "#F4F5F7" }}
          >
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default function IndexSidebar({
  openCars,
  setOpenCars,
  openTransmission,
  setOpenTransmission,
  openModel,
  setOpenModel,
  openManufacture,
  setOpenManufacture,
  openType,
  setOpenType,
  setAvailabels,
  setSpec,
  setOptions,
  openAvailabels,
  openSpec,
  openOptions,
  children,
}) {
  return (
    <>
      <Container fluid>
        <Row>
          <Col
            xs="auto"
            md={1}
            xl={1}
            className=" p-0"
            style={{ width: "3rem", background: "#0D28A6" }}
          >
            <div className="d-flex flex-column  align-items-center align-items-sm-start  text-black   min-vh-100 overflow-hidden  m-0 p-0 mt-3 pt-5 ">
              <Nav
                // variant="pills"
                className="flex-column mb-sm-auto align-items-center align-items-sm- w-100 m-0 p-0 m-0"
                id="menu"
              >
                <Nav.Item
                  as={Row}
                  className=" w-100  "
                  // style={{ background: "#CFD4ED" }}
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={3}
                    xl={0}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0"
                  >
                    <i className="ms-3 ps-3 bi bi-house fs-5 fw-bold text-center"></i>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  as={Row}
                  className=" w-100  "
                  style={{ background: "#CFD4ED" }}
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={3}
                    xl={0}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0"
                  >
                    <i className="ms-3 ps-3 bi bi-car-front-fill  fs-5 fw-bold text-center"></i>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Col>
          <Col className="p-0 m-0">
            <NavbarLocal />
            <Sidebar
              openCars={openCars}
              setOpenCars={setOpenCars}
              openTransmission={openTransmission}
              setOpenTransmission={setOpenTransmission}
              openModel={openModel}
              setOpenModel={setOpenModel}
              openManufacture={openManufacture}
              setOpenManufacture={setOpenManufacture}
              openType={openType}
              setOpenType={setOpenType}
              setAvailabels={setAvailabels}
              setSpec={setSpec}
              setOptions={setOptions}
              openAvailabels={openAvailabels}
              openSpec={openSpec}
              openOptions={openOptions}
            >
              {children}
            </Sidebar>
          </Col>
        </Row>
      </Container>
    </>
  );
}
