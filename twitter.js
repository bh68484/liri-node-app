// Loading Modules
require("dotenv").config();
var applicationKeys = require("./keys.js");
var request = require("request");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");

//Decides which function will be ran.
var action = process.argv[2];
//Used to query either a song or movie title depending on which function is ran.
var query = process.argv[3];
myTweets();
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
      console.log("Last 20 tweets");
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
      }
    }
  });
}
