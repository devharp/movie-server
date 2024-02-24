import express from 'express';
import 'dotenv/config'
import { resolve } from 'path'
import path from 'path'
import { fileURLToPath } from 'url'
import fetch from 'node-fetch';
import cors from 'cors';
import { Config } from './config'

const nodePath = resolve(process.argv[1])
const modulePath = resolve(fileURLToPath(import.meta.url))
const isCLI = nodePath === modulePath;
const Authorization = Config.auth

const app = express();
app.use(express.json())
app.use(cors())

app.use('/', express.static(path.join(modulePath, '..', '..', 'public')));


app.get('/movies', async (req, res) => {
  return res.send(await getMovies());
})

app.post('/auth', (req,res) => {
  const { username, password } = req.body;
  console.log({ username, password })
  if (username === 'admin' && password === 'd33g!etal') {
    return res.send({ message: 'SUCCESS' })
  }
  return res.send({ message: 'FAILED' })
})


async function getMovies() {
  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const options = {method: 'GET', headers: {accept: 'application/json', Authorization}};
  const data = await fetch(url, options);
  const movies = await data.json();
  if (movies?.results?.length) {
    const results = movies.results as unknown as Array<Record<string,any>>
    return results?.map((e) => ({ title: e.title || '[No Title]', img: 'https://image.tmdb.org/t/p/original' + e.poster_path }))
  }
  return [];
}

export default function main(port: number = 3000) {

  app.listen(port, () => console.log(`App running on port: ${port}`))

}

main()
