import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getOption } from "../../service/option";
import OptionItem from "../../components/Option/OptionItem";

export const Route = createLazyFileRoute("/options/")({
  component: Option,
});

function Option() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [Options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getOptionData = async () => {
      setIsLoading(true);
      const result = await getOption();
      if (result.success) {
        setOptions(result.data);
      }
      setIsLoading(false);
    };

    if (token) {
      getOptionData();
    }
  }, [token]);

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">
            Please login first to get Option data!
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
            onClick={() => navigate({ to: "/options/create" })}
            className="btn btn-primary"
          >
            Add New Option
          </button>
        </Col>
      </Row>

      <Row className="mt-4">
        {Options.length === 0 ? (
          <h1>Options not found!</h1>
        ) : (
          Options.map((option) => (
            <OptionItem option={option} key={option?.id} />
          ))
        )}
      </Row>
    </>
  );
}
