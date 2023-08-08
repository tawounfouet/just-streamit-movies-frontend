console.log("My Movie App\n")

lienApi = "http://localhost:8000/api/v1/titles/"
lienpage = "http://localhost:8000/api/v1/titles/?format=json&page=8"


lienApi_pagesize = "http://localhost:8000/api/v1/titles/?page_size=12&sort_by=-imdb_score"


// // récupérer toutes les données de l'API depuis lienApi
// fetch(lienApi_pagesize)
//     .then((res) => res.json())
//     .then((data) => console.log(data.results))



// Recureperer les données de l'API en itérant sur toutes les pages et en les stockant dans un tableau
let moviesData = []

const fetchAllMovies = async () => {
    let moviesData = []
    let page = 1
    let lienpage = `http://localhost:8000/api/v1/titles/?format=json&page=${page}`

    do {
        await fetch(lienpage)
            .then((res) => res.json())
            .then((data) => {
                moviesData.push(...data.results)
                lienpage = data.next
                page++
            })
    } while (lienpage !== null) 

    console.log(moviesData)
}

// fetchAllMovies()




// fetch(lienApi).then((res) => console.log(res))

// fetch(lienApi)
//     .then((res) => res.json()
//     .then((data) => console.log(data.results))
// )



// mettre en parametre le lien car on a 4 urls 
// Utiliser la meme fonction pour récupérer les 04 groupes

let movieData = [] 

const fetchMovie = async () => {
    await fetch(lienApi_pagesize)
        .then((res) => res.json())
        .then((data) => (movieData = data.results))
    
    console.log(movieData)
}

const userDisplay = async () => {
    await fetchMovie()

    document.body.innerHTML = movieData
        .map((movie) => 
                `
                <div class="card">
                    <img src=${movie.image_url} alt="photo de ${movie.title}">
                    <h4> ${movie.title} </h4>
                    
                    <p> Rating : ${movie.imdb_score} </p>
                
                    <em>Date de Sortie : ${movie.year} </em>
                </div>
                `
            )
        .join("")
}

userDisplay()



