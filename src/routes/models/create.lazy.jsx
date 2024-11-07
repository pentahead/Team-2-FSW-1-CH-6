import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { getTransmission } from "../../service/transmission";
import { getType } from "../../service/type";
import { getManufacture } from "../../service/manufacture";
import { getSpecs } from "../../service/specs";
import { getOption } from "../../service/option";
import { createModel } from "../../service/models";
import Protected from "../../components/Auth/Protected";

export const Route = createLazyFileRoute("/models/create")({
  component: () => (
    <Protected roles={[1]}>
      <CreateModel />
    </Protected>
  ),
});

function CreateModel() {
  const navigate = useNavigate();

  const [modelName, setModelName] = useState("");
  const [Transmission, setTransmission] = useState([]);
  const [transmissionId, setTransmissionId] = useState(0);
  const [capacity, setCapacity] = useState("");
  const [Type, setType] = useState([]);
  const [typeId, setTypeId] = useState(0);
  const [Manufacture, setManufacture] = useState([]);
  const [manufactureId, setManufactureId] = useState(0);
  const [Spec, setSpec] = useState([]);
  const [specId, setSpecId] = useState(0);
  const [Option, setOption] = useState([]);
  const [optionId, setOptionId] = useState(0);

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
    const getSpecData = async () => {
      const result = await getSpecs();
      if (result?.success) {
        setSpec(result?.data);
      }
    };
    const getOptionData = async () => {
      const result = await getOption();
      if (result?.success) {
        setOption(result?.data);
      }
    };

    getTransmissionData();
    getTypeData();
    getManufactureData();
    getSpecData();
    getOptionData();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    const request = {
      modelName,
      transmissionId,
      capacity,
      typeId,
      manufactureId,
      specId,
      optionId,
    };
    const result = await createModel(request);
    if (result?.success) {
      navigate({ to: "/models" });
      return;
    }

    alert(result?.message);
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Create Model</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="model_name">
                <Form.Label column sm={3}>
                  Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    required
                    value={modelName}
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
                    <option disabled selected>
                      Select Transmision
                    </option>
                    {Transmission.length > 0 &&
                      Transmission.map((transmission) => (
                        <option key={transmission?.id} value={transmission?.id}>
                          {transmission?.transmission_name}
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
                    <option disabled selected>
                      Select Type
                    </option>
                    {Type.length > 0 &&
                      Type.map((type) => (
                        <option key={type?.id} value={type?.id}>
                          {type?.type_name}
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
                    <option disabled selected>
                      Select Manufacture
                    </option>
                    {Manufacture.length > 0 &&
                      Manufacture.map((manufacture) => (
                        <option key={manufacture?.id} value={manufacture?.id}>
                          {manufacture?.manufacture_name}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="spec_id">
                <Form.Label column sm={3}>
                  spec
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(event) => setSpecId(event.target.value)}
                  >
                    <option disabled selected>
                      Select spec
                    </option>
                    {Spec.length > 0 &&
                      Spec.map((spec) => (
                        <option key={spec?.id} value={spec?.id}>
                          {spec?.spec_name}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="option_id">
                <Form.Label column sm={3}>
                  option
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(event) => setSpecId(event.target.value)}
                  >
                    <option disabled selected>
                      Select option
                    </option>
                    {Option.length > 0 &&
                      Option.map((option) => (
                        <option key={option?.id} value={option?.id}>
                          {option?.option_name}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">
                  Create Model
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
