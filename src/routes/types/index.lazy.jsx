import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getType } from "../../service/type";
import TypeItem from "../../components/Type/TypeItem";

export const Route = createLazyFileRoute("/types/")({
  component: Type,
});

function Type() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTypeData = async () => {
      setIsLoading(true);
      const result = await getType();
      if (result.success) {
        setTypes(result.data);
      }
      setIsLoading(false);
    };

    if (token) {
      getTypeData();
    }
  }, [token]);

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">Please login first to get Type data!</h1>
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
            onClick={() => navigate({ to: "/types/create" })}
            className="btn btn-primary"
          >
            Add New Type
          </button>
        </Col>
      </Row>

      <Row className="mt-4">
        {types.length === 0 ? (
          <h1>Types not found!</h1>
        ) : (
          types.map((type) => <TypeItem type={type} key={type?.id} />)
        )}
      </Row>
    </>
  );
}
