import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getCars } from "../../service/cars";
import CarItem from "../../components/Car/CarItem";

export const Route = createLazyFileRoute("/cars/")({
  component: CarIndex,
});

function CarIndex() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [Cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCarData = async () => {
      setIsLoading(true);
      const result = await getCars();
      if (result.success) {
        setCars(result.data);
      }
      setIsLoading(false);
    };

    if (token) {
      getCarData();
    }
  }, [token]);

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">Please login first to get Car data!</h1>
        </Col>
      </Row>
    );
  }

  if (isLoading) {
    return (
      <Row className="mt-4">
        <h1>Loading...</h1>
      </Row>
    );
  }

  return (
    <>
      <Row className="mt-4">
        <Col>
          <button
            onClick={() => navigate({ to: "/cars/create" })}
            className="btn btn-primary"
          >
            Add New Car
          </button>
        </Col>
      </Row>

      <Row className="mt-4">
        {Cars.length === 0 ? (
          <h1>Cars is not found!</h1>
        ) : (
          Cars.map((car) => <CarItem car={car} key={car?.id} />)
        )}
      </Row>
    </>
  );
}
