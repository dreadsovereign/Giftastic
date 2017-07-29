var topics = ["Tom Brady", "Antonio Brown", "Von Miller", "Julio Jones", "Khalil Mack", "Aaron Rodgers", "Ezekiel Elliot", "Odell Beckham Jr.", "Le'veon Bell", "Matt Ryan"];

function createButtons() {
  $(".buttons").empty();
  for (var i = 0; i < topics.length; i++) {
    var a = $('<button class="btn btn-primary">');
    a.addClass("playerGif");
    a.attr("data-person", topics[i]);
    a.text(topics[i]);
    $(".buttons").append(a).append(" ");
  }
}

$("#submit").on("click", function(event) {
  event.preventDefault();
  var player = $("#player-name").val().trim();
  topics.push(player);
  createButtons();
});
createButtons();

$(".buttons.btn.btn-primary.playerGif").on("click", function() {

var playerGif = $(this).attr("data-person");
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + playerGif + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .done(function(response) {
    console.log(response);
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class='item'>");
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      var playerImage = $("<img>");
      playerImage.attr("src", results[i].images.fixed.height.url);
      gifDiv.prepend(p);
      gifDiv.prepend(playerImage);
      $(".gifs").prepend(gifDiv);
    }
  });
});
