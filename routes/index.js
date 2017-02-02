var express = require('express');
var router = express.Router();
var request = require('request');

var config = {
    baseUrl: 'http://api.themoviedb.org/3/',
    imageBase: 'http://image.tmdb.org/t/p/w300',
    imageBaseFull: 'http://image.tmdb.org/t/p/original',
    nowPlayingEP: 'movie/now_playing?',
    api_key: '&api_key=fec8b5ab27b292a68294261bb21b04a5',
    bpMovies11: 'discover/movie?with_people=287&primary_release_year=2011&sort_by=vote_average.desc'
};

router.get('/', function(req, res, next) {
    request.get(config.baseUrl + config.nowPlayingEP + config.api_key, (err, response, movieData)=>{
       movieData = JSON.parse(movieData);
       // res.json(movieData);
       res.render('index', {
           movieData: movieData,
           imageUrl: config.imageBase
       })
   })
});

router.get('/search', function(req, res, next){
	res.render('search', {});
});

router.get('/bradpitt', function(req, res, next) {
    request.get(config.baseUrl + config.bpMovies11 + config.api_key, (err, response, movieData)=>{
       movieData = JSON.parse(movieData);
       // res.json(movieData);
       res.render('index', {
           movieData: movieData,
           imageUrl: config.imageBase
       })
   })
});

router.get('/searchMovie', function(req, res, next){
	res.send("Haha, imma get route. Smells like pizza")
	//we sent a an HTTP get request when you submit localhost:3000/searchMovie. That causes a 404 error. As a result, we, we have to do router.get to get the route.
	//both /searchMovie routes are actually different. One is for the get request, one is for the post request. The only way get will work if is browser makes a request.
	//if you go to localhost:3000/searchMovie, it will say: "Haha, imma get route. Smells like pizza".
	//if you go to localhost:3000/search, type in search and submitted, you will end up with a page displaying what you searched for.
})


router.post('/searchMovie', function(req, res, next){
	var searchString = encodeURI(req.body.movieSearch);
	// this route will only apply to a post request
	// res.json(req.body);//Testing route. we have req.body.movieSearch and req.body.actorSearch. We named the input type in search.ejs.
	// test in localhost: 3000/search
	//this is the response we get from the user.
	var queryUrl = config.baseUrl + 'search/movie?' + config.api_key + '&query=' + searchString;
	// res.send(queryUrl);
	request.get(queryUrl, (error, response, searchData)=>{
		//we typed out "error" and "response" here so that it does not overwrite req and res from router.post.
		//this is the response we got from the movie api.
		//need json.parse because we're getting a string
		searchData = JSON.parse(searchData);
		res.render('index', {
			movieData: searchData,
			imageUrl: config.imageBase
		})
	})
});


//No logic in return! Write as much logic as possible in the controller.

module.exports = router;
	

