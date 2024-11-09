import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {
  deleteManufacture,
  getDetailManufacture,
} from "../../service/manufacture";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

export const Route = createLazyFileRoute("/manufactures/$id")({
  component: ManufacturesDetail,
});

function ManufacturesDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [manufacture, setManufacture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const getDetailManufacturesData = async (id) => {
      setIsLoading(true);
      const result = await getDetailManufacture(id);
      if (result?.success) {
        setManufacture(result.data);
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
      }
      setIsLoading(false);
    };

    if (id) {
      getDetailManufacturesData(id);
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
          <h1 className="text-center">Manufactures is not found!</h1>
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
            const result = await deleteManufacture(id);
            if (result?.success) {
              navigate({ to: "/manufactures" });
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
    <Row className="mt-5 d-flex justify-content-center">
      <Col md={6} lg={5}>
        <Card className="shadow-lg p-4">
          <Card.Body>
            {/* Title */}
            <Card.Title className="text-center mb-4 fs-4">
              {manufacture?.manufacture_name}
            </Card.Title>

            {/* Details with Right and Left Alignment */}
            <div className="mb-3 d-flex justify-content-between">
              <span className="fw-bold">Manufacture Region:</span>
              <span>{manufacture?.manufacture_region}</span>
            </div>
            <div className="mb-3 d-flex justify-content-between">
              <span className="fw-bold">Year Established:</span>
              <span>{manufacture?.year_establish}</span>
            </div>

            {/* Centered Buttons */}
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button
                as={Link}
                to={`/manufactures/edit/${id}`}
                variant="primary"
                size="md"
              >
                Edit
              </Button>
              <Button onClick={onDelete} variant="danger" size="md">
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
