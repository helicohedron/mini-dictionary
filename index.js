import express from 'express';
import process from 'node:process';
import data from './data.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('port', PORT);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Mini-Dictionary of CyberSecurity Terms'
  });
});

// GET /words
app.get('/words', (req, res) => {
  res.status(200).json(
    data.map(item => item.word)
  );
});

// GET /words/:word
app.get('/words/:word', (req, res) => {
  const { word } = req.params;
  const found = data.find(item => item.word === word.toLowerCase());
  if (!found) {
    res.status(404).send('Error 404: Not found.');
  }

  res.status(200).json({
    word: found.word,
    type: found.type,
    definition: found.definition
  });
});

// GET /filter?type=verb
app.get('/filter', (req, res) => {
  const { type } = req.query;
  const filteredList = data.filter(item => 
    item.type === type
  );
  
  if (filteredList.length === 0) {
    res.status(400).send('Error 400. Bad request.');
  }

  res.status(200).json(
    filteredList
  );
});

// GET /search?q=ap
app.get('/search', (req, res) => {
  const { q } = req.query;
  const searchList = data.filter(item => item.word.includes(q));

  res.status(200).json(searchList);
});

// GET /random
app.get('/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * (data.length -1));
  const randomWord = data[randomIndex];

  res.status(200).json(randomWord);
});

// GET /starts-with/:letter
app.get('/starts-with/:letter', (req, res) => {
  const { letter } = req.params;
  const startsWith = data
    .filter(item => item.word.startsWith(letter))
    .map(item => item.word);

  res.send(startsWith);
});

// GET /sort?by=length /sort?by=alphabet
app.get('/sort', (req, res) => {
  const { by } = req.query;
  let sortedList = [];

  switch (by) {
    case 'alphabet':
      sortedList = data
        .map(item => item.word.toLowerCase())
        .sort();
        break;
    case 'length':
      sortedList = data
        .map(item => item.word)
        .sort((a,b) => 
          a.length - b.length
        );
        break;
  }

  res.send(sortedList);
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
