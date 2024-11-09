import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createManufacture } from "../../service/manufacture";
import Protected from "../../components/Auth/Protected";

export const Route = createLazyFileRoute("/manufactures/create")({
  component: () => (
    <Protected roles={[1]}>
      <CreateManufacture />
    </Protected>
  ),
});

function CreateManufacture() {
  const navigate = useNavigate();

  const [manufactureName, setManufactureName] = useState("");
  const [manufactureRegion, setManufactureRegion] = useState("");
  const [year, setYear] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const request = {
      manufactureName,
      manufactureRegion,
      year,
    };
    const result = await createManufacture(request);
    if (result?.success) {
      navigate({ to: "/manufactures" });
      return;
    }

    alert(result?.message);
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Create Manufacture</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="manufacture_name"
              >
                <Form.Label column sm={3}>
                  Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    required
                    value={manufactureName}
                    onChange={(event) => {
                      setManufactureName(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="manufacture_region"
              >
                <Form.Label column sm={3}>
                  Manufacture region
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Manufacture region"
                    required
                    value={manufactureRegion}
                    onChange={(event) => {
                      setManufactureRegion(event.target.value);
                    }}
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
                    onChange={(event) => {
                      setYear(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">
                  Create Manufacture
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
