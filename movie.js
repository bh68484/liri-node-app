require("dotenv").config();
var request = require("request");
//Decides which function will be ran.
var action = process.argv[2];
//Used to query either a song or movie title depending on which function is ran.
var query = process.argv[3];

movieThis();
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
