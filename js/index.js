let container = document.querySelector(`.albums`);

container.innerHTML = ``;
for (let i =0; i<albums.length; i++){
    let album = albums[i];
    container.innerHTML += `
    <div class="col">
        <a class="text-decoration-none" href="album.html?i=${i}">
            <div class="card">
                <img src="${album.img}" alt="" class="card-image-top img-fluid">
                <div class="card-body">
                <p class="card-text">
                    ${album.title}
                </p>
                </div>
            </div>
        </a>
  </div>`   
}