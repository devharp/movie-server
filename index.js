const path = require('path');
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.API_KEY;
const apiUrl = 'https://api.themoviedb.org/3';



const HTTP_PORT = 3000;

const genres = [
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" },
    { "id": 16, "name": "Animation" },
    { "id": 35, "name": "Comedy" },
    { "id": 80, "name": "Crime" },
    { "id": 99, "name": "Documentary" },
    { "id": 18, "name": "Drama" },
    { "id": 10751, "name": "Family" },
    { "id": 14, "name": "Fantasy" },
    { "id": 36, "name": "History" },
    { "id": 27, "name": "Horror" },
    { "id": 10402, "name": "Music" },
    { "id": 9648, "name": "Mystery" },
    { "id": 10749, "name": "Romance" },
    { "id": 878, "name": "Science Fiction" },
    { "id": 10770, "name": "TV Movie" },
    { "id": 53, "name": "Thriller" },
    { "id": 10752, "name": "War" },
    { "id": 37, "name": "Western" }]

async function getMovieById(movieId) {
    const apiMovieById = `${apiUrl}/movie/${movieId}?api_key=${apiKey}`;
    return await axios.get(apiMovieById)
}

async function getTrendingMovies() {
    const mediaType = 'all';
    const timeWindow = 'day';
    const apiMovies = `${apiUrl}/trending/${mediaType}/${timeWindow}?api_key=${apiKey}`;
    const { data: { results: allMovies } } = await axios.get(apiMovies);
    return allMovies.map(e => {

        e.title = e.original_name || e.original_title;
        delete e.original_name; delete e.original_title; delete e.name;

        e.date = e.release_date || e.first_air_date;
        delete e.release_date; delete e.first_air_date;

        e.backdrop_path = 'https://image.tmdb.org/t/p/original' + e.backdrop_path;
        e.poster_path = 'https://image.tmdb.org/t/p/original' + e.poster_path;

        e.genres = e.genre_ids.map(e => genres.find(({ id }) => id === e)).filter(e => e !== undefined).map(e => e.name).join(',')
        delete e.genre_ids;

        return e;
    });
}

function main() {
    const app = express();
    app.use(express.json());

    app.use(express.static(path.join(__dirname, 'public')));
    app.get('/movies', async (req, res) => res.send(await getTrendingMovies()));

    app.listen(HTTP_PORT, () => console.log('Running on port: ', HTTP_PORT))
}

main();