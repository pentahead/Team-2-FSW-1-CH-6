import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { getModels } from "../../../service/models";
import { getAvailables } from "../../../service/availables";
import { getDetailCar, updateCar } from "../../../service/cars";
import Protected from "../../../components/Auth/Protected";

export const Route = createLazyFileRoute("/cars/edit/$id")({
  component: () => (
    <Protected roles={[1]}>
      <EditCar />
    </Protected>
  ),
});

function EditCar() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [plate, setPlate] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [description, setDescription] = useState("");
  const [availableAt, setAvailableAt] = useState("");
  const [year, setYear] = useState("");
  const [availableStatus, setAvailableStatus] = useState("");
  const [image, setImage] = useState(null);
  const [modelId, setModelId] = useState("");

  const [models, setModels] = useState([]);
  const [availableStatuses, setAvailableStatuses] = useState([]);

  // Fetch models and available statuses
  useEffect(() => {
    const fetchData = async () => {
      const modelResult = await getModels();
      if (modelResult?.success) setModels(modelResult.data);

      const statusResult = await getAvailables();
      if (statusResult?.success) setAvailableStatuses(statusResult.data);
    };

    fetchData();
  }, []);

  // Fetch car detail for editing
  useEffect(() => {
    const getDetailCarData = async (id) => {
      setIsLoading(true);
      const result = await getDetailCar(id);
      if (result?.success) {
        const carData = result.data;
        setPlate(carData.plate);
        setRentPerDay(carData.rentPerDay);
        setDescription(carData.description);
        setAvailableAt(carData.availableAt);
        setYear(carData.year);
        setAvailableStatus(carData.availableStatus);
        setModelId(carData.modelId || ""); // Set modelId correctly
        setImage(carData.image);
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
      }
      setIsLoading(false);
    };

    if (id) {
      getDetailCarData(id);
    }
  }, [id]);

  if (isNotFound) {
    navigate({ to: "/cars" });
    return null;
  }

  // Handle form submission
  const onSubmit = async (event) => {
    event.preventDefault();

    const rentPerDayNum = parseInt(rentPerDay, 10);
    const yearNum = parseInt(year, 10);
    const modelIdNum = parseInt(modelId, 10);

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

    const result = await updateCar(id, request);
    if (result?.success) {
      navigate({ to: `/cars/${id}` });
    } else {
      alert(result?.message);
    }
  };

  // Jangan render form jika data belum dimuat
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Edit Car</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
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

              <Form.Group as={Row} className="mb-3" controlId="availableStatus">
                <Form.Label column sm={3}>
                  Available Status
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    value={availableStatus}
                    onChange={(e) => setAvailableStatus(e.target.value)}
                  >
                    {availableStatuses.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.available_status}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="image">
                <Form.Label column sm={3}>
                  Image
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
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
                    {models.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.model_name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">
                  Edit Car
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}
