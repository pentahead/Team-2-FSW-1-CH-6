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
// import {
//   createSpec,
//   deleteSpec,
//   getSpec,
//   updateSpec,
//   getDetailSpec,
// } from "../../service/spec"; // ganti dengan service yang sesuai
import { confirmAlert } from "react-confirm-alert";
import {
  getSpecs,
  createSpec,
  deleteSpec,
  updateSpec,
  getDetailSpec,
} from "../../service/specs";

const ScreenSpecs = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [specs, setSpecs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);

  const getSpecData = async () => {
    setIsLoading(true);
    const result = await getSpecs(); // ganti dengan API yang sesuai
    if (result.success) {
      setSpecs(result.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
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
            const result = await deleteSpec(id); // ganti dengan API yang sesuai
            if (result?.success) {
              toast.success("Data deleted successfully");
              getSpecData();
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
              <h3 className="text-primary">Spec</h3>
              <h5 className="text-muted">Manage Spec</h5>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <CreateSpec onSpecCreated={getSpecData} id={id} setId={setId} />
        </Col>
        <Col xs={6}>
          <ListGroup as="ul">
            {specs.length === 0 ? (
              <h1>Specs not found!</h1>
            ) : (
              specs.map((spec, index) => (
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
                        {spec?.spec_name} {/* Ganti dengan field yang sesuai */}
                      </h6>
                    </Col>

                    <Col>
                      <div className="d-flex justify-content-center gap-3">
                        <Button
                          variant="primary"
                          size="md"
                          onClick={() => setId(spec.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={(event) => onDelete(event, spec.id)}
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

function CreateSpec({ onSpecCreated, id, setId }) {
  const [specName, setSpecName] = useState(""); // Ganti dengan field yang sesuai
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const request = {
      specName, // Ganti dengan field yang sesuai
    };

    const result = id
      ? await updateSpec(id, request) // ganti dengan API yang sesuai
      : await createSpec(request); // ganti dengan API yang sesuai

    setIsLoading(false);

    if (result?.success) {
      toast.success("Data created successfully");
      onSpecCreated();
      setSpecName(""); // Reset field
      setId(null);
      return;
    } else {
      alert(result?.message);
    }

    toast.error(result?.message);
  };

  useEffect(() => {
    const fetchSpecDetail = async () => {
      if (id) {
        setIsLoading(true);
        const result = await getDetailSpec(id); // ganti dengan API yang sesuai
        setIsLoading(false);
        if (result?.success) {
          setSpecName(result.data.spec_name); // Ganti dengan field yang sesuai
        }
      }
    };

    fetchSpecDetail();
  }, [id]);

  return (
    <Card>
      <Card.Header className="text-center">Create Spec</Card.Header>
      <Card.Body>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <MoonLoader color="#1306ff" />
          </div>
        ) : (
          <Form onSubmit={onSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="spec_name">
              <Form.Label column sm={3}>
                Name
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Spec Name"
                  required
                  value={specName}
                  onChange={(event) => {
                    setSpecName(event.target.value);
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
                    ? "Update Spec"
                    : "Create Spec"}
              </Button>
            </div>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
}

export default ScreenSpecs;
