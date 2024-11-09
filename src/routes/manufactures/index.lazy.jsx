import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getManufacture } from "../../service/manufacture";
import ManufactureItem from "../../components/Manufacture/ManufactureItem";

export const Route = createLazyFileRoute("/manufactures/")({
  component: Manufacture,
});

function Manufacture() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [manufactures, setManufactures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getManufactureData = async () => {
      setIsLoading(true);
      const result = await getManufacture();
      if (result.success) {
        setManufactures(result.data);
      }
      setIsLoading(false);
    };

    if (token) {
      getManufactureData();
    }
  }, [token]);

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">
            Please login first to get Manufacture data!
          </h1>
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
      {/* Add a button to redirect to /specs/create */}
      <Row className="mt-4">
        <Col>
          <button
            onClick={() => navigate({ to: "/manufactures/create" })}
            className="btn btn-primary"
          >
            Add New Manufacture
          </button>
        </Col>
      </Row>

      <Row className="mt-4">
        {manufactures.length === 0 ? (
          <h1>Manufactures not found!</h1>
        ) : (
          manufactures.map((manufacture) => (
            <ManufactureItem manufacture={manufacture} key={manufacture?.id} />
          ))
        )}
      </Row>
    </>
  );
}
