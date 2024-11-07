import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { getTransmission } from "../../../service/transmission";
import { getType } from "../../../service/type";
import { getManufacture } from "../../../service/manufacture";
import { updateModel } from "../../../service/models";
import Protected from "../../components/Auth/Protected";

export const Route = createLazyFileRoute("/models/edit/$id")({
  component: () => (
    <Protected roles={[1]}>
      <EditModel />
    </Protected>
  ),
});

function EditModel() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [modelName, setModelName] = useState("");
  const [Transmission, setTransmission] = useState([]);
  const [transmissionId, setTransmissionId] = useState(0);
  const [capacity, setCapacity] = useState("");
  const [Type, setType] = useState([]);
  const [typeId, setTypeId] = useState(0);
  const [Manufacture, setManufacture] = useState([]);
  const [manufactureId, setManufactureId] = useState(0);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTransmissionData = async () => {
      const result = await getTransmission();
      if (result?.success) {
        setTransmission(result?.data);
      }
    };
    const getTypeData = async () => {
      const result = await getType();
      if (result?.success) {
        setType(result?.data);
      }
    };
    const getManufactureData = async () => {
      const result = await getManufacture();
      if (result?.success) {
        setManufacture(result?.data);
      }
    };

    getTransmissionData();
    getTypeData();
    getManufactureData();
  }, []);

  useEffect(() => {
    const getDetailModelData = async (id) => {
      setIsLoading(true);
      const result = await getDetailModel(id);
      if (result?.success) {
        setModelName(result.data?.model_name);
        setTransmissionId(result.data?.transmission_id);
        setCapacity(result.data?.capacity);
        setTypeId(result.data?.type_id);
        setManufactureId(result.data?.manufacture_id);
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
      }
      setIsLoading(false);
    };

    if (id) {
      getDetailModelData(id);
    }
  }, [id]);

  if (isNotFound) {
    navigate({ to: "/models" });
    return;
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    const request = {
      model_name,
      transmissionId,
      capacity,
      typeId,
      manufactureId,
    };
    const result = await updateModel(id, request);
    if (result?.success) {
      navigate({ to: `/models/${id}` });
      return;
    }

    alert(result?.message);
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Edit Model</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column sm={3}>
                  Model Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    required
                    value={model_name}
                    onChange={(event) => {
                      setModelName(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="transmission_id">
                <Form.Label column sm={3}>
                  Transmission
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(event) => setTransmissionId(event.target.value)}
                  >
                    <option disabled>Select Transmission</option>
                    {!isLoading &&
                      Transmission.length > 0 &&
                      Transmission.map((transmission) => (
                        <option
                          key={transmission.id}
                          value={transmission.id}
                          selected={transmission.id == transmissionId}
                        >
                          {transmission.name}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="capacity">
                <Form.Label column sm={3}>
                  Capacity
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Capacity"
                    required
                    value={capacity}
                    onChange={(event) => {
                      setCapacity(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="type_id">
                <Form.Label column sm={3}>
                  Type
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(event) => setTypeId(event.target.value)}
                  >
                    <option disabled>Select Type</option>
                    {!isLoading &&
                      Type.length > 0 &&
                      Type.map((type) => (
                        <option
                          key={type.id}
                          value={type.id}
                          selected={type.id == typeId}
                        >
                          {type.name}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="manufacture_id">
                <Form.Label column sm={3}>
                  Manufacture
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(event) => setManufactureId(event.target.value)}
                  >
                    <option disabled>Select Manufacture</option>
                    {!isLoading &&
                      Manufacture.length > 0 &&
                      Manufacture.map((manufacture) => (
                        <option
                          key={manufacture.id}
                          value={manufacture.id}
                          selected={manufacture.id == manufactureId}
                        >
                          {manufacture.name}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">
                  Edit Student
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
