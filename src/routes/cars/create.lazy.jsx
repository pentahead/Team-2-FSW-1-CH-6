import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getModels } from "../../service/models";
import { getAvailables } from "../../service/availables";
import { createCar } from "../../service/cars";
import Protected from "../../components/Auth/Protected";

export const Route = createLazyFileRoute("/cars/create")({
  component: () => (
    <Protected roles={[1]}>
      <CreateCar />
    </Protected>
  ),
});

function CreateCar() {
  const navigate = useNavigate();

  const [plate, setPlate] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [description, setDescription] = useState("");
  const [availableAt, setAvailableAt] = useState("");
  const [year, setYear] = useState("");
  const [availableStatus, setAvailableStatus] = useState("");
  const [image, setImage] = useState(null);
  const [modelId, setModelId] = useState(0);

  const [models, setModels] = useState([]);
  const [availableStatuses, setAvailableStatuses] = useState([]);

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
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Create Car</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              {/* Input fields for plate, rentPerDay, description, year, availableStatus, modelId */}
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

              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">
                  Create Car
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

export default CreateCar;
