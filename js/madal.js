const watchlistBtn = document.querySelector(".watchlistbtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalScore = document.getElementById("modalScore");
const modalYear = document.getElementById("modalYear");
const modalDuration = document.getElementById("modalDuration");
const modalBoxOffice = document.getElementById("modalBoxOffice");
const modalCountry= document.getElementById("modalCountry");

const modalGenres = document.getElementById("modalGenres"); 
const modalWriters = document.getElementById("modalWriters");
const modalActors = document.getElementById("modalActors"); 
const modalResume = document.getElementById("modalResume");   


const modalDescription = document.getElementById("modalDescription");
const showModalBtn = document.getElementById("showModalBtn");




// Creer une fonction qui fetchSingleMovieforModal qui récupère les infos d'un film donnée en f
// fonction de son ID (id en paramètre de la fonction)

const fetchSingleMovieforModal = async (id) => {
    await fetch("http://localhost:8000/api/v1/titles/" + id)
        .then((res) => res.json())
        .then((data) => (movie = data))
        console.log(movie)

    displayMovieToModal(movie)
        
}

const displayMovieToModal = (movie) => {

    modalImage.style.backgroundImage = `url(${movie["image_url"]})`;
    modalTitle.textContent = movie['title'];
    modalScore.innerHTML = "Rating : " + movie["imdb_score"]
    modalYear.innerHTML = "Year : " + movie["year"]
    modalDuration.innerHTML = "Duration : " + movie["duration"] +" min"
    modalCountry.innerHTML = "Countries : " + movie["countries"]
    modalGenres.innerHTML = "<strong>Genres</strong> : " + movie["genres"]
    modalResume.innerHTML = "<strong>Resume</strong> : " + movie["description"] 

    modalWriters.innerHTML = "<strong>Writers</strong> : " + movie["writers"]
    modalActors.innerHTML = "<strong>Actors</strong>: " + movie["actors"]
  
    // modalDescription.textContent = movie['long_description'];
   
        
    modal.style.display = "flex";
 

    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}


// Display movie to modal when click on add to watchlist button
function addToWatchlist(movieId) {
    fetchSingleMovieforModal(movieId);
   
}










