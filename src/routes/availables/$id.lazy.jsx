import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { deleteAvailable, getDetailAvailable } from "../../service/availables";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

export const Route = createLazyFileRoute("/availables/$id")({
  component: AvailablesDetail,
});

function AvailablesDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [available, setAvailable] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const getDetailAvailablesData = async (id) => {
      setIsLoading(true);
      const result = await getDetailAvailable(id);
      if (result?.success) {
        setAvailable(result.data);
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
      }
      setIsLoading(false);
    };

    if (id) {
      getDetailAvailablesData(id);
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
          <h1 className="text-center">Availables is not found!</h1>
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
            const result = await deleteAvailable(id);
            if (result?.success) {
              navigate({ to: "/availables" });
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
              {available?.available_status}
            </Card.Title>

            {/* Center the buttons horizontally */}
            <div className="d-flex justify-content-center gap-3">
              <Button
                style={{ width: "8rem" }}
                as={Link}
                href={`/availables/edit/${id}`}
                variant="primary"
                size="md"
              >
                Edit Available
              </Button>
              <Button
                style={{ width: "8rem" }}
                onClick={onDelete}
                variant="danger"
                size="md"
              >
                Delete Available
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}
