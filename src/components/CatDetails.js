import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React from "react";
import { useLocation, useNavigate } from "react-router";
  
const CatDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);
  const { breed, description, origin, temperament, url } = location.state;

  const handleClick = () => {
    navigate('/');
  }

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Button variant="primary" onClick={handleClick}>Back</Button>
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Title>{breed}</Card.Title>
          <Card.Text>
            Origin: {origin}
            {temperament}
            {description}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default CatDetails;