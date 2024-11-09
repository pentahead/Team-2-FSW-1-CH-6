import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import {
  getDetailManufacture,
  updateManufacture,
} from "../../../service/manufacture";
import Protected from "../../../components/Auth/Protected";

export const Route = createLazyFileRoute("/manufactures/edit/$id")({
  component: () => (
    <Protected roles={[1]}>
      <EditManufacture />
    </Protected>
  ),
});

function EditManufacture() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [manufactureName, setManufactureName] = useState("");
  const [manufactureRegion, setManufactureRegion] = useState("");
  const [year, setYear] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setIsNotFound(true);
      return;
    }

    const getDetailManufactureData = async () => {
      setIsLoading(true);
      const result = await getDetailManufacture(id);
      if (result?.success) {
        setManufactureName(result.data?.manufacture_name || "");
        setManufactureRegion(result.data?.manufacture_region || "");
        setYear(result.data?.year_establish || "");
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
      }
      setIsLoading(false);
    };

    getDetailManufactureData();
  }, [id]);

  if (isNotFound) {
    navigate({ to: "/manufactures" });
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    const request = {
      manufactureName,
      manufactureRegion,
      year,
    };
    const result = await updateManufacture(id, request);
    if (result?.success) {
      navigate({ to: `/manufactures/${id}` });
    } else {
      alert(result?.message || "Terjadi kesalahan.");
    }
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Edit Manufacture</Card.Header>
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
