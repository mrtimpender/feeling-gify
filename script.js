$( document ).ready(function() {
// VARIABLES
var api_key = 'dc6zaTOxFJmzC';
var gifChoices = [];
var results = [];
var today = new Date();
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
  // $("#recentOutput").append("<img class='gif' id='" + this.id +  "' src=" + generateGifLink(gifChoices[indexPos].id) + " />" );
  // $('#recentOutput').show('blind', 'slow');
  localStorage.setItem(createDate(today), JSON.stringify(gifChoices[indexPos]));
  console.log(localStorage);
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

function createDate(d){
    // var d = new Date();
    var aDate = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`
    //${d.getHours()}:${d.getMinutes()}
    return aDate
}

function getLastSeven() {
  for (key in localStorage){

  }
}


// var populateCounter = 45;
// Used to originally populate the localStorage with past date content
function createLocalStorageKey(){
  var key = new Date();
  key.setDate(key.getDate()-populateCounter);
  populateCounter--;
  return createDate(key);
}


// Used to clear all the data within the localStorage
function removeAllLocalStorage(){
  for (key in localStorage){
    localStorage.removeItem(key);
  }
}
// removeAllLocalStorage();

// Document Ready Closing tags
});
