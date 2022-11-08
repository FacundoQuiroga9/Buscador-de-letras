//APP CONFIG
const API = "https://api.lyrics.ovh"

// GRAB DOM ELEMENTS
const search = document.querySelector(".search")
const form = document.querySelector(".form")
const content = document.querySelector(".content")


//LISTEN FORM FORM SUBMITS
form.addEventListener("submit" , event => {
    event.preventDefault()

    const searchTerm = search.value.trim()

    if (!searchTerm){
        alert("you must type a valid search term")
        return
    }
    searchSongs (searchTerm)
    
})

//SEARCH FOR SONGS AND ARTISTS
async function searchSongs(search) {
    const request = await fetch(`${API}/suggest/${search}`)
    const response = await request.json()
    const songs = response.data
    showSongs(songs)
}

//SHOW FETCHED SONGS
function showSongs(songs){
    content.innerHTML = `
        <ul class="songs">
            ${songs.map(song => {
                return `<li class="song">
                <img class="avatar" src="${song.album.cover}">
                <span>${song.title} by ${song.artist.name}</span>
                    <button data-title="${song.title}" data-artist="${song.artist.name}" class="show">Show Lyric</button>
                </li>`
            }).join("")}
        </ul>
    `
}

content.addEventListener("click" , event => {
    if (event.target.tagName == "BUTTON"){
        const element = event.target
        const title = element.getAttribute("data-title")
        const artist = element.getAttribute("data-artist")
        getSong(title, artist)
    }
})

//GET SONG LYRIC
async function getSong(title, artist){
    const request = await fetch(`${API}/v1/${artist}/${title}`)
    const response = await request.json()
    const lyric = response.lyrics
    showSong(title, artist, lyric)
}

//SHOW SONG LYRIC
function showSong(title, artist, lyric){
    lyric = lyric.replace(/(\n\r|\n|\r)/g, "<br>")
    content.innerHTML = `
        <h1 class="title">${title} by ${artist}</h1>
        <p class="lyric">
            ${lyric}
        </p>
    `
}