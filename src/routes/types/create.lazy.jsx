import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createType } from "../../service/type";
import Protected from "../../components/Auth/Protected";

export const Route = createLazyFileRoute("/types/create")({
  component: () => (
    <Protected roles={[1]}>
      <CreateType />
    </Protected>
  ),
});

function CreateType() {
  const navigate = useNavigate();

  const [typeName, setTypeName] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const request = {
      typeName,
    };
    const result = await createType(request);
    if (result?.success) {
      navigate({ to: "/types" });
      return;
    }

    alert(result?.message);
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Create Type</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="Type_name">
                <Form.Label column sm={3}>
                  Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    required
                    value={typeName}
                    onChange={(event) => {
                      setTypeName(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">
                  Create Type
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
