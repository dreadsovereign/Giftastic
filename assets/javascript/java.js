var topics = ["Tom Brady", "Antonio Brown", "Von Miller", "Julio Jones", "Khalil Mack", "Aaron Rodgers", "Ezekiel Elliot", "Odell Beckham Jr.", "Le'Veon Bell", "Matt Ryan"];

function createButtons() {
  $(".buttons").empty();
  for (var i = 0; i < topics.length; i++) {
    var a = $('<button class="btn btn-primary">');
    a.addClass("playerGif");
    a.attr("data-person", topics[i]);
    a.text(topics[i]);
    $(".buttons").append(a).append(" ");
  }

    $(".playerGif").on("click", function() {
    $("#gifs").empty();
    $(".content").css("width", "960px");

    var playerGif = $(this).attr("data-person");
    var state = $(this).attr("data-state");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + playerGif + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      console.log (response)
      var results = response.data;
      
      for (var i = 0; i < results.length; i++) {
        var animateGif = results[i].images.fixed_width.url;
        var pauseGif = results[i].images.fixed_width_still.url;
        var gifDiv = $("<div class='item'>");
        
        var rating = results[i].rating;
        
        var p = $("<p>").text("Rating: " + rating);
        
        var playerImage = $("<img>");
        playerImage.attr("src", results[i].images.fixed_width.url).attr('data-animated', animateGif).attr('data-paused', pauseGif).attr('src', pauseGif).addClass('playOnHover');;
        
        gifDiv.prepend(p);
        gifDiv.prepend(playerImage);

        $("#gifs").prepend(gifDiv);

      }
    });
  });
}

$(document).on('mouseover','.playOnHover', function(){
      $(this).attr('src', $(this).data('animated'));
 });
 $(document).on('mouseleave','.playOnHover', function(){
      $(this).attr('src', $(this).data('paused'));
 });

$("#submit").on("click", function(event) {
  event.preventDefault();
  var player = $("#player-name").val().trim();
  topics.push(player);
  createButtons();
});

createButtons();
