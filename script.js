$( document ).ready(function() {
// VARIABLES
var api_key = 'dc6zaTOxFJmzC';
var gifChoices = [];
var results = [];
$('#recentOutput').hide();



$("#submit").on('click', function(event){
  $('#output').hide();
  var search = $("#inputField").val();
  search = search.replace(/\s/g,'+')
  gifChoices = [];

  $("#output").html("");
  event.preventDefault();

  $.ajax({
    url: 'http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=' + api_key,
    success: function (data) {
      var temp = data.data;
      var counter = 0;

      results = shuffleArray(temp);

      temp.forEach(function(gif){
        if (counter < 5) {
          gifChoices.push(gif);
          var id = gif.id;
          $("#output").append("<img class='column one-fifth gif' id='gif" + counter +  "' src=" + generateGifLink(id) + " />" );
          $('#output').show('blind', 'slow');
          counter++;
          }
        });
      }
    })
});


$(document).on('click', '.gif', function(event){
  var indexPos = this.id.substring(3);
  $("#recentOutput").append("<img class='gif' id='" + this.id +  "' src=" + generateGifLink(gifChoices[indexPos].id) + " />" );
  $('#recentOutput').show('blind', 'slow');
  console.log(JSON.stringify(gifChoices[indexPos]));
  localStorage.setItem(createDate(), JSON.stringify(gifChoices[indexPos]));
  localStorage;
});

// FUNCTIONS
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

function createDate(){
    var d = new Date();
    var today = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`
    //${d.getHours()}:${d.getMinutes()}
    return today
}

function getLocalStorage(){
  for (keys in localStorage){
    console.log(JSON.parse(localStorage[keys]));
  }
}

getLocalStorage();

// Document Ready Closing tags
});
