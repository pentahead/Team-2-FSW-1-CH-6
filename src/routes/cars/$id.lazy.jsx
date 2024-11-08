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
      <Col className="offset-md-3">
        <Card>
          <Card.Body>
          <Card.Img
              variant="top"
              src={car?.image}
              alt={car?.Models?.model_name}
            />
            <Card.Title>
              {car?.Models?.model_name} -{" "}
              {car?.Models?.Manufacture?.manufacture_name}
            </Card.Title>
           

            {/* Menampilkan Transmission */}
            <Card.Text>
              <strong>Transmission:</strong>{" "}
              {car?.Models?.Transmission?.transmission_name}
            </Card.Text>

            {/* Menampilkan Capacity */}
            <Card.Text>
              <strong>Capacity:</strong>{" "}
              {car?.Models?.capacity || "Not specified"}
            </Card.Text>

            {/* Menampilkan Type */}
            <Card.Text>
              <strong>Type:</strong> {car?.Models?.Type?.type_name}
            </Card.Text>

            {/* Menampilkan Plate */}
            <Card.Text>
              <strong>Plate:</strong> {car?.plate}
            </Card.Text>

            {/* Menampilkan Rent per Day */}
            <Card.Text>
              <strong>Rent per Day:</strong> Rp {car?.rentPerDay}
            </Card.Text>

            {/* Menampilkan Year */}
            <Card.Text>
              <strong>Year:</strong> {car?.year}
            </Card.Text>

            {/* Menampilkan Available At */}
            <Card.Text>
              <strong>Available At:</strong>{" "}
              {new Date(car?.availableAt).toLocaleDateString()}
            </Card.Text>

            {/* Menampilkan Description */}
            <Card.Text>
              <strong>Description:</strong> {car?.description}
            </Card.Text>

            {/* Menampilkan Availability */}
            <Card.Text>
              <strong>Availability:</strong> {car?.Available?.available_status}
            </Card.Text>

            {/* Menampilkan car Options */}
            <Card.Text>
              <h6>Options:</h6>
              {car?.Models?.modelOptions &&
              car.Models.modelOptions.length > 0 ? (
                <ul>
                  {car.Models.modelOptions.map((option, index) => (
                    <li key={index}>{option?.Options?.option_name}</li>
                  ))}
                </ul>
              ) : (
                <span>No options available</span>
              )}
            </Card.Text>

            {/* Menampilkan car Specs */}
            <Card.Text>
              <h6>Specifications:</h6>
              {car?.Models?.modelSpecs && car.Models.modelSpecs.length > 0 ? (
                <ul>
                  {car.Models.modelSpecs.map((spec, index) => (
                    <li key={index}>{spec?.Specs?.spec_name}</li>
                  ))}
                </ul>
              ) : (
                <span>No specs available</span>
              )}
            </Card.Text>

            {/* Tombol untuk Edit */}
            <Card.Text>
              <div className="d-grid gap-2">
                <Button
                  as={Link}
                  href={`/cars/edit/${id}`}
                  variant="primary"
                  size="md"
                >
                  Edit car
                </Button>
              </div>
            </Card.Text>

            {/* Tombol untuk Delete */}
            <Card.Text>
              <div className="d-grid gap-2">
                <Button onClick={onDelete} variant="danger" size="md">
                  Delete car
                </Button>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}
