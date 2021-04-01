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
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#my-form').submit( processForm );

    $(document).ready(function(){
        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'get',
            cache:false,
            success: function(data){
                console.log(data);
                var movie = '';
                $.each(data, function(index, value){
                    console.log(value);
                    movie += '<tr>';
                    movie += '<td>'+value.movieId+'</td>';
                    movie += '<td>'+value.title+'</td>';
                    movie += '<td>'+value.genre+'</td>';
                    movie += '<td>'+value.director+'</td>';
                    movie += '<td>'+'<button id="delete {value.movieId}">Delete Movie</button>'+'</td>';
                    movie += '</tr>';
                });
                $("#movie_list_json").append(movie);
            },
            error: function(d){
                /*console.log("error");*/
                alert("404. Please wait until the File is Loaded.");
            }
        });
    });

    $(document).ready(function () {  
        $("#delete").click(function () {  
            let movie = new Object();  
            movie.id = $('#id').val();   
            $.ajax({  
                url: 'https://localhost:44325/api/movie/{movie.id}',  
                type: 'DELETE',  
                dataType: 'json',  
                data:movie,  
                success: function (data, textStatus, xhr) {  
                    console.log(data);  
                },  
                error: function (xhr, textStatus, errorThrown) {  
                    console.log('Error in Operation');  
                }  
            });  
        });  
    });

})(jQuery);

