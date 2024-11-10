import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  Form,
  Card,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import { confirmAlert } from "react-confirm-alert";
import {
  createAvailable,
  getAvailables,
  getDetailAvailable,
  updateAvailable,
} from "../../service/availables";

const ScreenAvailables = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [availables, setAvailabels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);

  const getAvailableData = async () => {
    setIsLoading(true);
    const result = await getAvailables();
    if (result.success) {
      setAvailabels(result.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (token) {
      getAvailableData();
    }
  }, [token]);

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">
            Please login first to get Available data!
          </h1>
        </Col>
      </Row>
    );
  }

  if (isLoading) {
    return (
      <Row
        className="mt-4 d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <MoonLoader color="#1306ff" />
      </Row>
    );
  }

  const onDelete = async (event, id) => {
    event.preventDefault();

    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this data?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const result = await deleteAvailable(id);
            if (result?.success) {
              toast.success("Data deleted successfully");
              getAvailableData();
              return;
            }

            toast.error(result?.message);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <Container className="mt-2">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h3 className="text-primary">Available</h3>
              <h5 className="text-muted">Manage Available</h5>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <CreateAvailable
            onAvailableCreated={getAvailableData}
            id={id}
            setId={setId}
          />
        </Col>
        <Col xs={6}>
          <ListGroup as="ul">
            {availables.length === 0 ? (
              <h1>Availables not found!</h1>
            ) : (
              availables.map((available, index) => (
                <ListGroup.Item
                  as="li"
                  key={index}
                  className="py-3 border-bottom"
                >
                  <Row className="align-items-center">
                    <Col xs="auto">
                      <span>{index + 1}</span>
                    </Col>
                    <Col>
                      <h6 className="mb-0 text-dark">
                        {" "}
                        {availables?.available_status}
                      </h6>
                    </Col>

                    <Col>
                      <div className="d-flex justify-content-center gap-3">
                        <Button
                          variant="primary"
                          size="md"
                          onClick={() => setId(availables.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={(event) => onDelete(event, availables.id)}
                          variant="danger"
                          size="md"
                        >
                          Delete
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

function CreateAvailable({ onAvailableCreated, id, setId }) {
  const [availableStatus, setAvailableName] = useState("");
  const [availableName, setAvailableName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const request = {
      availableStatus,
    };

    const result = id
      ? await updateAvailable(id, request) // ganti dengan API yang sesuai
      : await createAvailable(request); // ganti dengan API yang sesuai

    setIsLoading(false);

    if (result?.success) {
      toast.success("Data created successfully");
      onAvailableCreated();
      setAvailableName("");
      setId(null);
      return;
    } else {
      alert(result?.message);
    }

    toast.error(result?.message);
  };

  useEffect(() => {
    const fetchAvailableDetail = async () => {
      if (id) {
        setIsLoading(true); // Set loading to true when fetching data
        const result = await getDetailAvailable(id);
        setIsLoading(false); // Set loading to false after fetching is done
        if (result?.success) {
          setAvailableName(result.data.available_status);
        }
      }
    };

    fetchAvailableDetail();
  }, [id]);

  return (
    <Card>
      <Card.Header className="text-center">Create Available</Card.Header>
      <Card.Body>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <MoonLoader color="#1306ff" />
          </div>
        ) : (
          <Form onSubmit={onSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="available_name">
              <Form.Label column sm={3}>
                Name
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Available Name"
                  required
                  value={availableName}
                  onChange={(event) => {
                    setAvailableName(event.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            <div className="d-grid gap-2">
              <Button type="submit" variant="primary" disabled={isLoading}>
                {isLoading
                  ? id
                    ? "Updating..."
                    : "Creating..."
                  : id
                    ? "Update Available"
                    : "Create Available"}
              </Button>
            </div>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
}

export default ScreenAvailables;
