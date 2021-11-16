import React, { useState, useEffect } from 'react';
import Cat from './Cat';

const apiKey = '92b2cb9e-1aff-461b-87ec-e122b77bdb41';
const breedsUrl = 'https://api.thecatapi.com/v1/breeds';

const Home = () => {
  const localSelectedBreed = localStorage.getItem('selectedBreed')
  const [cats, setCats] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(localSelectedBreed);

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
  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('x-api-key', apiKey);

  const getCat = () => {
    fetch(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreed}&limit=25`,
      { headers: {'x-api-key': apiKey}}
    )
      .then((res) =>
        res.json()
      )
      .then((cats) => {
        console.log(cats);
        setCats(cats);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleBreedSelect = e => {
    setSelectedBreed(e.target.value);
    localStorage.setItem('selectedBreed', e.target.value);
  }

  return (
    <div>
      <h1>Welcome to my app</h1>
      <select
        name="Breeds"
        onChange={e => handleBreedSelect(e)}
        value={selectedBreed}
      >
        {breeds && breeds.map((breed, key) => (
          <option key={breed.key} value={breed.id}>{breed.name}</option>
        ))}
      </select>
      <button onClick={getCat}>Click</button>
      {cats && cats.map( item => (
        <Cat key={item.key} data={item}/>
      ))}
    </div>
  );
}

export default Home;