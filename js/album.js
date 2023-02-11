let container = document.querySelector(`.album`);
let playlist = document.querySelector(`.playlist`);
container.innerHTML = ``;
playlist.innerHTML = ``;
let search = new URLSearchParams(window.location.search);
let i = search.get(`i`);

let album = albums[i];

if (!album){
    container.innerHTML = `ОШИБКА Вы будете переадрисованы черзе 5 секунд`;
    setTimeout(()=>{
        window.location.pathname = `index.html`;
    }, 5000)
} else {
container.innerHTML = `
<div class="card mb-3">
    <div class="row row-cols-1 row-cols-md-2">
        <div class="col">
            <img src="${album.img}" alt="" class="img-fluid rounded-start">
        </div>
        <div class="col">
            <div class="card-body">
                <h5 class="card-title">${album.title}</h5>
                <p class="card-text">${album.description}</p>
                <p class="card-text"><small class="text-muted">Сборник выпущен в ${album.year} году</small>
                </p>
            </div>
        </div>
    </div>
</div>
`;



let tracks = album.tracks;
for (let j = 0; j < tracks.length; j++) {
    let track = tracks[j];
    playlist.innerHTML += `
    <li class="list-group-item d-flex align-items-center">
        <img src="assets/play.svg" alt="" class="me-3" height="30px">
        <div>
            <div>${track.title}</div>
            <div class="text-secondary">${track.author}</div>
        </div>
        <div class="div ms-auto">${track.time}</div>
    </li>
    `;
}
}