/*This is how we insert one document. If the collection does not exist, it will be created for us*/
db.moviesScratch.insertOne({ "title": "Rocky", "year": "1976", "imdb": "tt0075148"});

/*If we don't provide _id, Mongo will create one. Every document has to have a unique _id field*/
db.moviesScratch.insertOne({ "_id": "tt0075148", "title": "Rocky", "year": "1976" });
