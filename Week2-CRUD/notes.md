#### This week's topic is CRUD: Create, Read, Update and Delete operations

Main ways to create documents in Mongo are:
1. insertOne()

If the collection does not exist it will be created with this command.

If we don't provide an _id, MongoDb will create on for us.

2. insertMany()
    - ordered
    - unordered

The first argument is an array of docs we want inserted. If we do not specify a second argument, the default is an *ordered* insert, which means if there is an error, Mongo will stop inserting docs. If we want it to continue inserting docs past the error point, we can provide a second argument to the function (see insertMany-unordered)

3. Update inserts (upserts)

To see all the docs in a collection nicely formatted: `db.moviesScratch.find().pretty()`
<hr/>

### Equality matches on scalar values and embedded documents
The first argument to the find({"year": "1976"}) is called **query document** 

For nested(embedded) documents we use the dot notation: `db.movieDetails.find({"tomato.meter": 100})`. When we use the dot notation, the keys **have to** have quotes. For regular keys,the quotes are not necessary in some clients such as the shell. So would work: `db.movieDetails.find({rated: "PG-13"})` just as `db.movieDetails.find({"rated": "PG-13"})`

### Equality matches on arrays

* On the entire array
If we want to match the entire array, we put the [] brackets in the query document: `db.movieDetails.find("writers": ["Ethan Coen", "Joel Coen"])`. This will find only the exact matches, with the exact order of elements. If the names of the writers are switched, it will return that as a match.
* Based on any element
We just omit the [] brackets: `db.movieDetails.find("actors": "Jeff Bridges")`. It is just like the syntax for scalar values.
* Based on a specific element
If we are interested in result appearing in a specific position in the array, we use the index with a dot notation:
`db.movieDetails.find("actors.0": "Jeff Bridges")`
This will return the documents where this actor is the first in the array of actors.
* More complex matches using operators (discussed in another lesson)

### Cursors
The find() function returns a cursor. If we don't assign the query result to a variable, mongo shell automatically iterates through the cursor up to 20 times to print an initial set of results. In general, mongoDB returns the result in baches. The first batch has 101 document, or just enough docs to exceed 1MB. Subsequent baches will be 4MB. We iterate through baches by typing `it` in the shell.

We can get more functionality if we assign the find() results to a variable:

    var a = db.movieDetails.find()
    var doc = function() {return a.hasNext()? a.next():null} 
    a.objLeftInBatch()
### Projection
Reducing the size of the returned query by limiting the fields returned. Projections are provided as the second argument of the find():
`db.movieDetails.find({"year": "1976"}, {title: 1, _id: 0})`. 1 means include field, 0 exclude field. The id field is always returned by default, if we don't want it, we have to explicitly exclude it.
<hr/>

### [Comparison operators](https://docs.mongodb.com/manual/reference/operator/query-comparison/)

* The `ne` operator returns not only docs that do hot have the specified value for a field, but also docs that do not have that field at all