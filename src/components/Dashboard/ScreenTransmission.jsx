import { Container, Col, Row, Button, ListGroup } from "react-bootstrap";
import CarItem from "../Car";

const ScreenTransmission = () => {
  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col>
            <h3>Cars Transmission</h3>
            <Row className="mb-3 justify-content-between">
              <Col>
                <h3>List Car</h3>
              </Col>
              <Col className="d-flex flex-row justify-content-end">
                <Button variant="success">Add New Car</Button>
              </Col>
            </Row>
            <Row>
              <ListGroup horizontal className="px-3 gap-3 w-25">
                <ListGroup.Item action>All</ListGroup.Item>
                <ListGroup.Item action>Small</ListGroup.Item>
                <ListGroup.Item action>Medium</ListGroup.Item>
                <ListGroup.Item action>Large</ListGroup.Item>
              </ListGroup>
            </Row>
          </Col>
        </Row>

      <Row className="mt-3">
        <Col>
          <CreateTransmission
            onTransmissionCreated={getTransmissionData}
            id={id}
            setId={setId}
          />
        </Col>
        <Col xs={6}>
          <ListGroup as="ul">
            {transmissions.length === 0 ? (
              <h1>Transmissions not found!</h1>
            ) : (
              transmissions.map((transmission, index) => (
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
                        {transmission?.transmission_name}
                      </h6>
                    </Col>

                    <Col>
                      <div className="d-flex justify-content-center gap-3">
                        <Button
                          variant="primary"
                          size="md"
                          onClick={() => setId(transmission.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={(event) => onDelete(event, transmission.id)}
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

function CreateTransmission({ onTransmissionCreated, id, setId }) {
  const [transmissionName, setTransmissionName] = useState("");
  const [transmissionRegion, setTransmissionRegion] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const request = {
      transmissionName,
    };

    const result = id
      ? await updateTransmission(id, request)
      : await createTransmission(request);

    setIsLoading(false);

    if (result?.success) {
      toast.success("Data created successfully");
      onTransmissionCreated();
      setTransmissionName("");
      setId(null);
      return;
    } else {
      alert(result?.message);
    }

    toast.error(result?.message);
  };

  useEffect(() => {
    const fetchTransmissionDetail = async () => {
      if (id) {
        setIsLoading(true);
        const result = await getDetailTransmission(id);
        setIsLoading(false);
        if (result?.success) {
          setTransmissionName(result.data.transmission_name);
          setYear(result.data.year);
        }
      }
    };

    fetchTransmissionDetail();
  }, [id]);

  return (
    <Card>
      <Card.Header className="text-center">Create Transmission</Card.Header>
      <Card.Body>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <MoonLoader color="#1306ff" />
          </div>
        ) : (
          <Form onSubmit={onSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="transmission_name">
              <Form.Label column sm={3}>
                Name
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  required
                  value={transmissionName}
                  onChange={(event) => {
                    setTransmissionName(event.target.value);
                  }}
                />
              </Col>
            </Form.Group>
            <div className=" d-flex flex-row justify-content-end gap-2">
              <Button type="submit" variant="primary" disabled={isLoading}>
                {id ? "Update Transmissions " : "Create Transmissions"}
              </Button>
              {id && (
                <Button
                  onClick={() => {
                    setId(null);
                    onTransmissionCreated();
                  }}
                  // type="submit"
                  variant="danger"
                >
                  Cancel
                </Button>
              )}
            </div>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
}

export default ScreenTransmission;
