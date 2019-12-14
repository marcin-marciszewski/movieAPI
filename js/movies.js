const getMovies = (_ => {
    // data
    let searchQuery = sessionStorage.getItem("search");
    const API_KEY = "f1f684a1c6b612f50bc00ebf918eadba";
    const MOVIE_ENDPOINT = "https://api.themoviedb.org";
    const MOVIE_URL = `${MOVIE_ENDPOINT}/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`;
    let pages;
    let urls = [];
    const movies = [];
    let movieQuery = sessionStorage.getItem("movie");

    const movieSelected = [];

    // catch the DOM
    document.addEventListener("click", function (event) {
        if (event.target.className === "movie__item") {
            sessionStorage.setItem("movie", event.target.children[1].innerHTML);
            window.location.href = "movie.html";
        } else if (event.target.className === "movie__image") {
            sessionStorage.setItem("movie", event.target.parentElement.children[1].innerHTML);
            window.location.href = "movie.html";
        }
    });
    const moviesEl = document.querySelector(".movies");
    const movieEl = document.querySelector(".movie");



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
                for (let i = 0; i < results.length; i++) {
                    results[i].results.forEach((movie) => {
                        let obj = {
                            title: movie.title,
                            image: `${IMAGE_URL}${movie.poster_path}`,
                            overview: movie.overview,
                            score: movie.vote_average
                        };
                        movies.push(obj);
                    });

                }

                movies.forEach(movie => {
                    if (movie.image === "https://image.tmdb.org/t/p/w500null") {
                        movie.image = "img/noimage.png";
                    }

                });

                if (moviesEl && movies.length > 0) {
                    movies.forEach(movie => {
                        markup += `
                            <div class="movie__item">
                                <img src="${movie.image}" alt="" class="movie__image">
                                <p class="movie__title">${movie.title}</p>
                            </div>
                                `;
                        moviesEl.innerHTML = markup;
                    });


                } else if (moviesEl && movies.length == 0) {
                    markup += `
                        <h1>No movies</h1>
                    `
                    moviesEl.innerHTML = markup;
                }



                for (let i = 0; i < movies.length; i++) {

                    let decoded = movieQuery.replace(/&amp;/g, '&');
                    if (movies[i].title === decoded) {
                        movieSelected.push(movies[i]);
                    }
                }

                if (movieEl) {
                    let markupMovie = ` 
                    <div class="movie__details">
                        <img src="${movieSelected[0].image}" alt="poster">
                        <div class="movie__info">
                            <h2 class="title">${movieSelected[0].title}</h2>
                            <p class="overview">${movieSelected[0].overview}</p>
                            <p class="score">${movieSelected[0].score}</p>
                        </div> 
                    </div>
                    `;

                    movieEl.innerHTML = markupMovie;;
                }
            })
        })

})();



