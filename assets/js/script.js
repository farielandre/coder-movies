// API TMDB - Referencia: https://developer.themoviedb.org/docs/

// API TMDB - Mostrar lista de filmes na index.html 

const apiKEY = 'api_key=0d56374213cbb8fee874d62f13209cc4';
const baseURL = 'https://api.themoviedb.org/3';
const apiURL = baseURL + '/discover/movie?sort_by=popularity.desc&' + apiKEY;
const imgURL = 'https://image.tmdb.org/t/p/w500';
const searchURL = baseURL + '/search/movie?' + apiKEY;

fetch(apiURL)
  .then((response) => response.json())
  .then((data) => showMovies(data.results));

function showMovies(data) {
  // console.log(data);
  data.forEach(movie => {
    const { title, poster_path, vote_average } = movie;
    const movieList = document.querySelector("div.movielist__container");
    let movielistCard = document.createElement("div");
    movielistCard.classList.add("movielist__card");
    movielistCard.innerHTML = `
        <a href="details.html">
          <img src="${imgURL + poster_path}" alt="${title} movie poster"/>
        </a>
        <div class="movielist__card-info">
          <i class="fa-solid fa-heart fa-xs"></i>
          <span>${vote_average}</span>
        </div>
        `
    movieList.appendChild(movielistCard);
  })
}

// API TMDB - Busca de filmes

const searchForm = document.getElementById("form");
const searchTitle = document.getElementById("form__input");

searchForm.onsubmit = (e) => {
  e.preventDefault();
  const inputText = searchTitle.value;

  if (inputText == "") {
    alert("Type the movie's name"); 
    return;
  }

  if (searchTitle) {
    fetch(searchURL + "&query=" + inputText) // Referencia: https://developer.themoviedb.org/docs/search-and-query-for-details
      .then((response) => response.json())
      .then((data) => showMovies(data.results));

    function showMovies(data) {
      const movieList = document.querySelector("div.movielist__container");
      movieList.innerHTML = "";

      const h3Title = document.querySelector("h3");
      h3Title.innerText = `Your search result`;

      data.forEach(movie => {
        const { title, poster_path, vote_average } = movie;
        let movielistCard = document.createElement("div");
        movielistCard.classList.add("movielist__card");
        movielistCard.innerHTML = `
          <a href="details.html">
            <img src="${imgURL + poster_path}" alt="${title} movie poster"/>
          </a>
          <div class="movielist__card-info">
            <i class="fa-solid fa-heart fa-xs"></i>
            <span>${vote_average}</span>
          </div>
          `
        movieList.appendChild(movielistCard);
      })
    }
  }
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