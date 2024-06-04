const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Підключення до MongoDB
mongoose.connect('mongodb://localhost:27017/cinema', { useNewUrlParser: true, useUnifiedTopology: true });

const movieSchema = new mongoose.Schema({
  id: Number,
  title: String,
  genre: String,
  country: String,
  year: Number,
  rating: Number,
  imdbLink: String,
  imageSrc: String,
  imageAlt: String,
  className: String,
  actors: [String],
  description: String,
  age: String,
  duration: String,
  language: String,
  session: [String]
});

const Movie = mongoose.model('Movie', movieSchema);

const sessionSchema = new mongoose.Schema({
  id: Number,
  movie_id: Number,
  time: String,
  seats: [Boolean]
});

const Session = mongoose.model('Session', sessionSchema);

app.use(cors());
app.use(bodyParser.json());

// Маршрут для отримання всіх фільмів
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Маршрут для отримання всіх сесій
app.get('/api/sessions', async (req, res) => {
  try {
    const { movie_id } = req.query;
    console.log("Received BACK-END movie_id:", movie_id); // Логування movie_id
    let query = {};
    if (movie_id) {
      query.movie_id = parseInt(movie_id);
    }
    const sessions = await Session.find(query);
    console.log("Filtered BACK-END sessions:", sessions); // Логування отриманих сеансів
    res.json(sessions);
  } catch (err) {
    res.status(500).send(err);
  }
});




// Маршрут для оновлення сесії
app.put('/api/sessions/:id', async (req, res) => {
  try {
    const sessionId = req.params.id;
    const updatedSeats = req.body.seats;

    const session = await Session.findOneAndUpdate({ id: sessionId }, { seats: updatedSeats }, { new: true });
    if (!session) {
      return res.status(404).send('Session not found');
    }
    res.json(session);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
