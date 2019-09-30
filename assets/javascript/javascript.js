$(document).ready(function () {
    var topics = [];

    function displayGiphyShow() {
        var x = $(this).data("search");
        console.log(x);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
                var showDiv = $("<div class='col-md-4'/>");
                //var showDiv = $("div");
                //console.log(rating);
                var defaultAnimatedSrc = results[i].embed_url;
                //console.log(defaultAnimatedSrc);
                var staticSrc = results[i].embed_url;
                // console.log(staticSrc);
                var showImage = $("<img/>");
                //console.log(showImage);
                var p = $("<p/>").append("Rating: " + results[i].rating);
                //console.log(p);
                showImage.attr("src", staticSrc);
                showImage.addClass("giphyPics");
                showImage.attr("data-state", "still");
                showImage.attr("data-still", staticSrc);
                showImage.attr("data-animate", defaultAnimatedSrc);
                showDiv.append(p);
                showDiv.append(showImage);
                $("#gifArea").append(showDiv);
            }
        });
    }
    $('#addShow').on('click', function (event) {
        event.preventDefault();
        var newShow = $('#giphyInput').val().trim();
        topics.push(newShow);
        $('#giphyInput').val('');
        displayButtons();
    });

    function displayButtons() {
        $('#myButtoms').empty();
        for (var i = 0; i < topics.length; i++) {
            var buttom1 = $('<button class="btn btn-primary">');
            buttom1.attr('id', 'show');
            buttom1.attr('data-search', topics[i]);
            buttom1.text(topics[i]);
            $('#myButtons').append(buttom1);
        }
    }

    displayButtons();
    $(document).on('click', '#show', displayGiphyShow);
    $(document).on('click', '.giphyPics', pausePlayedGifs);

    function pausePlayedGifs() {
        var stateGifs = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");

        }

    }

});