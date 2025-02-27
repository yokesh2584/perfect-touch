import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} The Perfect Touch. All rights reserved.</p>
            <p>
              <a href="/privacy-policy" className="text-white">Privacy Policy</a> | 
              <a href="/terms-of-service" className="text-white"> Terms of Service</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;