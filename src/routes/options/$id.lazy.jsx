import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { deleteOption, getDetailOption } from "../../service/option";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

export const Route = createLazyFileRoute("/options/$id")({
  component: OptionsDetail,
});

function OptionsDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [option, setOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const getDetailOptionsData = async (id) => {
      setIsLoading(true);
      const result = await getDetailOption(id);
      if (result?.success) {
        setOption(result.data);
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
      }
      setIsLoading(false);
    };

    if (id) {
      getDetailOptionsData(id);
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
          <h1 className="text-center">Options is not found!</h1>
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
            const result = await deleteOption(id);
            if (result?.success) {
              navigate({ to: "/options" });
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
              {option?.option_name}
            </Card.Title>

            {/* Center the buttons horizontally */}
            <div className="d-flex justify-content-center gap-3">
              <Button
                style={{ width: "8rem" }}
                as={Link}
                href={`/options/edit/${id}`}
                variant="primary"
                size="md"
              >
                Edit Option
              </Button>
              <Button
                style={{ width: "8rem" }}
                onClick={onDelete}
                variant="danger"
                size="md"
              >
                Delete Option
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}
