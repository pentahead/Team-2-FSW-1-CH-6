import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { getDetailSpec, updateSpec } from "../../../service/specs";
import Protected from "../../../components/Auth/Protected";

export const Route = createLazyFileRoute("/specs/edit/$id")({
  component: () => (
    <Protected roles={[1]}>
      <EditSpec />
    </Protected>
  ),
});

function EditSpec() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [spec_name, setSpecName] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDetailSpecData = async (id) => {
      setIsLoading(true);
      const result = await getDetailSpec(id);
      if (result?.success) {
        setSpecName(result.data?.spec_name);
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
      }
      setIsLoading(false);
    };

    if (id) {
      getDetailSpecData(id);
    }
  }, [id]);

  if (isNotFound) {
    navigate({ to: "/specs" });
    return;
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    const request = {
      specName,
    };
    const result = await updateSpec(id, request);
    if (result?.success) {
      navigate({ to: `/specs/${id}` });
      return;
    }

    alert(result?.message);
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Edit Spec</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="spec_name">
                <Form.Label column sm={3}>
                  Spec Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Spec Name"
                    required
                    value={spec_name}
                    onChange={(event) => {
                      setSpecName(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">
                  Edit Spec
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
