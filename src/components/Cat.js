import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React from "react";
import { useNavigate } from "react-router";

const Cat = ({ data }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/cat/${data.breeds[0].name}`,
      {
        state: {
          url: data.url,
          breed: data.breeds[0].name,
          origin: data.breeds[0].origin,
          temperament: data.breeds[0].temperament,
          description: data.breeds[0].description
      }
    })
  }

  return (
    <Card xs={4}>
      <Card.Img variant="top" src={data.url}/>
      <Card.Body style={{display: 'flex', flexDirection: 'column'}}>
        <Button variant="primary" onClick={handleClick}>View Details</Button>
      </Card.Body>
    </Card>
  );
}

export default Cat;