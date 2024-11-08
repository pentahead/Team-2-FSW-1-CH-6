import { createLazyFileRoute } from "@tanstack/react-router";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import CarItem from "../components/Car";
import { Container, Col, Row, Button, ListGroup } from "react-bootstrap";
import { useState } from "react";

export const Route = createLazyFileRoute("/dashboard")({
  component: Dashboard,
});

export default function Dashboard() {
  const [openCars, setOpenCars] = useState(true);
  const [openTransmission, setOpenTransmission] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openManufacture, setOpenManufacture] = useState(false);
  const [openType, setOpenType] = useState(false);
  return (
    <>
      <AuthenticatedLayout
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
      >
        {openCars && <ScreenCars />}
        {openTransmission && <ScreenTransmission />}
        {openModel && <ScreenModels />}
        {openManufacture && <ScreenManufactures />}
        {openType && <ScreenType />}
      </AuthenticatedLayout>
    </>
  );
}

const ScreenCars = () => {
  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col>
            <h3>Cars List Car</h3>
            <Row className="mb-3 justify-content-between">
              <Col>
                <h3>List Car</h3>
              </Col>
              <Col className="d-flex flex-row justify-content-end">
                <Button variant="success">Add New Car</Button>
              </Col>
            </Row>
            <Row>
              <ListGroup horizontal className="px-3 gap-3 w-25">
                <ListGroup.Item action>All</ListGroup.Item>
                <ListGroup.Item action>Small</ListGroup.Item>
                <ListGroup.Item action>Medium</ListGroup.Item>
                <ListGroup.Item action>Large</ListGroup.Item>
              </ListGroup>
            </Row>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <CarItem />
          </Col>
        </Row>
      </Container>
    </>
  );
};

const ScreenModels = () => {
  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col>
            <h3>Cars Models</h3>
            <Row className="mb-3 justify-content-between">
              <Col>
                <h3>Models</h3>
              </Col>
              <Col className="d-flex flex-row justify-content-end">
                <Button variant="success">Add New Car</Button>
              </Col>
            </Row>
            <Row>
              <ListGroup horizontal className="px-3 gap-3 w-25">
                <ListGroup.Item action>All</ListGroup.Item>
                <ListGroup.Item action>Small</ListGroup.Item>
                <ListGroup.Item action>Medium</ListGroup.Item>
                <ListGroup.Item action>Large</ListGroup.Item>
              </ListGroup>
            </Row>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <CarItem />
          </Col>
        </Row>
      </Container>
    </>
  );
};
const ScreenManufactures = () => {
  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col>
            <h3>Cars Manufactures</h3>
            <Row className="mb-3 justify-content-between">
              <Col>
                <h3>Manufactures</h3>
              </Col>
              <Col className="d-flex flex-row justify-content-end">
                <Button variant="success">Add New Car</Button>
              </Col>
            </Row>
            <Row>
              <ListGroup horizontal className="px-3 gap-3 w-25">
                <ListGroup.Item action>All</ListGroup.Item>
                <ListGroup.Item action>Small</ListGroup.Item>
                <ListGroup.Item action>Medium</ListGroup.Item>
                <ListGroup.Item action>Large</ListGroup.Item>
              </ListGroup>
            </Row>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <CarItem />
          </Col>
        </Row>
      </Container>
    </>
  );
};

const ScreenType = () => {
  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col>
            <h3>Cars Type</h3>
            <Row className="mb-3 justify-content-between">
              <Col>
                <h3>Type</h3>
              </Col>
              <Col className="d-flex flex-row justify-content-end">
                <Button variant="success">Add New Car</Button>
              </Col>
            </Row>
            <Row>
              <ListGroup horizontal className="px-3 gap-3 w-25">
                <ListGroup.Item action>All</ListGroup.Item>
                <ListGroup.Item action>Small</ListGroup.Item>
                <ListGroup.Item action>Medium</ListGroup.Item>
                <ListGroup.Item action>Large</ListGroup.Item>
              </ListGroup>
            </Row>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <CarItem />
          </Col>
        </Row>
      </Container>
    </>
  );
};
const ScreenTransmission = () => {
  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col>
            <h3>Cars Transmission</h3>
            <Row className="mb-3 justify-content-between">
              <Col>
                <h3>List Car</h3>
              </Col>
              <Col className="d-flex flex-row justify-content-end">
                <Button variant="success">Add New Car</Button>
              </Col>
            </Row>
            <Row>
              <ListGroup horizontal className="px-3 gap-3 w-25">
                <ListGroup.Item action>All</ListGroup.Item>
                <ListGroup.Item action>Small</ListGroup.Item>
                <ListGroup.Item action>Medium</ListGroup.Item>
                <ListGroup.Item action>Large</ListGroup.Item>
              </ListGroup>
            </Row>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <CarItem />
          </Col>
        </Row>
      </Container>
    </>
  );
};
