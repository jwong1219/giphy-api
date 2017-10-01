//this array stores our starting keys, and the keys that will be added by the user
var topics =["Iron Man", "Captain America", "Spiderman", "Black Widow", "Hulk", "Thor", "Vision", "Scarlet Witch", "Black Panther", "Hawkeye", "Falcon", "War Machine", "Nick Fury", ];

//this function will take all the keys in the topics array and turn them into buttons in the button-holder div
function renderButtons() {
  $("#button-holder").empty();
  topics.forEach(function(item) {
    var newButton = $("<button>");
    newButton.addClass('btn btn-info');
    newButton.text(item);
    newButton.attr('data-name', item);
    $("#button-holder").append(newButton);
  });
};

function getGifs(subject) {
  var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + subject + '&api_key=8XcFH2XFY46wUTtTjPvR0IcofPuK0XCn&limit=10';

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(result) {
    console.log(result);
    $("#gif-box").empty();
    result.data.forEach(function(item) {
      var newGifDiv = $("<div>");
      newGifDiv.addClass('gif-div text-center');
      var image = $("<img>");
      image.addClass('gif');
      image.attr('src', item.images.fixed_height_still.url);
      image.attr({'data-animate': item.images.fixed_height.url, 'data-state': 'still', 'data-still': item.images.fixed_height_still.url});
      newGifDiv.append(image);
      newGifDiv.append("<p>Rating: " + item.rating);
      $("#gif-box").prepend(newGifDiv);
    });

  });
}

function changeState(clicked){
  var status = clicked.attr('data-state');
  if(status === "still") {
    clicked.attr('src', clicked.attr('data-animate'));
    clicked.attr('data-state', 'animated');
  }
  else {
    clicked.attr('src', clicked.attr('data-still'));
    clicked.attr('data-state', 'still');
  }
  
}

function addTopic(input) {
  topics.push(input);
  renderButtons();
}

$(window).on("load", function() {
  
  renderButtons(); //loads the initial set of the buttons to the page
  getGifs(topics[5]);
  // getGifs(topics[7]);

  $("#button-holder").on("click", ".btn", function() {
    console.log($(this));
    var buttonName = $(this).attr('data-name');
    console.log({buttonName});
    getGifs(buttonName);

  });

  $("#gif-box").on("click", ".gif", function() {
    console.log($(this));
    var gifSelected = $(this);
    changeState(gifSelected);
  });

  $("#submit").on("click", function() {
    event.preventDefault();
    var newTopic = $("#addButton").val();
    $("#addButton").val('');
    console.log(newTopic);
    if (newTopic) {
      addTopic(newTopic);
    }
  })


});