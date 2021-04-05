(function($){
    function processForm( e ){
        var dict = {
        	Title : this["title"].value,
        	Director: this["director"].value,
            Genre : this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
                clearTable();
                populateMoviesTable();
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
        e.preventDefault();
    }
    $('#my-form').submit( processForm );

    $(document).ready(function(){
        populateMoviesTable();
    });
})(jQuery);

function populateMoviesTable(editMovieID = null){
    
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'get',
        cache:false,
        success: function(data){
            $.each(data, function(index, value){
                if(this.movieId == editMovieID){
                   editFormHolder(value)
                }
                else{
                $("#movie_list_json").append('<tr><td>'+this.movieId+'</td>'+
                '<td>'+this.title+'</td>' +
                '<td>'+this.genre+'</td>' +
                '<td>'+this.director+'</td>' +
                '<td>'+`<button onclick="deleteMovie(${this.movieId})">Delete Movie</button>`+'</td>' +
                '<td>'+`<button onclick="editMovie(${this.movieId})">Edit Movie</button>`+'</td></tr>' 
                );
                }
            });
        },
        error: function(d){
            console.log("error");
            alert("404. Please wait until the File is Loaded.");
        }
    });
}

function deleteMovie(movieId){
    $.ajax({  
        url: `https://localhost:44325/api/movie/${movieId}`,  
        type: 'delete',  
        dataType: 'json',  
        success: function (data, textStatus, xhr) {  
            console.log(data); 
            clearTable(); 
            populateMoviesTable();
        },  
        error: function (xhr, textStatus, errorThrown) {  
            console.log('Error in Operation');  
        }  
    });  
};  

function editMovie(movieID){
    clearTable();
    populateMoviesTable(movieID);
}
    



function clearTable(){
    document.getElementById("movie_list_json").innerHTML = " ";
}

function editFormHolder(movie){
    $("#movie_list_json").append('<tr><form id="edit-form">' +
        `<td><input style="display:none" type="hidden" id="movieId" name="movieId" value="${movie.movieId}"></input></td>` +
        `<td><input type="text" name="title" placeholder="${movie.title}" /></td>` +
        `<td><input type="text" name="genre" placeholder="${movie.genre}" /></td>` +
        `<td><input type="text" name="director" placeholder="${movie.director}" /></td>` +
        `<td><button type="submit" name="updateMovieBtn">Update Movie</button></td>` +
        '</form></tr>'
    )
    $("#edit-form").on("submit", processEditForm);
}

function processEditForm(){
    var updatedMovie = {
        MovieId: this["movieId"].value,
        Title : this["title"].value,
        Director: this["director"].value,
        Genre : this["genre"].value
    };
 
    $.ajax({
      type: "put",
      url: `https://localhost:44325/api/movie/${updatedMovie.movieId}`,  
      data: JSON.stringify(updatedMovie),
        success: function (updatedMovie) {  
        console.log(updatedMovie);  
        populateMoviesTable();
         },  
        error: function (xhr, textStatus, errorThrown) {  
        console.log('Error in Operation');  
    }  
    });
 
    e.preventDefault();
  }