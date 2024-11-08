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
import { getDetailModel, updateModel } from "../../../service/models";
import { getSpecs } from "../../../service/specs";
import { getModels } from "../../../service/models";
import { getOption } from "../../../service/option";
import Protected from "../../../components/Auth/Protected";

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
  const [Spec, setSpec] = useState([]);
  const [selectedSpecs, setSelectedSpecs] = useState([]);
  const [Option, setOption] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [
        transmissionResult,
        typeResult,
        manufactureResult,
        specResult,
        optionResult,
      ] = await Promise.all([
        getTransmission(),
        getType(),
        getManufacture(),
        getSpecs(),
        getOption(),
      ]);
      if (transmissionResult?.success)
        setTransmission(transmissionResult?.data);
      if (typeResult?.success) setType(typeResult?.data);
      if (manufactureResult?.success) setManufacture(manufactureResult?.data);
      if (specResult?.success) setSpec(specResult?.data);
      if (optionResult?.success) setOption(optionResult?.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getDetailModelData = async (id) => {
      setIsLoading(true);
      const result = await getDetailModel(id);
      if (result?.success) {
        setModelName(result.data?.modelName);
        setTransmissionId(result.data?.transmission_id);
        setCapacity(result.data?.capacity);
        setTypeId(result.data?.type_id);
        setManufactureId(result.data?.manufacture_id);
        setSelectedOptions(result.data?.option_id || []);
        setSelectedSpecs(result.data?.spec_id || []);
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
    return null;
  }

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
                  Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    required
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
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
                    onChange={(e) =>
                      setTransmissionId(parseInt(e.target.value, 10))
                    }
                  >
                    <option disabled>Select Transmission</option>
                    {!isLoading &&
                      Transmission.length > 0 &&
                      Transmission.map((transmission) => (
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
                    type="text"
                    placeholder="Capacity"
                    required
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
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
                    onChange={(e) => setTypeId(parseInt(e.target.value, 10))}
                  >
                    <option disabled>Select Type</option>
                    {!isLoading &&
                      Type.length > 0 &&
                      Type.map((type) => (
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
                    onChange={(e) =>
                      setManufactureId(parseInt(e.target.value, 10))
                    }
                  >
                    <option disabled>Select Manufacture</option>
                    {!isLoading &&
                      Manufacture.length > 0 &&
                      Manufacture.map((manufacture) => (
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

              <div className="text-center">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
