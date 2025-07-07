const movieName = document.getElementById("movieName");
const year = document.getElementById("year");
const genre = document.getElementById("genre");
const writer = document.getElementById("writer");
const actors = document.getElementById("actors");
const plot = document.getElementById("plot");
const language = document.getElementById("language");
const rating = document.getElementById("imdbRating");
const votes = document.getElementById("imdbVotes");
const awards = document.getElementById("awards");
const input = document.getElementById("inputBox");
const movieImage = document.getElementById("movieImg");
let title = "";
let imdbId; 

const searchList = document.getElementById('search-list');


const apiUrl = "https://www.omdbapi.com/?";
const apiKey = "15c9aec";
const apiUrlImg = "http://img.omdbapi.com/?";
/*
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=${apiKey}`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if(data.Response == "True") displayMovieList(data.Search);
}

function findMovies(){
    let searchTerm = (input.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID;
        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else 
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>`;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}
*/


async function getMovie(title) {
    try {
        const response = await fetch(`${apiUrl}t=${title}&apikey=${apiKey}`);
        
        if (!response.ok) {
            throw new Error(`Invalid movie name or API error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.Title || !data.imdbID) {
            throw new Error("Unexpected API response.");
        }

        imdbId = data.imdbID; 
        const posterUrl = `${apiUrlImg}apikey=${apiKey}&i=${imdbId}`;
        movieImage.src = posterUrl;  

       
        movieName.innerHTML = data.Title !== "N/A" ?  data.Title : "N/A";
        year.innerHTML = data.Year !== "N/A" ?"<strong>Year:</strong> "+ data.Year : "N/A";
        genre.innerHTML = data.Genre !== "N/A" ?"<strong>Genre:</strong> "+ data.Genre : "N/A";
        writer.innerHTML = data.Writer !== "N/A" ?"<strong>Writer:</strong> "+ data.Writer : "N/A";
        actors.innerHTML = data.Actors !== "N/A" ?"<strong>Actors:</strong> "+ data.Actors : "N/A";
        plot.innerHTML = data.Plot !== "N/A" ?"<strong>Plot:</strong> "+ data.Plot : "N/A";
        language.innerHTML = data.Language !== "N/A" ?"<strong>Language:</strong> "+ data.Language : "N/A";
        rating.innerHTML = data.imdbRating !== "N/A" ? "<strong>Rating:</strong> " + data.imdbRating : "N/A";
        votes.innerHTML = data.imdbVotes !== "N/A" ? "<strong>Votes:</strong> " + data.imdbVotes : "N/A";
        awards.innerHTML = data.Awards !== "N/A" ? "<strong>Awards:</strong> " + data.Awards : "N/A";


    } catch (error) {
        console.error("Error:", error);
        movieName.innerHTML = "Invalid title";
    }
}

function searchMovie() {
    title = input.value.trim();
    if (title) {
        getMovie(title);
    } else {
        movieName.innerHTML = "Please enter a movie title.";
    }
}
