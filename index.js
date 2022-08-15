const animeEl = document.querySelector('.anime')
const resultsEl = document.querySelector('.results__text')
const searchEl = document.querySelector('.landing__search--input')
const animeWrapper = document.querySelector('.anime')
const noResultsWrapper = document.querySelector('.no__results-text-container')
const slider = document.getElementById("myRange");
let output = document.getElementById("value");
//let outputVarNo = document.getElementById("outputVar");         
// let animeDataArray;

// http://www.omdbapi.com/?apikey=2ce356c6&s=


function update() {
    return output.innerHTML = slider.value;
}

// slider.addEventListener('input',);
// getMovies(searchEl.value)
// update();

slider.addEventListener('change', () => {
    getMovies(searchEl.value)
})

slider.addEventListener('input', () => {
    update()
})

async function getMovies(anime) {
    animeWrapper.classList += ' anime__loading'
    animeEl.innerHTML = `<i class="fas fa-spinner anime__loading--spinner"></i>`
    const animeFetch = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}&sfw`)
    const animeData = await animeFetch.json()
    const animeDataArray = await animeData.data
    // if (!animeDataArray) {
    //     animeDataArray = await animeData.data
    // }
    animeWrapper.classList.remove('anime__loading')
    const filteredAnimeDataArray = animeDataArray.filter(anime => anime.aired.from && anime.score >= slider.value).sort(function (a, b) { return b.scored_by - a.scored_by }).slice(0,24)
    console.log(filteredAnimeDataArray)
    animeEl.innerHTML = filteredAnimeDataArray.map(anime => movieHTML(anime)).join("")
    if (filteredAnimeDataArray.length === 0) {
        noResultsWrapper.innerHTML = `<h4 class="no__results--text white">No Results. Please Try Again</h4>`
    }
    else {
        noResultsWrapper.innerHTML = ""
    }
    if (anime === "") {
        resultsEl.innerHTML = `<h4 class="results__text">Most Rated Anime</h4>`
    }
    else {resultsEl.innerHTML = `<h4 class="results__text">Search Results for <span class="blue">"${anime}"</span></h4>`}
}

getMovies("") //default search
update()

function movieHTML(anime) {
    return `<div class="anime__individual">
                <img class ="anime__poster" src="${anime.images.jpg.large_image_url}" alt="">
                <div class="anime__text--container">
                    <h2 class="anime__title">${anime.title}</h2>
                    <p>Scored by: ${anime.scored_by.toLocaleString()}</p>
                    <p>Score: ${anime.score}</p>
                    <p>Year: ${anime.aired.from.split("-")[0]}</p>
                </div>
                <div class="anime__synopsis--container">
                <p><b>Synopsis:</b><br> ${anime.synopsis.substring(0,400) + "..."}</p>
                </div>
            </div>`
}

searchEl.addEventListener('change', () => {
    getMovies(searchEl.value)
})