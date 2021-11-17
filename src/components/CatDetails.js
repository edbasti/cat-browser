import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
  
const CatDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);
  const { breed, description, origin, temperament, url } = location.state;

  const handleClick = () => {
    navigate('/');
  }

  return (
    <Container>
      <Row>
        <Col sm={6}>
          <Card style={{ width: '68rem', textAlign: 'left' }} sm={9}>
            <Button variant="primary" onClick={handleClick} style={{ width: '8rem', margin: '20px'}}>Back</Button>
            <Card.Img variant="top" src={url} />
            <Card.Body>
              <Card.Title>{breed}</Card.Title>
              <Card.Text>
                <div>
                  <span style={{ fontWeight: 'bolder' }}>Origin: {origin}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold' }}></span>{temperament}
                </div>
                {description}
              </Card.Text>
            </Card.Body>
          </Card>
          </Col>
        </Row>
    </Container>
  );
}

export default CatDetails;