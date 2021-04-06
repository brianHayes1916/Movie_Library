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
                '<td>'+`<button class="redButton button" onclick="deleteMovie(${this.movieId})">Delete Movie</button>`+'</td>' +
                '<td>'+`<button class="yellowButton button" onclick="editMovie(${this.movieId})">Edit Movie</button>`+'</td></tr>' 
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
    $("#movie_list_json").append('<tr class="table-secondary"><form id="edit-form">' +
        `<td><input style="display:none" type="hidden" id="movieId" name="movieId" value="${movie.movieId}"></input></td>` +
        `<td><input type="text" name="title" class="form-customized" id="movieTitle" placeholder="${movie.title}" /></td>` +
        `<td><input type="text" name="genre" class="form-customized" id="genre" placeholder="${movie.genre}" /></td>` +
        `<td><input type="text" name="director" class="form-customized" id="director" placeholder="${movie.director}" /></td>` +
        `<td><button class="updateButton button" type="submit" onclick='processEditForm()'name="updateMovieBtn">Update Movie</button></td>` +
        '</form></tr>'
    )
}

function processEditForm(){
    var updatedMovie = {
        movieId: parseInt(this["movieId"].value),
        title : this["movieTitle"].value,
        genre : this["genre"].value,
        director: this["director"].value
    };
 
    $.ajax({
        dataType: 'json',
        type: 'put',
        contentType: 'application/json',
        url: `https://localhost:44325/api/movie/${updatedMovie.movieId}`,  
        data: JSON.stringify(updatedMovie),
        success: function (data) {  
            console.log(data);  
            clearTable();
            populateMoviesTable();
                },  
        error: function (xhr, textStatus, errorThrown) {  
            console.log('Error in Operation');  
    }  
    });
  }