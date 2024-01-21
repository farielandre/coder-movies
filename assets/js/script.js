// API - Movie list home
// const apiKey = "8e98fee1";

// fetch(`http://www.omdbapi.com/?apikey=${apiKey}`)
//   .then((response) => response.json())
//   .then((json) => console.log(json));


// API - Movie search

const searchForm = document.getElementById("header__form");
const apiKey = "8e98fee1";

searchForm.onsubmit = (ev) => {
  ev.preventDefault();
  const searchMovies = ev.target.searchMovies.value;

  if (searchMovies == "") {
    alert("Type the movie's name");
    return;
  }

  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchMovies}`)
    .then((response) => response.json())
    .then((json) => loadMovies(json));
}

// API - Search result 

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
    movielistCard.innerHTML = `<a href="details.html">
    <img src="${element.Poster}" /></a>
    <div class="movielist__card-info">
    <i class="fa-solid fa-star fa-2xs"></i>
    <span>9.1</span></div>`

    movieList.appendChild(movielistCard);
  });

}

// Site color switch

function toggleColor() {
  const html = document.documentElement;
  if (html.classList.contains("lightmode")) {
    html.classList.remove("lightmode");
  } else {
    html.classList.add("lightmode");
  }
}

// Mobile menu

function mobileMenu() {
  let menu = document.getElementById("mobile__items");
  if (menu.style.display === "none") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
}