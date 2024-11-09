import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import {
  Container,
  Col,
  Row,
  Button,
  ListGroup,
  Card,
  Form,
  Image,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createCar, getCars, getDetailCar, updateCar } from "../service/cars";
import CarItem from "../components/Car";
import MyVerticallyCenteredModal from "../components/Modals";
import { getModels } from "../service/models";
import { getAvailables } from "../service/availables";
import Protected from "../components/Auth/Protected";

export const Route = createLazyFileRoute("/dashboard")({
  component: () => (
    <Protected roles={[1]}>
      <Dashboard />
    </Protected>
  ),
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
  const [modalShow, setModalShow] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);

  const [Cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    const getCarData = async () => {
      setIsLoading(true);
      const result = await getCars();
      if (result.success) {
        setCars(result.data);
      }
      setIsLoading(false);
    };

    if (token) {
      getCarData();
    }
  }, [token]);

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">Please login first to get Car data!</h1>
        </Col>
      </Row>
    );
  }

  if (isLoading) {
    return (
      <Row className="mt-4">
        <h1>Loading...</h1>
      </Row>
    );
  }
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
                <Button
                  // onClick={() => navigate({ to: "/cars/create" })}
                  onClick={() => setOpenForm(true)}
                  variant="success"
                >
                  Add New Car
                </Button>
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
          {!openForm ? (
            Cars.length === 0 ? (
              <h1>Cars not found!</h1>
            ) : (
              <Row className="mt-3">
                {Cars.map((car) => (
                  <Col
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={car?.id}
                    className="mb-4"
                  >
                    <CarItem
                      setModalShow={setModalShow}
                      modalShow={modalShow}
                      setId={setId}
                      car={car}
                    />
                  </Col>
                ))}
              </Row>
            )
          ) : (
            <FormComponent setOpenForm={setOpenForm} id={id} />
          )}
        </Row>
      </Container>

      <MyVerticallyCenteredModal
        show={modalShow}
        setOpenForm={setOpenForm}
        id={id}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

const FormComponent = ({ setOpenForm, id }) => {
  const navigate = useNavigate();
  const [plate, setPlate] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [description, setDescription] = useState("");
  const [availableAt, setAvailableAt] = useState("");
  const [year, setYear] = useState("");
  const [availableStatus, setAvailableStatus] = useState("");
  const [image, setImage] = useState(null);
  const [modelId, setModelId] = useState(0);
  const [currentProfilePicture, setCurrentProfilePicture] = useState(null);
  const [models, setModels] = useState([]);
  const [availableStatuses, setAvailableStatuses] = useState([]);
  const isEditMode = !!id;

  useEffect(() => {
    const fetchData = async () => {
      const modelResult = await getModels();
      if (modelResult?.success) setModels(modelResult.data);

      const statusResult = await getAvailables();
      if (statusResult?.success) setAvailableStatuses(statusResult.data);
    };

    fetchData();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const rentPerDayNum = parseInt(rentPerDay, 10);
    const yearNum = parseInt(year, 10);
    const modelIdNum = parseInt(modelId, 10);
    if (isNaN(rentPerDayNum) || isNaN(yearNum) || isNaN(modelIdNum)) {
      alert("Please provide valid numbers for rentPerDay, year, and modelId.");
      return;
    }

    const request = {
      plate,
      rentPerDay: rentPerDayNum,
      description,
      availableAt,
      year: yearNum,
      availableStatus,
      modelId: modelIdNum,
      image,
    };

    const result = await createCar(request);
    if (result?.success) {
      navigate({ to: "/cars" });
    } else {
      alert(result?.message);
    }
  };

  return (
    <Row className="mt-5 bg-white border-2">
      <Col className="offset-md-12">
        <Container fluid className=" p-5">
          <Form onSubmit={onSubmit} as={Container}>
            <Row className="gap-5">
              <Col xs={4}>
                <Form.Group as={Row} className="mb-3" controlId="image">
                  <div
                    className="mt-4 text-secondary   p-5 rounded-3 "
                    style={{
                      color: "#6c757d",
                      border: "1px dashed #6c757d",
                    }}
                  >
                    <Form.Group controlId="home_photo" className="text-sm">
                      <Container className="d-flex justify-content-center align-items-center text-center mb-3">
                        {currentProfilePicture ? (
                          <Image
                            src={currentProfilePicture}
                            alt="Uploaded Preview"
                            className="w-75 h-auto img-thumbnail"
                          />
                        ) : (
                          <>
                            <i
                              className="bi bi-image text-secondary"
                              style={{ fontSize: "3rem" }}
                            ></i>
                          </>
                        )}
                      </Container>
                      <Form.Label
                        className="d-flex align-items-center cursor-pointer"
                        style={{
                          backgroundColor: "white",
                          color: "#6366F1",
                          fontWeight: "bold",
                          borderRadius: "0.375rem",
                          padding: "0.5rem",
                          textAlign: "center",
                          border: "1px solid #6366F1",
                          transition: "color 0.2s ease",
                          cursor: "pointer",
                        }}
                      >
                        <span>Upload a file</span>
                        <Form.Control
                          type="file"
                          name="home_photo"
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                            setCurrentProfilePicture(
                              URL.createObjectURL(event.target.files[0])
                            );
                          }}
                          className="d-none"
                        />
                      </Form.Label>
                      <span className="d-inline pl-2">or drag and drop</span>
                    </Form.Group>

                    <Form.Text className="text-muted">
                      PNG, JPG, GIF up to 10MB
                    </Form.Text>
                  </div>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group as={Row} className="mb-3" controlId="plate">
                  <Form.Label column sm={3}>
                    Plate
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Plate"
                      required
                      value={plate}
                      onChange={(e) => setPlate(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="rentPerDay">
                  <Form.Label column sm={3}>
                    Rent per Day
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="number"
                      placeholder="Rent per Day"
                      required
                      value={rentPerDay}
                      onChange={(e) => setRentPerDay(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="description">
                  <Form.Label column sm={3}>
                    Description
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="availableAt">
                  <Form.Label column sm={3}>
                    Available At
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="datetime-local"
                      required
                      value={availableAt}
                      onChange={(e) => setAvailableAt(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="year">
                  <Form.Label column sm={3}>
                    Year
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="number"
                      placeholder="Year"
                      required
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="availableStatus"
                >
                  <Form.Label column sm={3}>
                    Available Status
                  </Form.Label>
                  <Col sm="9">
                    <Form.Select
                      value={availableStatus}
                      onChange={(e) => setAvailableStatus(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Status
                      </option>
                      {availableStatuses.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.available_status}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="modelId">
                  <Form.Label column sm={3}>
                    Model
                  </Form.Label>
                  <Col sm="9">
                    <Form.Select
                      value={modelId}
                      onChange={(e) => setModelId(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Model
                      </option>
                      {models.map((model) => (
                        <option key={model.id} value={model.id}>
                          {model.model_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
                <div className="d-flex justify-content-start gap-1 flex-row">
                  <Button type="submit" variant="primary">
                    Create Car
                  </Button>
                  <Button
                    onClick={() => setOpenForm(false)}
                    // type="submit"
                    variant="danger"
                  >
                    Cancel
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </Col>
    </Row>
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
          <Col>{/* <CarPanel /> */}</Col>
        </Row>
      </Container>
    </>
  );
};
