import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";

const CarItem = ({ car }) => {
  return (
    <Col md={3} className="d-flex">
      <Card style={{ width: "18rem", marginTop: "2rem", flex: 1 }}>
        <Card.Img
          variant="top"
          src={car?.image}
          alt={car?.Models?.model_name}
        />
        <Card.Body
          className="d-flex object-fit-cover flex-column justify-content-between"
          style={{ minHeight: "18rem" }}
        >
          <div>
            <Card.Text>
              <strong>
                {car?.Models?.model_name} -{" "}
                {car?.Models?.Manufacture?.manufacture_name}
              </strong>
            </Card.Text>
            <Card.Title>
              <h5>
                <strong> Rp {car?.rentPerDay}/Hari</strong>
              </h5>
            </Card.Title>
            <Card.Text>{car?.description}</Card.Text>

            <Card.Text>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <i class="bi bi-person me-2"></i>{" "}
                  {car?.Models?.capacity || "Not specified"} Orang
                </li>
                <li class="list-group-item">
                  <i class="bi bi-gear me-2"></i>{" "}
                  {car?.Models?.Transmission?.transmission_name}
                </li>
                <li class="list-group-item">
                  <i class="bi bi-calendar me-2"></i> Tahun {car?.year}
                </li>
              </ul>
            </Card.Text>
          </div>

          <Button
            as={Link}
            href={`/cars/${car?.id}`}
            variant="primary"
            className="mt-3 w-100"
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
