$( document ).ready(function() {

var api_key = 'dc6zaTOxFJmzC';


$("#submit").on('click', function(event){
  var search = $("#inputField").val();

  $("#output").html("");
  event.preventDefault();

  $.ajax({
    url: 'http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=' + api_key,
    success: function (data) {
      var results = data.data;
      console.log(results);
      console.log(results.length);

      

      results.forEach(function(gif){
          $("#output").append("<iframe src=" + gif.embed_url + "/>" );
        });

      }
    })

});




// Document Ready Closing tags
});
