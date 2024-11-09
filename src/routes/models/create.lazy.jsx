import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
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
  const [selectedSpecs, setSelectedSpecs] = useState([]);
  const [Option, setOption] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const transmissionResult = await getTransmission();
      if (transmissionResult?.success)
        setTransmission(transmissionResult?.data);

      const typeResult = await getType();
      if (typeResult?.success) setType(typeResult?.data);

      const manufactureResult = await getManufacture();
      if (manufactureResult?.success) setManufacture(manufactureResult?.data);

      const specResult = await getSpecs();
      if (specResult?.success) setSpec(specResult?.data);

      const optionResult = await getOption();
      if (optionResult?.success) setOption(optionResult?.data);
    };

    fetchData();
  }, []);

  const handleSpecChange = (event) => {
    const specId = parseInt(event.target.value, 10);
    setSelectedSpecs((prevSpecs) =>
      prevSpecs.includes(specId)
        ? prevSpecs.filter((id) => id !== specId)
        : [...prevSpecs, specId]
    );
  };

  const handleOptionChange = (event) => {
    const optionId = parseInt(event.target.value, 10);
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(optionId)
        ? prevOptions.filter((id) => id !== optionId)
        : [...prevOptions, optionId]
    );
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const request = {
      modelName,
      transmissionId: parseInt(transmissionId, 10),
      capacity,
      typeId: parseInt(typeId, 10),
      manufactureId: parseInt(manufactureId, 10),
      specIds: selectedSpecs,
      optionIds: selectedOptions,
    };

    const result = await createModel(request);
    if (result?.success) {
      navigate({ to: "/models" });
    } else {
      alert(result?.message);
    }
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
                    onChange={(event) => setModelName(event.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="transmission_id">
                <Form.Label column sm={3}>
                  Transmission
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    value={transmissionId}
                    onChange={(event) =>
                      setTransmissionId(parseInt(event.target.value, 10))
                    }
                  >
                    <option value="" disabled>
                      Select Transmission
                    </option>
                    {Transmission.map((transmission) => (
                      <option key={transmission.id} value={transmission.id}>
                        {transmission.transmission_name}
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
                    type="number"
                    placeholder="Capacity"
                    required
                    value={capacity}
                    onChange={(event) => setCapacity(event.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="type_id">
                <Form.Label column sm={3}>
                  Type
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    value={typeId}
                    onChange={(event) =>
                      setTypeId(parseInt(event.target.value, 10))
                    }
                  >
                    <option value="" disabled>
                      Select Type
                    </option>
                    {Type.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.type_name}
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
                    value={manufactureId}
                    onChange={(event) =>
                      setManufactureId(parseInt(event.target.value, 10))
                    }
                  >
                    <option value="" disabled>
                      Select Manufacture
                    </option>
                    {Manufacture.map((manufacture) => (
                      <option key={manufacture.id} value={manufacture.id}>
                        {manufacture.manufacture_name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="spec_id">
                <Form.Label column sm={3}>
                  Spec
                </Form.Label>
                <Col sm="9">
                  {Spec.map((spec) => (
                    <Form.Check
                      type="checkbox"
                      key={spec.id}
                      label={spec.spec_name}
                      value={spec.id}
                      checked={selectedSpecs.includes(spec.id)}
                      onChange={handleSpecChange}
                    />
                  ))}
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="option_id">
                <Form.Label column sm={3}>
                  Option
                </Form.Label>
                <Col sm="9">
                  {Option.map((option) => (
                    <Form.Check
                      type="checkbox"
                      key={option.id}
                      label={option.option_name}
                      value={option.id}
                      checked={selectedOptions.includes(option.id)}
                      onChange={handleOptionChange}
                    />
                  ))}
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

export default CreateModel;
