import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Container,
  Col,
  Row,
  Button,
  ListGroup,
  Image,
  Card,
  Form,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  createManufacture,
  deleteManufacture,
  getDetailManufacture,
  getManufacture,
  updateManufacture,
} from "../../service/manufacture";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";

const ScreenManufactures = () => {
  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col>
            <h3>Cars Manufactures</h3>
            <Row className="mb-3 justify-content-between">
              <Col>
                <h3>Manufactures</h3>
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
          <Col>{/* <CarItem /> */}</Col>
        </Row>
      </Container>
    </>
  );
};

function CreateManufacture({ onManufactureCreated, id, setId }) {
  const [manufactureName, setManufactureName] = useState("");
  const [manufactureRegion, setManufactureRegion] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchManufactureDetail = async () => {
      if (id) {
        setIsLoading(true); // Set loading to true when fetching data
        const result = await getDetailManufacture(id);
        setIsLoading(false); // Set loading to false after fetching is done
        if (result?.success) {
          setManufactureName(result.data.manufacture_name);
          setManufactureRegion(result.data.manufacture_region);
          setYear(result.data.year_establish);
        }
      }
    };

    fetchManufactureDetail();
  }, [id]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading to true when the form is being submitted

    const request = {
      manufactureName,
      manufactureRegion,
      year,
    };

    const result = id
      ? await updateManufacture(id, request)
      : await createManufacture(request);

    setIsLoading(false); // Set loading to false after the request is complete

    if (result?.success) {
      toast.success("Data created successfully");
      onManufactureCreated();
      setManufactureName("");
      setManufactureRegion("");
      setYear("");
      setId(null);
      return;
    } else {
      alert(result?.message);
    }

    toast.error(result?.message);
  };

  return (
    <Card>
      <Card.Header className="text-center">Create Manufacture</Card.Header>
      <Card.Body>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <MoonLoader color="#1306ff" />
          </div>
        ) : (
          <Form onSubmit={onSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="manufacture_name">
              <Form.Label column sm={3}>
                Name
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  required
                  value={manufactureName}
                  onChange={(event) => setManufactureName(event.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="manufacture_region"
            >
              <Form.Label column sm={3}>
                Manufacture region
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Manufacture region"
                  required
                  value={manufactureRegion}
                  onChange={(event) => setManufactureRegion(event.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="year">
              <Form.Label column sm={3}>
                Year
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="number"
                  placeholder="Year"
                  required
                  value={year}
                  onChange={(event) => setYear(event.target.value)}
                />
              </Col>
            </Form.Group>
            <div className="d-flex flexe-row justify-content-end gap-2">
              <Button type="submit" variant="primary" disabled={isLoading}>
                {id ? "Update Manufacture" : "Create Manufacture"}
              </Button>
              {id && (
                <Button
                  onClick={() => {
                    setId(null);
                    onManufactureCreated();
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

export default ScreenManufactures;
