import { Col, ListGroup, Row } from "react-bootstrap";

const PaymentItem = ({ data }) => {
  return (
    <ListGroup.Item>
      <Row>
        <Col>{data.courseName}</Col>
        <Col>{data.semester}</Col>
        <Col>{data.amount}</Col>
        <Col>{data.date}</Col>
      </Row>
    </ListGroup.Item>
  );
};

export default PaymentItem;
