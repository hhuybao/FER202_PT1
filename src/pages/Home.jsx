import { Card, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import NavigationHeader from "../components/NavigationHeader";
import FilterBar from "../components/FilterBar";
import { usePayment } from "../contexts/PaymentContext";
import { useEffect, useRef } from "react";
import PaymentItem from "../components/PaymentItem";

const Home = () => {
  const { getListPayment, data, loading } = usePayment();
  const paymentDataRef = useRef(undefined);

  useEffect(() => {
    getListPayment();
  }, []);

  useEffect(() => {
    if (!paymentDataRef.current && data) {
      const semesters = [...new Set(data.map((p) => p.semester))];
      const courses = [...new Set(data.map((p) => p.courseName))];
      paymentDataRef.current = {
        semesters: semesters,
        courses: courses,
      };
    }
  }, [data, paymentDataRef.current]);

  return (
    <>
      <NavigationHeader />
      <Container>
        <FilterBar
          semesters={paymentDataRef.current?.semesters}
          courses={paymentDataRef.current?.courses}
        />

        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Dashboard Overview</Card.Header>
          <Card.Body>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Course</strong>
                  </Col>
                  <Col>
                    <strong>Semester</strong>
                  </Col>
                  <Col>
                    <strong>Price</strong>
                  </Col>
                  <Col>
                    <strong>Date</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {data && data.length > 0 ? (
                data.map((e) => <PaymentItem data={e} key={e.id} />)
              ) : (
                <ListGroup.Item className="text-center">No data</ListGroup.Item>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
        {loading && (
          <Spinner
            size="sm"
            animation="border"
            role="status"
            className="me-2"
          />
        )}
      </Container>
    </>
  );
};

export default Home;
