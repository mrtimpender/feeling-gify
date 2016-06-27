$(document).ready(function() {
    // VARIABLES & DEFAULTS
    var api_key = 'dc6zaTOxFJmzC';
    var gifChoices = [];
    var results = [];
    var today = new Date();
    $.datepicker.formatDate('m/dd/yy')


    // EVENT LISTENERS
    // INPUT / SEARCH
    $("#submit").on('click', function(event) {
        var search = $("#inputField").val();
        search = search.replace(/\s/g, '+')
        gifChoices = [];

        emptyAllOutputs();
        $('#output').hide();
        event.preventDefault();

        $.ajax({
            url: 'http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=' + api_key,
            success: function(data) {
                var temp = data.data;
                var counter = 0;

                results = shuffleArray(temp);

                temp.forEach(function(gif) {
                    if (counter < 4) {
                        gifChoices.push(gif);
                        var id = gif.id;
                        $("#output").append("<div class='column one-fourth'><img class='gif' id='gif" + counter + "' src=" + generateGifLink(id) + " /></div>");
                        counter++;
                    }
                });
                $('#output').show('blind', 'slow');
            }
        })
    });

    // TODAY'S NAV
    $(document).on('click', '.todayNav', function(event) {
        emptyAllOutputs();
        $('#recentOutput').hide();
        var todaysGif = JSON.parse(localStorage.getItem(createDate(today)));
        if (localStorage.getItem(createDate(today)) === null) {
            setDefaultGif();
            $("#recentOutput").append("<div class='today column full centered' id='" + createDate(today) + "'><h3>Today</h3><img class='gif' src='https://media.giphy.com/media/11R5KYi6ZdP8Z2/giphy.gif' /><null-subheader>You did not select a GIF.</null-subheader></div>");
        } else if (todaysGif.id === "11R5KYi6ZdP8Z2") {
            $("#recentOutput").append("<div class='today column full centered' id='" + createDate(today) + "'><h3>Today</h3><img class='gif' src='https://media.giphy.com/media/11R5KYi6ZdP8Z2/giphy.gif' /><null-subheader>You did not select a GIF.</null-subheader></div>");
        } else {
            $("#recentOutput").append("<div class='today column full centered' id='" + createDate(today) + "'><h3>Today</h3><img class='gif' src=" + generateGifLink(todaysGif.id) + " /></div>");
        }
        $('#recentOutput').show('blind', 'slow');
    });

    // SELECTING TODAY'S GIF
    $(document).on('click', '.gif', function(event) {
        emptyAllOutputs();
        $("#recentOutput").hide();
        var indexPos = this.id.substring(3);
        $("#recentOutput").append("<div class='column full'><h3>Today</h3><img src=" + generateGifLink(gifChoices[indexPos].id) + " /></div>");
        $('#recentOutput').show('blind', 'slow');
        localStorage.setItem(createDate(today), JSON.stringify(gifChoices[indexPos]));
    });

    // LAST SEVEN DAYS NAV
    $(document).on('click', '.lastSevenNav', function(event) {
        emptyAllOutputs();
        getLastSeven();
    });

    // PAST GIFS & CALENDAR
    $(document).on('click', '.calendarNav', function(event) {
        emptyAllOutputs();
        $('#calendarOutput').hide();
        $('#calendarSelection').hide();
        $('#calendarOutput').removeClass('right').addClass('centered')
        $('#calendarOutput').removeClass('one-half').addClass('full')

        $('#calendarOutput').datepicker({
            dateFormat: "m/d/yy",
            maxDate: 0,
            onSelect: function(date) {
                $('#calendarOutput').removeClass('centered').addClass('right');
                $('#calendarOutput').removeClass('full').addClass('one-half');
                $('#calendarSelection').empty();
                $('#calendarSelection').hide();
                var selected = JSON.parse(localStorage.getItem(date));



                if (selected === null) {
                    $("#calendarSelection").append("<h3>" + date + "</h3><img src='https://media.giphy.com/media/11R5KYi6ZdP8Z2/giphy.gif'/><null-subheader>You did not select a GIF.</null-subheader>");
                } else if (selected.id === "11R5KYi6ZdP8Z2") {
                    $("#calendarSelection").append("<h3>" + date + "</h3><img src='https://media.giphy.com/media/11R5KYi6ZdP8Z2/giphy.gif' /><null-subheader>You did not select a GIF.</null-subheader>");
                } else {
                    $("#calendarSelection").append("<h3>" + date + "</h3><img src=" + generateGifLink(selected.id) + " />");
                }
                $('#calendarSelection').show('blind', 'slow');
            }
        });
        $('#calendarOutput').show('blind', 'slow');
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
            success: function(data) {
                var cricketGif = data.data;
                localStorage.setItem(createDate(today), JSON.stringify(cricketGif));


                console.log(cricketGif);
            }
        })
    }

    function createDate(d) {
        var aDate = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`
        return aDate
    }

    function emptyAllOutputs() {
        $('#last7Output').empty();
        $('#recentOutput').empty();
        $('#output').empty();
        $('#calendarOutput').empty();
        $('#calendarSelection').empty();
        $('#calendarOutput').removeClass('hasDatepicker');
    }

    function emptyAllOutputsNotcalendar() {
        $('#last7Output').empty();
        $('#recentOutput').empty();
        $('#output').empty();
        $('#calendarSelection').empty();
    }

    function getLastSeven() {
        $('#last7Output').hide();

        // Sets Today with a default GIF
        if (localStorage.getItem(createDate(today)) === null) {
            setDefaultGif();

            // Proceeds to populate the previous 7 days
            for (var i = 1; i < 8; i++) {
                var tempDate = new Date();

                tempDate.setDate(tempDate.getDate() - (i))
                var tempItem = localStorage.getItem(createDate(tempDate));
                tempItem = JSON.parse(tempItem);

                $("#last7Output").append("<div class='column one-fourth' id='" + createDate(tempDate) + "'><h3>" + createDate(tempDate) + "</h3><img class='gif' src=" + generateGifLink(tempItem.id) + " /></div>");
            }

            $('#last7Output').show('blind', 'slow');

        } else {
            // Sets Todays GIF with custom header
            var todaysGif = JSON.parse(localStorage.getItem(createDate(today)));
            $("#last7Output").append("<div class='today column one-fourth' id='" + createDate(today) + "'><h3>Today</h3><img class='gif' src=" + generateGifLink(todaysGif.id) + " /></div>");

            // Loops through the last 7 previous days
            for (var i = 1; i < 8; i++) {
                var tempDate = new Date();
                tempDate.setDate(tempDate.getDate() - (i))
                var tempItem = localStorage.getItem(createDate(tempDate));
                tempItem = JSON.parse(tempItem);

                $("#last7Output").append("<div class='column one-fourth' id='" + createDate(tempDate) + "'><h3>" + createDate(tempDate) + "</h3><img class='gif' src=" + generateGifLink(tempItem.id) + " /></div>");
            }

            $('#last7Output').show('blind', 'slow');
        }
    }


    // var populateCounter = 45;
    // Used to originally populate the localStorage with past date content
    function createLocalStorageKey() {
        var key = new Date();
        key.setDate(key.getDate() - populateCounter);
        populateCounter--;
        return createDate(key);
    }


    // Used to clear all the data within the localStorage
    function removeAllLocalStorage() {
        for (key in localStorage) {
            localStorage.removeItem(key);
        }
    }

    // removeAllLocalStorage();

    // Document Ready Closing tags
});
