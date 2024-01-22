// API TMDB - Lista de filmes na index.html

const TMDBKey = 'api_key=0d56374213cbb8fee874d62f13209cc4';
const baseURL = 'https://api.themoviedb.org/3';
const apiURL = baseURL + '/discover/movie?sort_by=popularity.desc&' + TMDBKey;
const imgURL = 'https://image.tmdb.org/t/p/w500';

fetch(apiURL)
    .then((response) => response.json())
    .then((data) => showMovies(data.results));

function showMovies(data) {
  data.forEach(movie => {
    const {title, poster_path, vote_average} = movie;
    const movieList = document.querySelector("div.movielist__container");
    let movielistCard = document.createElement("div");
    movielistCard.classList.add("movielist__card");
    movielistCard.innerHTML = `
        <a href="details.html">
          <img src="${imgURL+poster_path}" alt="${title} movie poster"/>
        </a>
        <div class="movielist__card-info">
          <i class="fa-solid fa-heart fa-xs"></i>
          <span>${vote_average}</span>
        </div>
        `
    movieList.appendChild(movielistCard);
  })
}

// API OMDB - Busca de filmes

const searchForm = document.getElementById("header__form");
const OMDBKey = "8e98fee1";

searchForm.onsubmit = (ev) => {
  ev.preventDefault();
  const searchMovies = ev.target.searchMovies.value;

  if (searchMovies == "") {
    alert("Type the movie's name");
    return;
  }

  fetch(`https://www.omdbapi.com/?apikey=${OMDBKey}&s=${searchMovies}`)
    .then((response) => response.json())
    .then((json) => loadMovies(json));
}

// API OMDB - Resultado da busca de filmes

const loadMovies = (json) => {
  const movieList = document.querySelector("div.movielist__container");
  movieList.innerHTML = "";

  if (json.Response == "False") {
    alert("Movie not found");
    return;
  }

  json.Search.forEach(element => {
    let movielistCard = document.createElement("div");
    movielistCard.classList.add("movielist__card");
    movielistCard.innerHTML = `
    <a href="details.html">
      <img src="${element.Poster}" alt="${element.Title} movie poster"/>
    </a>
    <div class="movielist__card-info">
      <i class="fa-solid fa-heart fa-xs"></i>
      <span>9.1</span>
    </div>
    `
    movieList.appendChild(movielistCard);
  });

}

// Mudança de cor do site

function toggleColor() {
  const html = document.documentElement;
  if (html.classList.contains("lightmode")) {
    html.classList.remove("lightmode");
  } else {
    html.classList.add("lightmode");
  }
}

// Menu mobile

function mobileMenu() {
  let menu = document.getElementById("mobile__items");
  if (menu.style.display === "none") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
}