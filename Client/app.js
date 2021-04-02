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
            console.log(data);
            $.each(data, function(index, value){
                console.log(value);
                if(this.movieId == editMovieID){
                    editFrormHolder(this);
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
    

function updateMovie(movieId){
    $.ajax({  
        url: `https://localhost:44325/api/movie/${movieId}`,  
        type: 'update',  
        dataType: 'json',  
        success: function (data, textStatus, xhr) {  
            
            console.log(data);  
            populateMoviesTable();
        },  
        error: function (xhr, textStatus, errorThrown) {  
            console.log('Error in Operation');  
        }  
    });  
};  

function clearTable(){
    document.getElementById("movie_list_json").innerHTML = " ";
}

function editFrormHolder(movie){
    $("#movie_list_json").append('<form id="edit-form">' +
    `<input type="text" name="title" placeholder="${movie.title}" />` +
    `<input type="text" name="genre" placeholder="${movie.genre}" />` +
    `<input type="text" name="director" placeholder="${movie.director}" />` +

    '<button type="submit">Update Movie</button>' +
    '</form>'
    )}