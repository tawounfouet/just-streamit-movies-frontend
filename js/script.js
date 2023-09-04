
console.log("OC Movies API\n")
let lienApi_pagesize = "http://localhost:8000/api/v1/titles/?page_size=7&sort_by=-imdb_score"
let lienApi_bestMovie = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score"
let lienApi_bestAction_genre = "http://localhost:8000/api/v1/titles/?page_size=7&genre=crime&sort_by=-imdb_score"
let lienApi_bestDrama_genre = "http://localhost:8000/api/v1/titles/?page_size=7&genre=drama&sort_by=-imdb_score"
let lienApi_bestComedy_genre = "http://localhost:8000/api/v1/titles/?page_size=7&genre=comedy&sort_by=-imdb_score"
let lienApi_bestDocumentary_genre = "http://localhost:8000/api/v1/titles/?page_size=7&genre=documentary&sort_by=-imdb_score"



const fetchMovies = async (lienApi) => {
    await fetch(lienApi)
        .then((res) => res.json())
        .then((data) => (movieData = data.results))
}



// Créer une fonction fetchBestMovie avec lien de l'url en paramètre de la fonction
const fetchBestMovie = async () => {
    await fetch(lienApi_bestMovie)
        .then((res) => res.json())
        .then((data) => (bestmovieData = data.results[0]))
    
    // console.log(bestmovieData)
    setupMovieInfo(bestmovieData)
}
fetchBestMovie()



// Creer une fonction qui fetchSingleMovie qui récupère les infos d'un film donnée en f
// fonction de son ID (id en paramètre de la fonction)

const fetchSingleMovie = async (id) => {
    await fetch("http://localhost:8000/api/v1/titles/" + id)
        .then((res) => res.json())
        .then((data) => (singleMovieData = data))

    console.log(singleMovieData)
    setupMovieInfo(singleMovieData)
}



const setupMovieInfo = (bestmovieData) => {
    // Sélection de la classe "conteneur"
    const conteneur = document.querySelector('.slider');

    // Sélection des éléments à l'intérieur de la classe "conteneur"
    const bestIMG = conteneur.querySelector('img');
    const movieName = conteneur.querySelector('.movie-title');
    const des = conteneur.querySelector('.movie-desc');
    const imdb_score = conteneur.querySelector('.imdb_score');
    const genres = conteneur.querySelector('.genres');
    const writers = conteneur.querySelector('.writers');

  
    bestIMG.src = bestmovieData.image_url;
    movieName.innerHTML = bestmovieData.title;
    

    imdb_score.innerHTML = "Score : " + bestmovieData.imdb_score;
    genres.innerHTML = "Genres : " + bestmovieData.genres;
    writers.innerHTML = "Writers : " + bestmovieData.writers;

}


// Ajusté la fonction movie display avec la class du querySelector et le lien de l'api en paramètre de la fonction
const moviesDisplay = async (lienApi, classSelector) => {
    await fetchMovies(lienApi)
    document.querySelector(classSelector).innerHTML = movieData
        .map((movie) =>
            `
                <div class="card">
                    <img 
                        src=${movie.image_url} 
                        alt="photo de ${movie.title}" 
                        data-id=${movie.id}>
                    
                        <div class="card-body">
                        <h2 class="name"> 
                            
                        ${movie.title} </h2>
                    

                        <button class="watchlistbtn" onclick="addToWatchlist(${movie.id})"></button>
        
                    </div>
                </div>
            `)
        .join("")
}


// Faire une liste d'object de type dict (url : class/id)
moviesDisplay(lienApi_pagesize, '.recommandations')
moviesDisplay(lienApi_bestAction_genre, '.movies')
moviesDisplay(lienApi_bestComedy_genre, '.series')
moviesDisplay(lienApi_bestDrama_genre, '.sport')



// card slider
let cardContainers = [...document.querySelectorAll(".card-container")];
let preBtns = [...document.querySelectorAll(".pre-btn")];
let nextBtns = [...document.querySelectorAll(".nxt-btn")];

cardContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nextBtns[i].addEventListener("click", () => {
        item.scrollLeft += containerWidth - 200;
    })

    preBtns[i].addEventListener("click", () => {
        item.scrollLeft -= containerWidth + 200;
    })
})








