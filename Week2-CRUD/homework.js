//1. Which of the choices below is the title of a movie from the year 2013 that is rated PG-13 and won no awards? Please query the video.movieDetails collection to find the answer.

db.movieDetails.find({"year": 2013, "rated": "PG-13", "awards.wins": 0})

//2. Using the video.movieDetails collection, which of the queries below would produce output documents that resemble the following. Check all that apply.
/*
{ "title" : "P.S. I Love You" }
{ "title" : "Love Actually" }
{ "title" : "Shakespeare in Love" }
*/

db.movieDetails.find({/*search criteria*/}, {title: 1, _id: 0})

//3.Using the video.movieDetails collection, how many movies list "Sweden" second in the the list of countries.

db.movieDetails.find({"countries.1": "Sweden" }).count()