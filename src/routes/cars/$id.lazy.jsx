import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { deleteCar, getDetailCar } from "../../service/cars";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

export const Route = createLazyFileRoute("/cars/$id")({
  component: CarDetail,
});

function CarDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const getDetailCarData = async (id) => {
      setIsLoading(true);
      const result = await getDetailCar(id);
      if (result?.success) {
        setCar(result.data);
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
      }
      setIsLoading(false);
    };

    if (id) {
      getDetailCarData(id);
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
          <h1 className="text-center">Car is not found!</h1>
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
            const result = await deleteCar(id);
            if (result?.success) {
              navigate({ to: "/cars" });
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
      <Col md={{ span: 6, offset: 3 }}>
        <Card>
          <Card.Img
            variant="top"
            src={car?.image}
            alt={car?.Models?.model_name}
            style={{ maxHeight: "250px", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title>
              <h4>
                <strong>
                  {car?.Models?.model_name} -{" "}
                  {car?.Models?.Manufacture?.manufacture_name}
                </strong>
              </h4>
            </Card.Title>

            {/* Rent per Day */}
            <div className="d-flex justify-content-between my-2">
              <span>
                <strong>Rent per Day:</strong>
              </span>
              <span>Rp {car?.rentPerDay}</span>
            </div>

            {/* Availability */}
            <div className="d-flex justify-content-between my-2">
              <span>
                <strong>Availability:</strong>
              </span>
              <span>{car?.Available?.available_status}</span>
            </div>

            {/* Available At */}
            <div className="d-flex justify-content-between my-2">
              <span>
                <strong>Available At:</strong>
              </span>
              <span>{new Date(car?.availableAt).toLocaleDateString()}</span>
            </div>

            {/* Plate */}
            <div className="d-flex justify-content-between my-2">
              <span>
                <strong>Plate:</strong>
              </span>
              <span>{car?.plate}</span>
            </div>

            {/* Type */}
            <div className="d-flex justify-content-between my-2">
              <span>
                <strong>Type:</strong>
              </span>
              <span>{car?.Models?.Type?.type_name}</span>
            </div>

            {/* Transmission */}
            <div className="d-flex justify-content-between my-2">
              <span>
                <strong>Transmission:</strong>
              </span>
              <span>{car?.Models?.Transmission?.transmission_name}</span>
            </div>

            {/* Year */}
            <div className="d-flex justify-content-between my-2">
              <span>
                <strong>Year:</strong>
              </span>
              <span>{car?.year}</span>
            </div>

            {/* Capacity */}
            <div className="d-flex justify-content-between my-2">
              <span>
                <strong>Capacity:</strong>
              </span>
              <span>{car?.Models?.capacity || "Not specified"}</span>
            </div>

            {/* Description */}
            <div className="my-3">
              <strong>Description:</strong>
              <p>{car?.description}</p>
            </div>

            {/* Options */}
            <div className="my-3">
              <h6>Options:</h6>
              {car?.Models?.modelOptions?.length > 0 ? (
                <ul>
                  {car.Models.modelOptions.map((option, index) => (
                    <li key={index}>{option?.Options?.option_name}</li>
                  ))}
                </ul>
              ) : (
                <span>No options available</span>
              )}
            </div>

            {/* Specifications */}
            <div className="my-3">
              <h6>Specifications:</h6>
              {car?.Models?.modelSpecs?.length > 0 ? (
                <ul>
                  {car.Models.modelSpecs.map((spec, index) => (
                    <li key={index}>{spec?.Specs?.spec_name}</li>
                  ))}
                </ul>
              ) : (
                <span>No specs available</span>
              )}
            </div>

            {/* Buttons */}
            <div className="d-grid gap-2 mt-4">
              <Button
                as={Link}
                href={`/cars/edit/${car?.id}`}
                variant="primary"
                size="md"
              >
                Edit Car
              </Button>
              <Button onClick={onDelete} variant="danger" size="md">
                Delete Car
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
