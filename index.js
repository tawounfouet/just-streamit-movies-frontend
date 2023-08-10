console.log("My Movie App test\n")

let lienApi_bestMovie = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score"
console.log(lienApi_bestMovie)



lienApi = "http://localhost:8000/api/v1/titles/"
lienpage = "http://localhost:8000/api/v1/titles/?format=json&page=8"


lienApi_pagesize = "http://localhost:8000/api/v1/titles/?page_size=12&sort_by=-imdb_score"

// Lien film le mieux noté toute catégorie confondu
// Lien film le mieux noté toute catégorie confondu




// // récupérer toutes les données de l'API depuis lienApi
// fetch(lienApi_pagesize)
//     .then((res) => res.json())
//     .then((data) => console.log(data.results))



// Recureperer les données de l'API en itérant sur toutes les pages et en les stockant dans un tableau
let moviesData = []

const fetchAllMovies = async () => {
    let moviesData = []
    let page = 2
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

    // console.log(moviesData)
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
        .then((data) => (movieData = data.results[0]))
        .then(movieData) => {
            console.log(movieData)
        }
    
    // 
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

// userDisplay()



