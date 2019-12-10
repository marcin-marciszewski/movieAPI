let searchQuery = sessionStorage.getItem("search");
const API_KEY = "f1f684a1c6b612f50bc00ebf918eadba";

document.addEventListener("click", function (event) {
    if (event.target.className === "movie__title") {
        sessionStorage.setItem("movie", event.target.innerHTML);
        window.location.href = "movie.html";
    }
});

const getMovies = _ => {
    const MOVIE_ENDPOINT = "https://api.themoviedb.org";
    const MOVIE_URL = `${MOVIE_ENDPOINT}/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`;
    const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

    return fetch(MOVIE_URL)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
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

            movies.forEach(movie => {
                const movieSelected = [];

                if (movie.image === "https://image.tmdb.org/t/p/w500/null") {
                    movie.image = "img/noimage.jpg";
                }


            });

            return movies;
        });
};

// const selectMovie = movies => {
//     const movieSelected = [];
//     console.log(movieSelected);
//     for (let i = 0; i < movies.length; i++) {

//         if (movies[i].title === movieQuery) {
//             movieSelected.push(movies[i]);
//         }
//     }
//     return movieSelected;
// };

const render = movies => {
    let markup = "";
    movies.forEach(movie => {
        markup += `
        <div class="movie__item">
            <img src="${movie.image}" alt="" class="movie__image">
            <p class="movie__title">${movie.title}</p>
        </div>
        `;
    });

    document.querySelector(".movies").innerHTML = markup;
};




getMovies().then(data => {
    render(data);
});