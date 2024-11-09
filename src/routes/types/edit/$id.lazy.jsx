import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { getDetailType, updateType } from "../../../service/type";
import Protected from "../../../components/Auth/Protected";

export const Route = createLazyFileRoute("/types/edit/$id")({
  component: () => (
    <Protected roles={[1]}>
      <EditType />
    </Protected>
  ),
});

function EditType() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [typeName, setTypeName] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setIsNotFound(true);
      return;
    }

    const getDetailTypeData = async () => {
      setIsLoading(true);
      const result = await getDetailType(id);
      if (result?.success) {
        setTypeName(result.data?.type_name || "");
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
      }
      setIsLoading(false);
    };

    getDetailTypeData();
  }, [id]);

  if (isNotFound) {
    navigate({ to: "/types" });
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    const request = {
      typeName,
    };
    const result = await updateType(id, request);
    if (result?.success) {
      navigate({ to: `/types/${id}` });
    } else {
      alert(result?.message || "Terjadi kesalahan.");
    }
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Edit Type</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="type_name">
                <Form.Label column sm={3}>
                  Type Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="type Name"
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
                  Edit Type
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
