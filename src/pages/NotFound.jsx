import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="justify-center py-5">
      <Row className="justify-content-center">
        <Col md={6} className="d-flex justify-content-center row">
          <Image src='/404.jpg' className='mb-3'/>
          <Button className='w-auto' variant="primary" onClick={() => navigate('/')}>
            Back to Dashboard
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;