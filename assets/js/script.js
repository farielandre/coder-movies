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
          <span>${parseFloat(vote_average.toFixed(1))}</span>
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
            <span>${parseFloat(vote_average.toFixed(1))}</span>
          </div>
          `
        movieList.appendChild(movielistCard);
      })
    }
  }
}

// API TMDB - details.html

// function detailsMovies() {
//   fetch(apiURL)
//     .then(response => response.json())
//     .then(data => {
//       if (data.results) {
//         const idsDosFilmes = data.results.map(movie => movie.id);
//         // console.log(idsDosFilmes);
//         const ID1 = idsDosFilmes[0];
//         const convertURL = `https://api.themoviedb.org/3/movie/${ID1}?` + apiKEY;
//         fetch(`${convertURL}`)
//           .then(response => response.json())
//           .then(data => console.log(data));
//         const getDetails = document.querySelector(".details__container");
//         getDetails.innerHTML =
//           `<section class="details__column-left">
//              <img class="movie__cover" src=${backdrop_path} alt="movie cover" />
//             </section>`
//       }
//     })

// }

// Mudança de cor do site desktop

function toggleColorDesktop() {
  const icon = document.getElementById("lightmode__icon");
  if (icon.classList.contains("fa-moon")) {
    icon.classList.replace("fa-moon", "fa-sun");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
  }
  let theme = "";
  if (document.documentElement.classList.contains("lightmode")) {
    document.documentElement.classList.remove("lightmode");
    theme = "dark";
  } else {
    document.documentElement.classList.add("lightmode");
    theme = "light";
  }
  sessionStorage.setItem("colorTheme", theme);
}

let getThemeDesktop = sessionStorage.getItem("colorTheme");
if (getThemeDesktop === "light") {
  document.documentElement.classList = "lightmode";
}

// Mudança de cor do site mobile

function toggleColorMobile() {
  const icon = document.getElementById("lightmode__icon-mobile");
  if (icon.classList.contains("fa-moon")) {
    icon.classList.replace("fa-moon", "fa-sun");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
  }
  let theme = "";
  if (document.documentElement.classList.contains("lightmode")) {
    document.documentElement.classList.remove("lightmode");
    theme = "dark";
  } else {
    document.documentElement.classList.add("lightmode");
    theme = "light";
  }
  sessionStorage.setItem("colorTheme", theme);
}

let getThemeMobile = sessionStorage.getItem("colorTheme");
if (getThemeMobile === "light") {
  document.documentElement.classList = "lightmode";
}

// Menu mobile

function mobileMenu() {
  const icon = document.getElementById("burger__icon");
  icon.classList.toggle("fa-times");
  let menu = document.getElementById("mobile__items");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}