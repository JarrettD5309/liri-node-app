# Liri Node App
<https://github.com/JarrettD5309/liri-node-app> \
Version 1.0 \
Original Deployment Date - June 17, 2020\
By Jarrett Dougherty

## Description
Liri Node App is a Node.js program which can search and return data from Spotify, Bands In Town, and OMDB using API calls. The commands and returned data can easily be entered and read from a command line terminal. All search commands and returned data will be stored in a `log.txt` file. The app creates a simple way to search for multiple types of entertainment information from a single program.

## Technologies Used
* Javascript
* Node.JS
* Axios
* Dotenv
* Moment
* Node Spotify API

## Instructions For Use
### Getting Started
1. Once you download the program you will need to run the following command to install the required node packages:

```console
$ npm install
```

2. You will also need to get a Spotify ID and Secret from <https://developer.spotify.com/my-applications/#!/>

3. Next, create a file named `.env`, add the following to it, replacing the values with your API keys (no quotes) once you have them:

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

```

### Available Commands
* To search for song information on Spotify use the following command. This example searches for the song 'Sonic Destroyer' by X-101.

```console
$ node liri.js spotify-this-song sonic destroyer
```

* To search for concert listings on Bands In Town use the following command. This example searches for tour dates from the band Garbage.

```console
$ node liri.js concert-this garbage
```

* To search for movie information on OMDB use the following command. This example searches for the film '12 Monkeys'.

```console
$ node liri.js movie-this 12 monkeys
```

* The following special command runs whatever search type is saved in the `random.txt` file.

```console
$ node liri.js do-what-it-says
```

## GIF/Video Example
![liri gif](https://media.giphy.com/media/H42tIKHYBYY6FX6GJb/giphy.gif)

full video example - <https://drive.google.com/file/d/19QNJWasVDs9-Qgs-u-A3gAe2_Uk4ZILS/view?usp=sharing>