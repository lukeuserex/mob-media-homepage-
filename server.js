const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

// Read the artist data from the JSON file
const artistsData = fs.readFileSync('artists.json', 'utf8');
const artists = JSON.parse(artistsData);

app.get('/api/artists', (req, res) => {
  res.json(artists);
});

app.get('/api/artist/:id', (req, res) => {
  const artistId = parseInt(req.params.id);
  const artist = artists.find(a => a.id === artistId);

  if (artist) {
    res.json(artist);
  } else {
    res.status(404).json({ error: 'Artist not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
