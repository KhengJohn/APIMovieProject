$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
       let searchText = $('#searchText').val();
       getMovies(searchText);
        e.preventDefault();
    });
}); 

function getMovies(searchText){
    axios.get('http://www.omdbapi.com?s='+searchText +'&apikey=9be27fce')
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
            <a onclick="movieSelected('${movie.imbdID}')" class= "btn" href="#">Movie Details</a>
            </div>
            </div>
            `;
        });
        $('#movies').html(output);
    })
    .catch((error) => {
        console.log(error);

    });
}