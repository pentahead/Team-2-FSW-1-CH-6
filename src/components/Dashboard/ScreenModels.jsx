import { Container, Col, Row, Button, ListGroup } from "react-bootstrap";
import CarItem from "../Car";

const ScreenModels = () => {
  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col>
            <h3>Cars Models</h3>
            <Row className="mb-3 justify-content-between">
              <Col>
                <h3>Models</h3>
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
            <CarItem />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ScreenModels;
