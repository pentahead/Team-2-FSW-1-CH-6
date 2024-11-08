import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { register } from "../service/auth";

export const Route = createLazyFileRoute("/register")({
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(undefined);

  // useEffect(() => {
  //   if (token) {
  //     navigate({ to: "/" });
  //   }
  // }, [token, navigate]);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and password confirmation must be the same!");
      return;
    }

    const request = {
      name,
      email,
      password,
      profilePicture,
    };

    const result = await register(request);
    if (result.success) {
      localStorage.setItem("token", result.data.token);
      window.location = "/";
    } else {
      alert(result.message);
    }
  };

  return (
    <section className="d-flex z-1 bg-light justify-content-center align-items-center vh-100 bg-login position-relative overflow-hidden">
      <Container>
        <Row className="justify-content-center position-relative">
          <Col
            md={6}
            lg={4}
            style={{
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: "0.5rem",
            }}
            className="bg-transparent rounded-4 shadow-lg p-4 position-relative"
          >
            <div className="text-center mt-4">
              <h2 className="fw-bold">Register</h2>
            </div>

            <Form onSubmit={onSubmit} className="z-3 p-5">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Choose File"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                  accept=".jpg,.png"
                  required
                />
              </Form.Group>

              <Button variant="dark" type="submit" className="w-100 mt-3">
                Register
              </Button>
            </Form>
          </Col>
          <div className="decoration position-absolute top-50 end-50 start-50 z-n1 start-0 translate-middle">
            <img src="img/car2.png" alt="Decoration" className="img-fluid" />
          </div>
        </Row>
      </Container>
    </section>
  );
}
