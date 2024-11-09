import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import {
  getDetailAvailable,
  updateAvailable,
} from "../../../service/availables";
import Protected from "../../../components/Auth/Protected";

export const Route = createLazyFileRoute("/availables/edit/$id")({
  component: () => (
    <Protected roles={[1]}>
      <EditAvailable />
    </Protected>
  ),
});

function EditAvailable() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [availableStatus, setAvailableName] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setIsNotFound(true);
      return;
    }

    const getDetailAvailableData = async () => {
      setIsLoading(true);
      const result = await getDetailAvailable(id);
      if (result?.success) {
        setAvailableName(result.data?.available_status || "");
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
      }
      setIsLoading(false);
    };

    getDetailAvailableData();
  }, [id]);

  if (isNotFound) {
    navigate({ to: "/availables" });
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    const request = {
      availableStatus,
    };
    const result = await updateAvailable(id, request);
    if (result?.success) {
      navigate({ to: `/availables/${id}` });
    } else {
      alert(result?.message || "Terjadi kesalahan.");
    }
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Edit Available</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="available_name">
                <Form.Label column sm={3}>
                  Available Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Available Name"
                    required
                    value={availableStatus}
                    onChange={(event) => {
                      setAvailableName(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">
                  Edit Available
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
