# g29-Q1-project-proposal
# Tim Pender

# Description:
Feeling GiF-y is a daily check-in web app that allows a user to log a Gif of the day. This app is pings the Giphy API based on the the user entered search term and displays a set of results for the user to choose.  Upon selection, the Gif JSON string gets saved within localStorage using the current date as a key.  If no Gif was saved, a temporary Gif is selected and populated within the database.  Users can re-write their selection at anytime during the day.  

The project uses mostly jQuery to populate the DOM with the search results and to search and return date from localStorage.  I initially mapped out how I wanted the site to look and feel on Sketch.  Then I built out the functionality to call and return results from the API.  After populating some custom content within the localStaorage, I continued to build a past date side and a calendar using jQuery UI's date picker.  I love GIfs, and I built the site as a nice clean way of showcasing that as well as my front end skills.


# Technologies:
- HTML
- CSS
- JS / jQuery
- APIs

# MVP:
Users are able to query the Giphy server and return a selection of GIFs.  Users select Gifs and it presents that one.  

# Nice to Have:
- Weekly Storage
- Monthly Storage
- Different logins for different users
