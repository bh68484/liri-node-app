// Loading Modules
require("dotenv").config();
var applicationKeys = require("./keys.js");

// decide which function will be ran.
var action = process.argv[2];

function spotify() {
  var Spotify = require("node-spotify-api");

  var spotify = new Spotify(applicationKeys.spotify);
  // Store all of the arguments in an array
  var input = process.argv[3];
  // var nodeArgs = process.argv[3];

  // Loop through all the words in the node argument
  // And do a little for-loop magic to handle the inclusion of "+"s
  for (var i = 4; i < input.length; i++) {
    if (i > 3 && i < input.length) {
      var songSearch = input + input[i];
    } else {
      songSearch += input[i];
    }
  }
  spotify.search({ type: "track", query: input, limit: 3 }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    console.log(songSearch);
    var bandName = data.tracks.items[0].artists[0].name;
    var songName = data.tracks.items[0].name;
    var previewUrl = data.tracks.items[0].preview_url;
    var albumName = data.tracks.items[0].album.name;

    console.log("Artist Name: " + bandName);
    console.log("Track Title: " + songName);
    console.log("Album Title: " + albumName);
    console.log("Preview URL: " + previewUrl);
  });
}
switch (action) {
  case "my-tweets":
    myTweets();
    break;

  case "spotify-this-song":
    spotify(action);
    break;
}
