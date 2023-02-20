let container = document.querySelector(`.album`);
let playlist = document.querySelector(`.playlist`);

function getAlbum() {
    let search = new URLSearchParams(window.location.search);
    let i = search.get(`i`);
    return albums[i]
}
function renderError(){
    container.innerHTML = `ОШИБКА Вы будете переадрисованы черзе 5 секунд`;
    setTimeout(() => {
        window.location.pathname = `index.html`;
    }, 5000)
}
function renderAlbumInfo(){
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
}
function renderTracks(){
    let tracks = album.tracks;
    for (let j = 0; j < tracks.length; j++) {
        let track = tracks[j];
        playlist.innerHTML += `
    <li class="track list-group-item d-flex align-items-center">
        <img src="assets/play.svg" alt="" class="img-play me-3" height="30px">
        <div>
            <div>${track.title}</div>
            <div class="text-secondary">${track.author}</div>
        </div>
        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: 0%;"></div>
        </div>
        <div class="div ms-auto time">${track.time}</div>
        <audio class="audio" src="${track.src}"></audio>
    </li>
    `;
    }
}
function getTime(time) {
    let currentSeconds = Math.floor(time);
    let minutes = Math.floor(currentSeconds / 60);
    let seconds = Math.floor(currentSeconds % 60);

    if (minutes < 10) {
        minutes = `0` + minutes;
    }
    if (seconds < 10) {
        seconds = `0` + seconds;
    }
    return `${minutes}:${seconds}`;
}
function setupAudio() {
    // Найди коллекцию с треками
    let trackNodes = document.querySelectorAll(`.track`);
    for (let i = 0; i < trackNodes.length; i++) {
        // Один элемент
        let track = album.tracks[i];
        let node = trackNodes[i];
        let timeNode = node.querySelector(`.time`);
        let img = node.querySelector(`.img-play`);
        let progressBar = node.querySelector(`.progress-bar`);
        // Тег аудио внутри этого элемента
        let audio = node.querySelector(`.audio`);
        node.addEventListener(`click`, function () {
            // Если трек сейчас играет...
            if (track.isPlaying) {
                track.isPlaying = false;
                // Поставить на паузу
                audio.pause();
                img.src = `assets/play.svg`;
                // Если трек сейчас не играет...
            } else {
                track.isPlaying = true;
                // Включить проигрывание
                audio.play();
                img.src = `assets/pause.svg`;
                updateProgress();
            }
        });
        function updateProgress() {
            // Нарисовать актуальное время
            let time = getTime(audio.currentTime);
            if (timeNode.innerHTML != time) {
                timeNode.innerHTML = time;
                progressBar.style.width = audio.currentTime * 100 / audio.duration + '%';
                progressBar.ariaValueNow = audio.currentTime * 100 / audio.duration + '%';
            }

            // Нужно ли вызвать её ещё раз?
            if (track.isPlaying) {
                requestAnimationFrame(updateProgress);
            }
        }
    }

}
let album = getAlbum();
if (!album) {
    renderError();
} else {
    renderAlbumInfo();
    renderTracks();
    setupAudio();
}