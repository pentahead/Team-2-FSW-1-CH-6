import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getModels } from "../../service/models";
import ModelItem from "../../components/Model/ModelItem";

export const Route = createLazyFileRoute("/models/")({
  component: ModelIndex,
});

function ModelIndex() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [Models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getModelData = async () => {
      setIsLoading(true);
      const result = await getModels();
      if (result.success) {
        setModels(result.data);
      }
      setIsLoading(false);
    };

    if (token) {
      getModelData();
    }
  }, [token]);

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">Please login first to get Model data!</h1>
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
            onClick={() => navigate({ to: "/models/create" })}
            className="btn btn-primary"
          >
            Add New Spec
          </button>
        </Col>
      </Row>

      <Row className="mt-4">
        {Models.length === 0 ? (
          <h1>Models is not found!</h1>
        ) : (
          Models.map((model) => <ModelItem model={model} key={model?.id} />)
        )}
      </Row>
    </>
  );
}
