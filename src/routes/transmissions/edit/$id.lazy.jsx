import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import {
  getDetailTransmission,
  updateTransmission,
} from "../../../service/transmission";
import Protected from "../../../components/Auth/Protected";

export const Route = createLazyFileRoute("/transmissions/edit/$id")({
  component: () => (
    <Protected roles={[1]}>
      <EditTransmission />
    </Protected>
  ),
});

function EditTransmission() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [transmissionName, setTransmissionName] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setIsNotFound(true);
      return;
    }

    const getDetailTransmissionData = async () => {
      setIsLoading(true);
      const result = await getDetailTransmission(id);
      if (result?.success) {
        setTransmissionName(result.data?.transmission_name || "");
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
      }
      setIsLoading(false);
    };

    getDetailTransmissionData();
  }, [id]);

  if (isNotFound) {
    navigate({ to: "/transmissions" });
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    const request = {
      transmissionName,
    };
    const result = await updateTransmission(id, request);
    if (result?.success) {
      navigate({ to: `/transmissions/${id}` });
    } else {
      alert(result?.message || "Terjadi kesalahan.");
    }
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Edit Transmission</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="transmission_name"
              >
                <Form.Label column sm={3}>
                  Transmission Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Transmission Name"
                    required
                    value={transmissionName}
                    onChange={(event) => {
                      setTransmissionName(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">
                  Edit Transmission
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
