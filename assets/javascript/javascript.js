$(document).ready(function () {
    var topics = ["cats", "dogs", "cars", "birds"];
    displayButtons();
    function displayGiphyShow() {
        var x = $(this).data("search");
        // console.log(x);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=Ea8ltjsv86UYOv8Lkpo81IO6zCWTc9ic&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
                var showDiv = $('<div class="col-md-4">');
                var showImage = $("<img>");
                //console.log(defaultAnimatedSrc);
                var staticSrc = results[i].images.fixed_width_still.url;
                var moveSrc = results[i].images.fixed_width.url;

                //console.log(showImage);
                var p = $("<p>").text("Rating: " + results[i].rating);
                //console.log(p);
                showImage.attr("src", staticSrc);
                showImage.addClass("image");
                showImage.attr("data-state", "still");
                showImage.attr("data-still", staticSrc);
                showImage.attr("data-animate", moveSrc);
                showDiv.append(p);
                showDiv.append(showImage);
                $("#gifArea").prepend(showDiv);
            }
        });
    }

    $('#addShow').on('click', function (event) {
        event.preventDefault();
        $('#myButtons').empty();
        var newShow = $('#giphyInput').val().trim();
        topics.push(newShow);
        $('#giphyInput').val('');
        displayButtons();
    });

    function displayButtons() {
        for (var i = 0; i < topics.length; i++) {
            var button1 = $('<button type="button" class="btn btn-secondary">');
            button1.attr("id","show");
            button1.attr('data-search', topics[i]);
            button1.text(topics[i]);
            $('#myButtons').append(button1);
        }
    }

    
    $(document).on("click", "#show", displayGiphyShow);
    $(document).on("click", ".image", pausePlayedGifs);

    function pausePlayedGifs() {
        var stateGifs = $(this).attr("data-state");
        if (stateGifs === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");

        }

    }

});