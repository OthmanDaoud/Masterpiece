import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const btnText = "Sign up for Free";
const title = "Shop now Anytime, Anywhere";
const desc =
  "we specialize in providing a vast array of materials to cater to all your project needs";

const AppSection = () => {
  return (
    <div className="app-section padding-tb">
      <div className="container">
        <div className="section-header text-center">
          <Link
            to="/sign-up"
            className="btn custom-btn mb-4"
            style={{
              backgroundColor: "rgb(243, 132, 24)",
              border: "none",
              color: "white",
              padding: "10px 20px",
              fontSize: "16px",
              textDecoration: "none",
              display: "inline-block",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            {btnText}
          </Link>
          <h2 className="title">{title}</h2>
          <p>{desc}</p>
        </div>
      </div>
      <section className="py-6 pt-40 px-12 mt-5 mb-5">
        <Container className="px-6 mt-4 mb-4">
          <Row className="text-center">
            <Col md={4} className="mb-4">
              <Card
                className="bg-gradient shadow-lg transform transition-transform"
                style={{
                  borderColor: "black",
                  borderRadius: "1.2rem",
                }}
              >
                <Card.Body>
                  <div className="d-flex justify-content-center mb-4"></div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: "black" }}
                  >
                    Competitive Prices
                  </h3>
                  <p className="text-gray-600">
                    Enjoy the best deals and save your money with our unbeatable
                    prices.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card
                className="bg-gradient shadow-lg transform transition-transform"
                style={{
                  borderColor: "black",
                  borderRadius: "1.2rem",
                }}
              >
                <Card.Body>
                  <div className="d-flex justify-content-center mb-4"></div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Classy Treatment
                  </h3>
                  <p className="text-gray-600">
                    Enjoy exceptional service and luxury from the start of your
                    journey with us.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card
                className="bg-gradient shadow-lg transform transition-transform"
                style={{
                  borderColor: "black",
                  borderRadius: "1.2rem",
                }}
              >
                <Card.Body>
                  <div className="d-flex justify-content-center mb-4"></div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Your Time is Priority
                  </h3>
                  <p className="text-gray-600">
                    We value your time and ensure prompt and efficient service
                    every step of the way.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AppSection;
