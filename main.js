$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
       let searchText = $('#searchText').val();
       getMovies(searchText);
        e.preventDefault();
    });
}); 

const btnEl = document.getElementById('search-btn');
btnEl.addEventListener('click', getMovies)


function getMovies(searchText){
    axios.get('https://www.omdbapi.com?s='+searchText +'&apikey=9be27fce')
    .then( (response) => {
        console.log(response); 
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
            output += `
            <div class="movie-box">
            <div class="well movie-box2">
            <img class="movie-img" src="${movie.Poster}">
            <p class="movie-title">${movie.Title}</p>
            <p class="movie-type">${movie.Type}</p>
            <a onclick="movieSelected('${movie.imdbID}')" class= "btn" href="#">Movie Details</a>
            </div>
            </div>
            `;
        });
        $('#movies').html(output);
    })
    .catch((err) => {
        console.log(err);

    });
}

   function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false; 
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    axios.get('https://www.omdbapi.com?i='+movieId+'&apikey=9be27fce' )
        .then((response) => {
            console.log(response);
            let movie = response.data
            let output =
             `
            <div class="movie-info_box">
            <div class="img-div">
                <img src="${movie.Poster}" class="movie-info_img" alt="">
            </div>
            <div class="movie-info_list">
                <h2 class="movie-info_title">${movie.Title}</h2>
                <p class="">${movie.Plot}</p>
                <ul>
                    <li> <b>Genre: </b>${movie.Genre} </li>
                    <li> <b>Released: </b> ${movie.Year}</li>
                    <li> <b>Duration: </b>${movie.Runtime} </li>
                    <li> <b>IMDB Rating: </b>${movie.imdbRating} </li>
                    <li> <b>Director: </b>${movie.Director} </li>
                    <li> <b>Writer: </b> ${movie.Writer}</li>
                    <li> <b>Actors: </b> ${movie.Actors}</li>
                </ul>
                <a  class= "btn-movie_info" href="http://imdb.com/title/${movie.imdbID}" target="_blank" >View in IMDB</a>
            </div>
            
           </div>
            `;
            $('#movie').html(output)
        })
        .catch((err) =>{
            console.log(err);
        });
}