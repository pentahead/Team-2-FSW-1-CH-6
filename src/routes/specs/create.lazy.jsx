import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { createSpec } from "../../service/specs";
import Protected from "../../components/Auth/Protected";

export const Route = createLazyFileRoute("/specs/create")({
  component: () => (
    <Protected roles={[1]}>
      <CreateSpec />
    </Protected>
  ),
});

function CreateSpec() {
  const navigate = useNavigate();

  const [specName, setSpecName] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const request = {
      specName,
    };
    const result = await createSpec(request);
    if (result?.success) {
      navigate({ to: "/specs" });
      return;
    }

    alert(result?.message);
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Create Spec</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="spec_name">
                <Form.Label column sm={3}>
                  Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    required
                    value={specName}
                    onChange={(event) => {
                      setSpecName(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">
                  Create Spec
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
