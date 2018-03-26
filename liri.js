// Loading Modules
require("dotenv").config();
var applicationKeys = require("./keys.js");
var request = require("request");
var twitter = require("twitter");

// decide which function will be ran.
var action = process.argv[2];
var input = process.argv[3];

function spotify() {
  var Spotify = require("node-spotify-api");

  var spotify = new Spotify(applicationKeys.spotify);

  spotify.search({ type: "track", query: "all the small things" }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log(data);
  });
}

//Twitter
var client = new twitter(applicationKeys.twitter);

function myTweets() {
  var params = { screen_name: "trophy_ghost" };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      console.log("Last 20 tweets");
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
      }
    }
  });
}

// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch (action) {
  case "my-tweets":
    myTweets();
    break;

  case "spotify-this-song":
    spotify();
    break;

  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
}

//Movie this Function
function movieThis() {
  // Store all of the arguments in an array
  var nodeArgs = process.argv;

  // Loop through all the words in the node argument
  // And do a little for-loop magic to handle the inclusion of "+"s
  for (var i = 4; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      input = input + "+" + nodeArgs[i];
    } else {
      input += nodeArgs[i];
    }
  }
  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + input + "&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  // console.log(queryUrl);

  request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
      console.log(
        "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value
      );
      console.log("Release Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
}
