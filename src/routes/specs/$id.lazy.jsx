import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { deleteSpec, getDetailSpec } from "../../service/specs";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

export const Route = createLazyFileRoute("/specs/$id")({
  component: SpecDetail,
});

function SpecDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [spec, setSpec] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const getDetailSpecData = async (id) => {
      setIsLoading(true);
      const result = await getDetailSpec(id);
      if (result?.success) {
        setSpec(result.data);
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

  if (isLoading) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Loading...</h1>
        </Col>
      </Row>
    );
  }

  if (isNotFound) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Spec is not found!</h1>
        </Col>
      </Row>
    );
  }

  const onDelete = async (event) => {
    event.preventDefault();

    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this data?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const result = await deleteSpec(id);
            if (result?.success) {
              navigate({ to: "/specs" });
              return;
            }

            toast.error(result?.message);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            {/* Center the title */}
            <Card.Title
              className="text-center"
              style={{ marginTop: "1rem", marginBottom: "4rem" }}
            >
              {spec?.spec_name}
            </Card.Title>

            {/* Center the buttons horizontally */}
            <div className="d-flex justify-content-center gap-3">
              <Button
                style={{ width: "8rem" }}
                as={Link}
                href={`/specs/edit/${id}`}
                variant="primary"
                size="md"
              >
                Edit Spec
              </Button>
              <Button
                style={{ width: "8rem" }}
                onClick={onDelete}
                variant="danger"
                size="md"
              >
                Delete Spec
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}