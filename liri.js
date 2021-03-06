// Loading Modules
require("dotenv").config();
var applicationKeys = require("./keys.js");
var request = require("request");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var moment = require("moment");

//Decides which function will be ran.
var action = process.argv[2];
//Used to query either a song or movie title depending on which function is ran.
var query = process.argv[3];
console.log(
  "*****Please type node liri 'help' for instructions on how to use*****" +
    "\r\n"
);
//Switch-case statement
//The switch-case will direct which function gets run.
switch (action) {
  case "my-tweets":
    myTweets();
    break;

  case "spotify-this-song":
    spotify(action);
    break;

  case "movie-this":
    movieThis(action);
    break;

  case "do-what-it-says":
    doWhatItSays(action);
    break;
  case "help":
    help(action);
    break;
}

//My-tweets Function
function myTweets() {
  var client = new twitter(applicationKeys.twitter);
  var params = {
    screen_name: "trophy_ghost",
    count: 20
  };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      console.log("----------Last 20 tweets----------");
      fs.appendFileSync(
        "log.txt",
        "\r\n" + "----------Last 20 Tweets----------"
      );
      err => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      };
      for (var i = 0; i < tweets.length; i++) {
        var tweetTime = moment(
          tweets[i].created_at,
          "'ddd MMM DD HH:mm:ss Z YYYY'"
        );
        console.log(
          "Don @trophy_ghost - " +
            tweets[i].text +
            " " +
            tweetTime.format("llll") +
            "\r\n"
        );

        fs.appendFileSync(
          "log.txt",
          "\r\n" +
            "\r\n" +
            "Don @trophy_ghost - " +
            tweets[i].text +
            " " +
            tweetTime.format("llll") +
            "\r\n"
        );
        err => {
          if (err) throw err;
          console.log('The "data to append" was appended to file!');
        };
      }
    }
  });
}

//Spotify-this Function
function spotify() {
  var spotify = new Spotify(applicationKeys.spotify);
  var input = process.argv[3];
  if (input === undefined) {
    input = "The Sign Ace of Base";
  }
  params = input;
  spotify.search({ type: "track", query: params, limit: 20 }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    var bandName = data.tracks.items[0].artists[0].name;
    var songName = data.tracks.items[0].name;
    var previewUrl = data.tracks.items[0].preview_url;
    var albumName = data.tracks.items[0].album.name;

    console.log("Artist Name: " + bandName);
    console.log("Track Title: " + songName);
    console.log("Album Title: " + albumName);
    console.log("Preview URL: " + previewUrl + "\r\n");
    fs.appendFileSync(
      "log.txt",
      "\r\n" +
        "----------Spotify Results----------" +
        "\r\n" +
        "Artist Name: " +
        bandName +
        "\r\n" +
        "Track Title: " +
        songName +
        "\r\n" +
        "Album Title: " +
        albumName +
        "\r\n" +
        "Preview URL: " +
        previewUrl +
        "\r\n"
    );
    err => {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    };
  });
}

//Movie-this Function
function movieThis() {
  if (query === undefined) {
    query = "Mr. Nobody";
  }
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
  var queryUrl = "http://www.omdbapi.com/?t=" + query + "&apikey=trilogy";

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
      console.log("Actors: " + JSON.parse(body).Actors + "\r\n");
      fs.appendFile(
        "log.txt",
        "\r\n" +
          "----------Movie Details----------" +
          "\r\n" +
          "Title: " +
          JSON.parse(body).Title +
          "\r\n" +
          "Release Year: " +
          JSON.parse(body).Year +
          "\r\n" +
          "IMDB Rating: " +
          JSON.parse(body).Ratings[0].Value +
          "\r\n" +
          "Rotten Tomatoes Rating: " +
          JSON.parse(body).Ratings[1].Value +
          "\r\n" +
          "Release Country: " +
          JSON.parse(body).Country +
          "\r\n" +
          "Language: " +
          JSON.parse(body).Language +
          "\r\n" +
          "Plot: " +
          JSON.parse(body).Plot +
          "\r\n" +
          "Actors: " +
          JSON.parse(body).Actors +
          "\r\n",

        err => {
          if (err) throw err;
          console.log('The "data to append" was appended to log.txt!');
        }
      );
    }
  });
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (!error) {
      results = data.split(",");
      spotify((process.argv[3] = results[1]));
    } else {
      console.log("Error occurred" + error);
    }
  });
}
function help() {
  console.log();
  ("To use liri, the user will need to initialize the app by typing 'node liri' in the command line followed by a specific parameter to choose what you want it to do.");
  console.log("*****Console commands*****" + "\r\n");
  console.log(
    "'my-tweets' - Displays the last twenty tweets from Twitter and saves them to log.txt" +
      "\r\n"
  );
  console.log(
    "spotify-this-song '<song name>' - Displays song information about that specific song from Spotify and saves it to log.txt.  If no song is chosen, the program will default to the song 'The Sign' by Ace of Base." +
      "\r\n"
  );
  console.log(
    "movie-this '<movie-title>' - Displays movie information about the specific movie from the Open Movie Database and saves it to log.txt.  If no movie is selected, the program will default to the movie Mr. Nobody, display the results, and save the information to log.txt." +
      "\r\n"
  );
  console.log(
    "do-what-it-says - Reads file random.txt and will run the spotify command function automatically and displays the information.  The information will be saved to log.txt "
  );
}
