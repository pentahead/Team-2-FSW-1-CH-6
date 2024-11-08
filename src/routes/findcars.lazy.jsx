import { createLazyFileRoute } from "@tanstack/react-router";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import GuestLayout from "../layouts/GuestLayout";

export const Route = createLazyFileRoute("/findcars")({
  component: FindCars,
});

const HeroSection = () => {
  return (
    <section id="hero" style={{ background: "#f1f3ff" }}>
      <Container className="hero">
        <Row className="pt-5 d-flex justify-content-center align-items-center flex-sm-column flex-lg-row">
          <Col lg={6} sm={6}>
            <h1>Sewa & Rental Mobil Terbaik di kawasan Jambi</h1>
            <p className="col-11 mt-4 mb-3">
              Selamat datang di Binar Car Rental. Kami menyediakan mobil
              kualitas terbaik dengan harga terjangkau. Selalu siap melayani
              kebutuhanmu untuk sewa mobil selama 24 jam.
            </p>
          </Col>

          <Col
            lg={6}
            sm={6}
            className="container-fluid d-flex justify-content-end"
          >
            <Image src="img/img_car.png" alt="mobil" fluid />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const SearchSection = () => {
  return (
    <section id="search">
      <Container className="search position-relative">
        <div className="container row cari mobil position-absolute top-0 start-50 translate-middle bg-white py-3 flex justify-content-center shadow-lg rounded-4">
          <Col className="text-light text-black">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="driver">Tipe Driver</Form.Label>
              <Form.Select id="driver" name="driver">
                <option selected>Tipe Driver</option>
                <option value="true">Dengan Sopir</option>
                <option value="false">Tanpa Sopir</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col className="text-light text-black">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="calender">Tanggal</Form.Label>
              <Form.Control id="date" name="calender" type="date" />
            </Form.Group>
          </Col>
          <Col className="text-light text-black">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="time">Tanggal Penjemputan</Form.Label>
              <Form.Select id="time" name="time">
                <option selected>Pilih Waktu</option>
                <option value="T08:00:00.000Z">08:00 WIB</option>
                <option value="T09:00:00.000Z">09:00 WIB</option>
                <option value="T10:00:00.000Z">10:00 WIB</option>
                <option value="T11:00:00.000Z">11:00 WIB</option>
                <option value="T12:00:00.000Z">12:00 WIB</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col className="text-light text-black">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="count">
                Jumlah Penumpang (opsional)
              </Form.Label>
              <Form.Control id="count" name="count" type="number" min="0" />
            </Form.Group>
          </Col>
          <Col className="fw-light text-black">
            <div className="flex align-content-center w-100 h-100">
              <Button
                variant="success"
                className="text-white"
                id="btn-submit"
                disabled
              >
                Cari Mobil
              </Button>
            </div>
          </Col>
        </div>
      </Container>
    </section>
  );
};

const ResultSection = () => {
  return (
    <section id="result">
      <Container className="mt-5 py-5">
        <Row
          className="result container d-flex flex-wrap justify-content-center gap-5"
          id="result-card"
        ></Row>
      </Container>
    </section>
  );
};

function Cars() {
  return (
    <>
      <GuestLayout>
        <HeroSection />
        <SearchSection />
        <ResultSection />
      </GuestLayout>
    </>
  );
}
