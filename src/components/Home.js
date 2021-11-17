import React, { useState, useEffect } from 'react';
import Cat from './Cat';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const apiKey = '92b2cb9e-1aff-461b-87ec-e122b77bdb41';
const breedsUrl = 'https://api.thecatapi.com/v1/breeds';

const Home = () => {
  const localSelectedBreed = localStorage.getItem('selectedBreed')
  const [cats, setCats] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(localSelectedBreed);
  const [dataSize, setDataSize] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  const currentCats = cats.slice(0, dataSize);

  useEffect(() => {
    fetch(breedsUrl)
      .then((res) =>
        res.json()
      )
      .then((data) => {
        setBreeds(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getCat();
  }, [selectedBreed]);

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('x-api-key', apiKey);

  const getCat = () => {
    setIsLoading(true);
    fetch(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreed}&limit=25`,
      { headers: {'x-api-key': apiKey}}
    )
      .then((res) =>
        res.json()
      )
      .then((cats) => {
        setCats(cats);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }

  const handleBreedSelect = e => {
    setSelectedBreed(e.target.value);
    setDataSize(4);
    localStorage.setItem('selectedBreed', e.target.value);
  }

  const loadMore = () => {
    setDataSize(dataSize + 4);
  }

  return (
    <div style={{textAlign: 'left', width: '80%', margin: '0 auto'}}>
      <h1>Cat Browser</h1>
      <p>Breed</p>
      <select
        style={{marginBottom: '100px' }}
        name="Breeds"
        onChange={e => handleBreedSelect(e)}
        value={selectedBreed}
      >
        <option key="asdf234" value="=">Select Breed</option>
        {breeds && breeds.map((breed, key) => (
          <option key={breed.key} value={breed.id}>{breed.name}</option>
        ))}
      </select>
      <Container fluid>
        <Row>
        {currentCats && currentCats.length
            ? currentCats.map(item => (
              <Col sm={3}>
                <Cat key={item.key} data={item} />
              </Col>
          ))
          : <p>No cats available</p>
          }
        </Row>
      </Container>
      {currentCats.length < cats.length &&
        <Button style={{ marginTop: '100px' }} onClick={loadMore}>{isLoading ? 'Loading...' : 'Load More'}</Button>
      }
    </div>
  );
}

export default Home;