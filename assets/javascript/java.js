var topics = ["Tom Brady", "Antonio Brown", "Von Miller", "Julio Jones", "Khalil Mack", "Aaron Rodgers", "Ezekiel Elliot", "Odell Beckham Jr.", "Le'veon Bell", "Matt Ryan"]

function getPlayerGif() {

var playerGif = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response);
    });
  }

  function createButtons() {
    $(".buttons").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $('<button class="btn btn-primary">');
      a.addClass("playerGif");
      a.attr("data-name", topics[i]);
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
