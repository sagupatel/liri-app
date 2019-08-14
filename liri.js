require("dotenv").config();
var keys = require("./keys.js");
var spotify = require("node-spotify-api");
var spotify = new spotify (keys.spotify);
var inquirer = require("inquirer");
var moment = require("moment");
moment().format();
var fs = require("fs");
var axios = require("axios");


var userInput = process.argv;
var inputOption = process.argv[2];

switch(inputOption) {
    case "concert-this": 
    artistInfo();
    break;

    case "spotify-this": 
    songInfo();
    break;
    
    case "movie-this": 
    movieInfo();
    break;

    case "do-something": 
    doSomething();
    break;
};

function artistInfo (){
    var artist = "";
    for (var i = 3; i < userInput.length; i++){
        if (i > 3 && i < userInput.length){
            artist = artist + "+" + userInput[i];
        }
        else{
            artist += userInput[i];
        }
    };

var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

axios.get(queryUrl).then(function(response)
 {
    console.log(artist + " is performing at " + response.data[0].venue.name);
    console.log("In " + response.data[0].venue.city + ", " + response.data[0].venue.region);
    console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));
    });
}

function songInfo(){
    var song = "";
    for (var i = 5; i < userInput.length; i++){
        if (i > 5 && i < userInput.length){
            song = song + "+" + userInput[i];
        }
        else{
            song += userInput[i];
        }

    };
    spotify.request("https://api.spotify.com/v1/search?q=" + song + "&type=track%2Cartist&market=US&limit=10&offset=5", function(error, response) {
            if (error){
                return console.log(error);
            }
            console.log("Artist: " + response.tracks.items[0].artists[0].name);
            console.log("Song: " + response.tracks.items[0].name);
            console.log("Album: " + response.tracks.items[0].album.name);
        });
       
}

function movieInfo(){
    var movie = "";
    for (var i = 3; i < userInput.length; i++){
        if (i > 3 && i < userInput.length){
            movie = movie + "+" + userInput[i];
        }
        else{
            movie += userInput[i];
        }
    };
    axios
    .get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {  
              console.log(response.data.Title);
              console.log(response.data.Year);
              console.log(response.data.imdbRating);
              console.log(response.data.Plot);
              console.log(response.data.Actors);  
          });
  };  

function doWhatInfo(){

function doSomething(){
          console.log("something");
      }
