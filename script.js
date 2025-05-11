

const gett = document.getElementById("get"); 
const input = document.querySelector('.search');
const api_key = '2c0276d';

/*fetch(`https://www.omdbapi.com/?apikey=${api_key}&t=${movie_title}`)
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(error => console.error(error));*/

gett.addEventListener('click', fetchmovies)
async function fetchmovies(){
    let movie = input.value;
    if(!movie){
        alert("Please Enter a movie name");
        return;
    }
    //const response = await fetch(`https://www.omdbapi.com/?apikey=${api_key}&t=${encodeURIComponent(movie)}`);
    const response = await fetch(`http://www.omdbapi.com/?apikey=${api_key}&t=${movie}&i=tt1375666`);
    const data = await response.json();
    data => console.log(data.Search[0].Poster);
    if(data.Response === 'False' || data.Error){
        alert('Movie name is invalid');
        return;
    }
    const poster = data.Poster;
    const moviename = movie;
    const title = data.Title;
    const plot = data.Plot;
    const lang = data.Language;
    const rele = data.Released;
    const movieinfo = document.querySelector('.movie-info');
    const response1 = await fetch(`http://img.omdbapi.com/?apikey=${api_key}&i=tt1375666`);
if (!movieinfo) {
    console.error("Error: '.movie-info' element not found in the DOM.");
    return;
}
    movieinfo.innerHTML = `
    <div class="current-movie">
    <img src = "${poster}" alt = "${title}"></img>
    <h2>${moviename}</h2>
    <div class="temp"><strong>Title:</strong> ${title}</div>
    <div class="description"><strong>Plot:</strong> ${plot}</div>
    <div class="details">
        <div><strong>Language:</strong> ${lang}</div>
        <div><strong>Released Date:</strong> ${rele}</div>
    </div>
</div>`
};


const favoriteMovies = ["Batman", "Avengers", "Annabelle", "The Conjuring", "Inception"]; // List of favorite movies
const favor = document.querySelector(".b2");
const movieinfo = document.querySelector('.movie-info');
favor.addEventListener('click', async () => {
    movieinfo.innerHTML = ""; // Clear previous movies

    for (let movie of favoriteMovies) {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${api_key}&t=${encodeURIComponent(movie)}`);
        const data = await response.json();

        if (data.Response === "True") {
            const movieElement = `
            <div class="movie-card">
                <img src="${data.Poster}" alt="${data.Title}">
                <h2>${data.Title}</h2>
                <p><strong>Plot:</strong> ${data.Plot}</p>
                <p><strong>Released:</strong> ${data.Released}</p>
            </div>`;

            movieinfo.innerHTML += movieElement;
        } else {
            console.error(`Error fetError fetching ${movie}: ${data.Error}`);
        }
    }
});