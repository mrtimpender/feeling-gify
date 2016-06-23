$( document ).ready(function() {
// VARIABLES
var api_key = 'dc6zaTOxFJmzC';
var gifChoices = [];
var results = [];
var today = new Date();
$.datepicker.formatDate( 'm/dd/yy' )

emptyAllOutputs();
$('#recentOutput').hide();


$("#submit").on('click', function(event){
  var search = $("#inputField").val();
  search = search.replace(/\s/g,'+')
  gifChoices = [];

  emptyAllOutputs();
  $('#output').hide();
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
          counter++;
          }
        });
        $('#output').show('blind', 'slow');
      }
    })
});

// EVENT LISTENERS
$(document).on('click', '.todayNav', function(event){
    emptyAllOutputs();
    if (localStorage.getItem(createDate(today)) === null) {
      setDefaultGif();
      alert("You haven't selected a GIF today.");

        $("#recentOutput").append("<div class='today column full centered' id='" + createDate(today) + "'><h5>Today</h5><img class='gif' src='https://media.giphy.com/media/11R5KYi6ZdP8Z2/giphy.gif' /></div>");
    } else {
      var todaysGif = JSON.parse(localStorage.getItem(createDate(today)));
      $("#recentOutput").append("<div class='today column full centered' id='" + createDate(today) + "'><h5>Today</h5><img class='gif' src=" + generateGifLink(todaysGif.id) + " /></div>");
    }
    $('#recentOutput').show('blind', 'slow');
});

$(document).on('click', '.gif', function(event){
  var indexPos = this.id.substring(3);
  $("#recentOutput").append("<h5>Today</h5><img class='gif' id='" + this.id +  "' src=" + generateGifLink(gifChoices[indexPos].id) + " />" );
  $('#recentOutput').show('blind', 'slow');
  localStorage.setItem(createDate(today), JSON.stringify(gifChoices[indexPos]));
  $('#output').empty();
});

$(document).on('click', '.last7', function(event){
  emptyAllOutputs();
  getLastSeven();
});

$(document).on('click', '.mtd', function(event){
  emptyAllOutputs();
  $('#mtdoutput').hide();
  $('#mtdOutput').removeClass('one-half').addClass('full')

  $('#mtdOutput').datepicker({
    dateFormat: "m/d/yy",
    maxDate: 0,
    showAnim: 'blind',
    onSelect: function(date){

      $('#mtdSelection').empty();
      var selected = JSON.parse(localStorage.getItem(date));

      $('#mtdOutput').removeClass('full').addClass('one-half')

      if (selected === null) {
        $("#mtdSelection").append("<h5>You did not select a GIF on " + date + "</h5><img src='https://media.giphy.com/media/11R5KYi6ZdP8Z2/giphy.gif'/>");

      } else {
        $("#mtdSelection").append("<h5>" + date + "</h5><img src=" + generateGifLink(selected.id) + " />" );
        }
        $('#mtdSelection').show('blind', 'slow');
      }
    });
  // $('#mtdOutput').datepicker({ dateFormat: d/mm/yy, minDate: 0, maxDate: 0, });

})



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

function setDefaultGif() {
  $.ajax({
    url: 'http://api.giphy.com/v1/gifs/11R5KYi6ZdP8Z2?api_key=' + api_key,
    success: function (data) {
      var cricketGif = data.data;
      localStorage.setItem(createDate(today), JSON.stringify(cricketGif));
      }
    })
  }


function createDate(d){
    // var d = new Date();
    var aDate = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`
    //${d.getHours()}:${d.getMinutes()}
    return aDate
}

function emptyAllOutputs() {
  $('#last7Output').empty();
  $('#recentOutput').empty();
  $('#output').empty();
  $('#mtdOutput').empty();
  $('#mtdSelection').empty();
  $('#mtdOutput').removeClass('hasDatepicker');
}

function emptyAllOutputsNotMtd() {
  $('#last7Output').empty();
  $('#recentOutput').empty();
  $('#output').empty();
  $('#mtdSelection').empty();
}

function getLastSeven() {
    $('#last7Output').hide();

    // Sets Today with a default GIF, and alerts the user that they haven't picked for today
    if (localStorage.getItem(createDate(today)) === null) {
      alert("You haven't selected a GIF today.");
      setDefaultGif();
    // Proceeds to populate the previous 7 days
      for (var i = 1; i<8; i++){
        var tempDate = new Date();
        tempDate.setDate(tempDate.getDate()-(i))
        var tempItem = localStorage.getItem(createDate(tempDate));
        tempItem = JSON.parse(tempItem);

        $("#last7Output").append("<div class='column one-fourth' id='" + createDate(tempDate) + "'><h5>" + createDate(tempDate) + "</h5><img class='gif' src=" + generateGifLink(tempItem.id) + " /></div>");
      }

      $('#last7Output').show('blind', 'slow');

    } else {
    // Sets Todays GIF with custom header
      var todaysGif = JSON.parse(localStorage.getItem(createDate(today)));
      $("#last7Output").append("<div class='today column one-fourth' id='" + createDate(today) + "'><h5>Today</h5><img class='gif' src=" + generateGifLink(todaysGif.id) + " /></div>");

    // Loops through the last 7 previous days
    for (var i = 1; i<8; i++){
      var tempDate = new Date();
      tempDate.setDate(tempDate.getDate()-(i))
      var tempItem = localStorage.getItem(createDate(tempDate));
      tempItem = JSON.parse(tempItem);

      $("#last7Output").append("<div class='column one-fourth' id='" + createDate(tempDate) + "'><h5>" + createDate(tempDate) + "</h5><img class='gif' src=" + generateGifLink(tempItem.id) + " /></div>");
    }

    $('#last7Output').show('blind', 'slow');
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
