let movieQuery = sessionStorage.getItem("movie");
let searchQuery = sessionStorage.getItem("search");
const API_KEY = "f1f684a1c6b612f50bc00ebf918eadba";
const movieSelected = [];

const getMovies = _ => {
  const MOVIE_ENDPOINT = "https://api.themoviedb.org";
  const MOVIE_URL = `${MOVIE_ENDPOINT}/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`;
  const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

  return fetch(MOVIE_URL)
    .then(res => res.json())
    .then(data => {
      const movies = [];

      data.results.forEach((movie, index) => {
        let obj = {
          title: movie.title,
          image: `${IMAGE_URL}${movie.poster_path}`,
          popularity: movie.popularity,
          overview: movie.overview,
          score: movie.vote_average
        };
        movies.push(obj);
      });
      return movies;
    });
};

const selectMovie = movies => {
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].title === movieQuery) {
      movieSelected.push(movies[i]);
    }
  }
};

const aaa = _ => {};

const renderMovie = _ => {
  let markup = ` <div class="movie__item">
                    <img src="${movieSelected[0].image}" alt="" class="movie__image">
                    <p class="movie__title">${movieSelected[0].title}</p>
                    <p class="movie__title">${movieSelected[0].overview}</p>
                </div>
             `;

  document.querySelector(".movie").innerHTML = markup;
  console.log(movieSelected);
};

getMovies()
  .then(data => {
    selectMovie(data);
  })
  .then(_ => {
    renderMovie();
  });
