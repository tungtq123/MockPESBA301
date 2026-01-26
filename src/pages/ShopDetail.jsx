import { Container, Row, Col, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const ShopDetail = () => {
  const navigate = useNavigate();

  // mock data (sau này có thể lấy từ API hoặc state)

  const {state: shop} = useLocation();

  return (
    <Container className="mt-5">
      {/* Title */}
      <Row className="mb-4">
        <Col className="text-center">
          <h4 className="fw-bold">VIEW DETAILS</h4>
        </Col>
      </Row>

      {/* Content */}
      <Row className="justify-content-center">
        <Col md={12}>
          <Row className="mb-3">
            <Col md={5} className="text-end fw-semibold">
              Shop Name: {shop.name}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={5} className="text-end fw-semibold">
              Owner: {shop.owner}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={5} className="text-end fw-semibold">
              Type: {shop.type}
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xs={5} className="text-end fw-semibold">
              Open time: {shop.openTime}
            </Col>
          </Row>

          {/* Button */}
          <Row>
            <Col className="text-center">
              <Button
                variant="outline-primary"
                onClick={() => navigate("/")}
                style={{ minWidth: "140px" }}
              >
                Quay lại
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ShopDetail;
