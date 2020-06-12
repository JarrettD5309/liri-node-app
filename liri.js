require("dotenv").config();

var axios = require("axios");

var keys = require("./keys.js");

var moment = require('moment');

var Spotify = require('node-spotify-api');

var fs = require("fs");

var action = process.argv[2];

var input = process.argv[3];

for (var i = 4; i < process.argv.length; i++) {
    input = input + "+" + process.argv[i];
}

function movieSearch(movieName) {

    if (movieName === undefined) {
        movieName = "Mr.+Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {

            console.log("\nTitle: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Cast: " + response.data.Actors);

        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function bandsSearch(bandName) {

    var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (response) {

            for (var i = 0; i < response.data.length; i++) {

                console.log("\nArtist: " + response.data[i].lineup[0]);
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.location);
                console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                console.log("---------------");

            };

        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}

function spotifySearch(songName) {

    if (songName === undefined) {
        songName = "The+Sign";
    }

    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    spotify
        .search({ type: 'track', query: songName })
        .then(function (response) {
            console.log(`\nArtist: ${response.tracks.items[0].album.artists[0].name}`);
            console.log(`Song Title: ${response.tracks.items[0].name}`);
            console.log(`Song Link: ${response.tracks.items[0].external_urls.spotify}`);
            console.log(`Album Title: ${response.tracks.items[0].album.name}`);

            var spotArtist = `Artist: ${response.tracks.items[0].album.artists[0].name}\r\n`;
            var spotSong = `Song Title: ${response.tracks.items[0].name}\r\n`;
            var spotLink = `Song Link: ${response.tracks.items[0].external_urls.spotify}\r\n`;
            var spotAlbum = `Album Title: ${response.tracks.items[0].album.name}\r\n`;

            var spotAction = `Command: ${action}\r\n`;

            var text = spotAction + spotArtist + spotSong + spotLink + spotAlbum + "----------------\r\n";

            fs.appendFile("log.txt", text, function(err) {

                // If an error was experienced we will log it.
                if (err) {
                  console.log(err);
                }
              
                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                  console.log("Command and Data Logged");
                }
              
            });
        })
        .catch(function (err) {
            console.log(err);
        });

}

function randomSearch() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var randomArr = data.split(",");

        action = randomArr[0];

        var noQuotes = randomArr[1].replace(/"/g,'')

        var noQuotesArr = noQuotes.split(" ");

        input = noQuotesArr[0];

        for (var i = 1; i < noQuotesArr.length; i++) {
            input = input + "+" + noQuotesArr[i];
        }

        switch (action) {
            case "movie-this":
                movieSearch(input);
                break;

            case "concert-this":
                bandsSearch(input);
                break;

            case "spotify-this-song":
                spotifySearch(input);
                break;
        }
    })
}


switch (action) {
    case "movie-this":
        movieSearch(input);
        break;

    case "concert-this":
        bandsSearch(input);
        break;

    case "spotify-this-song":
        spotifySearch(input);
        break;

    case "do-what-it-says":
        randomSearch();
        break;
}