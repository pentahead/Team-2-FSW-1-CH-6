import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getSpecs } from "../../service/specs";
import SpecItem from "../../components/Spec/SpecItem";

export const Route = createLazyFileRoute("/specs/")({
  component: Spec,
});

function Spec() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [Specs, setSpecs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getSpecData = async () => {
      setIsLoading(true);
      const result = await getSpecs();
      if (result.success) {
        setSpecs(result.data);
      }
      setIsLoading(false);
    };

    if (token) {
      getSpecData();
    }
  }, [token]);

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">Please login first to get Spec data!</h1>
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
            onClick={() => navigate({ to: "/specs/create" })}
            className="btn btn-primary"
          >
            Add New Spec
          </button>
        </Col>
      </Row>

      <Row className="mt-4">
        {Specs.length === 0 ? (
          <h1>Specs not found!</h1>
        ) : (
          Specs.map((spec) => <SpecItem spec={spec} key={spec?.id} />)
        )}
      </Row>
    </>
  );
}
