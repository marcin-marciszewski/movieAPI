let searchQuery = sessionStorage.getItem("search");
const API_KEY = "f1f684a1c6b612f50bc00ebf918eadba";
const MOVIE_ENDPOINT = "https://api.themoviedb.org";
const MOVIE_URL = `${MOVIE_ENDPOINT}/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`;
let pages;
let urls = [];
const movies = [];





document.addEventListener("click", function (event) {
    if (event.target.className === "movie__item") {
        sessionStorage.setItem("movie", event.target.children[1].innerHTML);
        window.location.href = "movie.html";
    } else if (event.target.className === "movie__image") {
        sessionStorage.setItem("movie", event.target.parentElement.children[1].innerHTML);
        window.location.href = "movie.html";
    }
});

const getMovies = _ => {
    const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
    fetch(MOVIE_URL)
        .then(res => res.json())
        .then(data => {
            let total_pages = data.total_pages;
            pages = total_pages;

        }).then(_ => {
            for (let i = 1; i < pages + 1; i++) {
                urls.push(`${MOVIE_ENDPOINT}/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${i}`)
            }

        }).then(_ => {
            let markup = "";
            let promises = urls.map((url) => fetch(url).then(res => res.json()));
            Promise.all(promises).then(results => {
                console.log(results.length)
                for (let i = 0; i < results.length; i++) {
                    results[i].results.forEach((movie) => {
                        let obj = {
                            title: movie.title,
                            image: `${IMAGE_URL}${movie.poster_path}`,
                            popularity: movie.popularity,
                            overview: movie.overview,
                            score: movie.vote_average
                        };
                        movies.push(obj);
                    });

                }

                movies.forEach(movie => {
                    if (movie.image === "https://image.tmdb.org/t/p/w500null") {
                        movie.image = "img/noimage.jpg";
                    }
                });

                console.log(movies)

                movies.forEach(movie => {
                    markup += `
                        <div class="movie__item">
                            <img src="${movie.image}" alt="" class="movie__image">
                            <p class="movie__title">${movie.title}</p>
                        </div>
                            `;
                });

                document.querySelector(".movies").innerHTML = markup;

            })
        })
}


getMovies()


