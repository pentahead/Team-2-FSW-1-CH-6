import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";

const CarItem = ({ car }) => {
  return (
    <Col md={3}>
      <Card style={{ width: "18rem", marginTop: "2rem" }}>
        <Card.Img
          variant="top"
          src={car?.image}
          alt={car?.Models?.model_name}
        />
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title>
            {car?.Models?.model_name} -{" "}
            {car?.Models?.Manufacture?.manufacture_name}
          </Card.Title>
          <Card.Text>
            <strong>Transmission:</strong>{" "}
            {car?.Models?.Transmission?.transmission_name}
          </Card.Text>
          <Card.Text>
            <strong>Type:</strong> {car?.Models?.Type?.type_name}
          </Card.Text>
          <Card.Text>
            <strong>Capacity:</strong>{" "}
            {car?.Models?.capacity || "Not specified"}
          </Card.Text>
          <Card.Text>
            <strong>Plate:</strong> {car?.plate}
          </Card.Text>
          <Card.Text>
            <strong>Rent per Day:</strong> Rp {car?.rentPerDay}
          </Card.Text>
          <Card.Text>
            <strong>Year:</strong> {car?.year}
          </Card.Text>
          <Card.Text>
            <strong>Available At:</strong>{" "}
            {new Date(car?.availableAt).toLocaleDateString()}
          </Card.Text>
          <Card.Text>
            <strong>Description:</strong> {car?.description}
          </Card.Text>
          <Card.Text>
            <strong>Availability:</strong> {car?.Available?.available_status}
          </Card.Text>

          <div>
            <h6>Specifications:</h6>
            <ul>
              {car?.Models?.modelSpecs?.map((spec) => (
                <li key={spec?.Specs?.id}>{spec?.Specs?.spec_name}</li>
              ))}
            </ul>
          </div>

          <div>
            <h6>Options:</h6>
            <ul>
              {car?.Models?.modelOptions?.map((option) => (
                <li key={option?.Options?.id}>
                  {option?.Options?.option_name}
                </li>
              ))}
            </ul>
          </div>

          <Button
            style={{ width: "15rem" }}
            as={Link}
            href={`/cars/${car?.id}`}
            variant="primary"
            className="mt-auto align-self-center"
          >
            Detail Car
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

CarItem.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number,
    plate: PropTypes.string,
    rentPerDay: PropTypes.number,
    description: PropTypes.string,
    availableAt: PropTypes.string,
    year: PropTypes.number,
    image: PropTypes.string,
    Models: PropTypes.shape({
      model_name: PropTypes.string,
      Transmission: PropTypes.shape({
        transmission_name: PropTypes.string,
      }),
      capacity: PropTypes.number,
      Type: PropTypes.shape({
        type_name: PropTypes.string,
      }),
      Manufacture: PropTypes.shape({
        manufacture_name: PropTypes.string,
      }),
      modelSpecs: PropTypes.arrayOf(
        PropTypes.shape({
          Specs: PropTypes.shape({
            spec_name: PropTypes.string,
          }),
        })
      ),
      modelOptions: PropTypes.arrayOf(
        PropTypes.shape({
          Options: PropTypes.shape({
            option_name: PropTypes.string,
          }),
        })
      ),
    }),
    Available: PropTypes.shape({
      available_status: PropTypes.string,
    }),
  }),
};

export default CarItem;
