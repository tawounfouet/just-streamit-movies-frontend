


console.log("OC Movies API\n")
let lienApi_pagesize = "http://localhost:8000/api/v1/titles/?page_size=7&sort_by=-imdb_score"

// Lien film le mieux noté toute catégorie confondu
let lienApi_bestMovie = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score"



// Lien meilluers films par genre
let lienApi_bestAction_genre = "http://localhost:8000/api/v1/titles/?page_size=7&genre=crime&sort_by=-imdb_score"

// Best drama genre
let lienApi_bestDrama_genre = "http://localhost:8000/api/v1/titles/?page_size=7&genre=drama&sort_by=-imdb_score"

//Best commedy genre
let lienApi_bestComedy_genre = "http://localhost:8000/api/v1/titles/?page_size=7&genre=comedy&sort_by=-imdb_score"



// Best documentary genre
let lienApi_bestDocumentary_genre = "http://localhost:8000/api/v1/titles/?page_size=7&genre=documentary&sort_by=-imdb_score"


// Créer une fonction fetchMovies avec lien de l'url en paramètre de la fonction 
// let movieData = [] 

const fetchMovies = async (lienApi) => {
    await fetch(lienApi)
        .then((res) => res.json())
        .then((data) => (movieData = data.results))

    // console.log(movieData)
    // affiché le premier film

    // console.log(movieData[0]) 
    
}
// fetchMovies(lienApi_pagesize)





// Créer une fonction fetchBestMovie avec lien de l'url en paramètre de la fonction
const fetchBestMovie = async () => {
    await fetch(lienApi_bestMovie)
        .then((res) => res.json())
        .then((data) => (bestmovieData = data.results[0]))
    
    console.log(bestmovieData)
    setupMovieInfo(bestmovieData)
}
fetchBestMovie()


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

    console.log(bestIMG);
    console.log(movieName);
    console.log(des);
  
    bestIMG.src = bestmovieData.image_url;
    movieName.innerHTML = bestmovieData.title;
    

    // if bestmovieData.description undefined then display "Lorem ipsum dolor sit amet consectetur."
    if (bestmovieData.description === undefined) {
        des.innerHTML = "Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur. "
    } else {
        des.innerHTML = bestmovieData.description;
    }
    imdb_score.innerHTML = "Score : " + bestmovieData.imdb_score;
    genres.innerHTML = "Genres : " + bestmovieData.genres;
    writers.innerHTML = "Writers : " + bestmovieData.writers;

}







// Utiliser plutot l'identifiant pour la sélection des catégories et la passer en paramètre 
// de la fonction movieDisplay

// Ajusté la fonction movie display avec la class du querySelector et le lien de l'api en paramètre de la fonction
const moviesDisplay = async (lienApi, classSelector) => {
    await fetchMovies(lienApi)
    document.querySelector(classSelector).innerHTML = movieData
        .map((movie) =>
            `
                <div class="card">
                    <img src=${movie.image_url} alt="photo de ${movie.title}">
                    <div class="card-body">
                        <h2 class="name"> ${movie.title} </h2>
                        <h6 class="des">Lorem ipsum dolor sit amet consectetur.</h6>
                        <button class="watchlist-btn">add to watchlist</button>
                        <p> Rating : ${movie.imdb_score} </p>
                        <em>Date de Sortie : ${movie.year} </em>
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

// Créer une fonction qui affiche les films les mieux notés

// console.log(movieData)






