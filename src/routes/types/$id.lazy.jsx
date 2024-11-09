import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { deleteType, getDetailType } from "../../service/type";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

export const Route = createLazyFileRoute("/types/$id")({
  component: TypesDetail,
});

function TypesDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [type, setType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const getDetailTypesData = async (id) => {
      setIsLoading(true);
      const result = await getDetailType(id);
      if (result?.success) {
        setType(result.data);
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
      }
      setIsLoading(false);
    };

    if (id) {
      getDetailTypesData(id);
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
          <h1 className="text-center">Types is not found!</h1>
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
            const result = await deleteType(id);
            if (result?.success) {
              navigate({ to: "/types" });
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
              {type?.type_name}
            </Card.Title>

            {/* Center the buttons horizontally */}
            <div className="d-flex justify-content-center gap-3">
              <Button
                style={{ width: "8rem" }}
                as={Link}
                href={`/types/edit/${id}`}
                variant="primary"
                size="md"
              >
                Edit Type
              </Button>
              <Button
                style={{ width: "8rem" }}
                onClick={onDelete}
                variant="danger"
                size="md"
              >
                Delete Type
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}
