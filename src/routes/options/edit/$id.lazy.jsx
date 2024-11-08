import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { getDetailOption, updateOption } from "../../../service/option";
import Protected from "../../../components/Auth/Protected";

export const Route = createLazyFileRoute("/options/edit/$id")({
  component: () => (
    <Protected roles={[1]}>
      <EditOption />
    </Protected>
  ),
});

function EditOption() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [optionName, setOptionName] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDetailOptionData = async (id) => {
      setIsLoading(true);
      const result = await getDetailOption(id);
      if (result?.success) {
        setOptionName(result.data?.optionName);
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
      }
      setIsLoading(false);
    };

    if (id) {
      getDetailOptionData(id);
    }
  }, [id]);

  if (isNotFound) {
    navigate({ to: "/options" });
    return;
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    const request = {
      optionName,
    };
    const result = await updateOption(id, request);
    if (result?.success) {
      navigate({ to: `/options/${id}` });
      return;
    }

    alert(result?.message);
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Edit Option</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="option_name">
                <Form.Label column sm={3}>
                  Option Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Option Name"
                    required
                    value={optionName}
                    onChange={(event) => {
                      setOptionName(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">
                  Edit Option
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}
