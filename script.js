$( document ).ready(function() {

var api_key = 'dc6zaTOxFJmzC';
var gifChoices = [];
var results = [];

$("#submit").on('click', function(event){
  var search = $("#inputField").val();
  gifChoices = [];

  $("#output").html("");
  event.preventDefault();

  $.ajax({
    url: 'http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=' + api_key,
    async: false,
    success: function (data) {
      var temp = data.data;
      var counter = 0;

      results = shuffleArray(temp);

      temp.forEach(function(gif){
        if (counter < 4) {
          gifChoices.push(gif);
          var id = gif.id;
          $("#output").append("<img class='gif gif" + counter +  "' src=" + generateGifLink(id) + " />" );
          counter++;
        }
        });
      }
    })
});

$(document).on('click', '.gif', function(event){
  console.log(results);
  console.log(gifChoices);
});



function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
return array;
};

function generateGifLink(id) {
  return 'https://media.giphy.com/media/' + id + '/giphy.gif'
}


// Document Ready Closing tags
});
