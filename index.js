const animeEl = document.querySelector('.anime')
const resultsEl = document.querySelector('.results__text')
const searchEl = document.querySelector('.landing__search--input')
// const btnEl = document.querySelector('.landing__search--btn')
const animeWrapper = document.querySelector('.anime')
// let animeDataArray;

// http://www.omdbapi.com/?apikey=2ce356c6&s=

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
    // console.log(animeDataArray)
    const filteredAnimeDataArray = animeDataArray.filter(anime => anime.aired.from).sort(function (a, b) { return b.scored_by - a.scored_by }).slice(0, 6)
    console.log(filteredAnimeDataArray)
    animeEl.innerHTML = filteredAnimeDataArray.map(anime => movieHTML(anime)).join("")
    resultsEl.innerHTML = `<h4 class="results__text">Search Results for "${anime}"</h4>`
}

getMovies("Naruto") //default search

function movieHTML(anime) {
    return `<div class="anime__individual">
                <img class ="anime__poster" src="${anime.images.jpg.large_image_url}" alt="">
                <div class="anime__text--container">
                    <h2>${anime.title}</h2>
                    <h4>Year: ${anime.aired.from.split("-")[0]}</h4>
                </div>
            </div>`
}

searchEl.addEventListener('change', () => {
    getMovies(searchEl.value)
})



// const userListEl = document.querySelector('.user-list')

// async function main() {
//     const users = await fetch("https://jsonplaceholder.typicode.com/users");
//     const usersData = await users.json();
    // userListEl.innerHTML = usersData.map(user => userHTML(user)).join("")
// }
// main()

// function showUserPosts(id) {
//     localStorage.setItem("id",id)
//     window.location.href = `${window.location.origin}/user.html`
// }

// function userHTML(user) {
//     return `<div class="user-card" onclick="showUserPosts(${user.id})">
//     <div class="user-card__container">
//       <h3>${user.name}</h4>
//         <p><b>Email:</b> ${user.email}</p>
//         <p><b>Phone:</b> ${user.phone}</p>
//         <p><b>Website:</b> <a href="${user.website}" target="_blank">${user.company.name}</a></p>
//     </div>
//   </div>`
// }