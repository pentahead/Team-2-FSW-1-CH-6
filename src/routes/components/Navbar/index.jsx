import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "@tanstack/react-router"; // Pastikan Anda menggunakan Link dari react-router

function OffcanvasExample() {
  return (
    <>
      {["xxl"].map((expand) => (
        <Navbar
          style={{ background: "#f1f3ff" }}
          key={expand}
          expand={expand}
          className="mb-0"
        >
          <Container>
            <Navbar.Brand href="#">Binar Car Rental</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Binar Car Rental
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3 text-black">
                  <Nav.Link as={Link} to="#our-service">
                    Our Service
                  </Nav.Link>
                  <Nav.Link as={Link} to="#why-us">
                    Why Us
                  </Nav.Link>
                  <Nav.Link as={Link} to="#testimonial">
                    Testimonial
                  </Nav.Link>
                  <Nav.Link as={Link} to="#faq">
                    FAQ
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="#register"
                    className="rounded-3 bg-success text-white px-3"
                  >
                    Register
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;
