import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";

const CarItem = ({ car }) => {
  return (
    <>
      <Col md={3}>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={car?.car_picture} />
          <Card.Body>
            <Card.Title>{car?.name}</Card.Title>
            <Card.Text>{car?.nick_name}</Card.Text>
            <Button as={Link} href={`/cars/${car?.id}`} variant="primary">
              Detail car
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
CarItem.propTypes = {
  car: PropTypes.object,
};

export default CarItem;
