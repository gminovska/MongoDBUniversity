var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


MongoClient.connect('mongodb://localhost:27017/crunchbase', function(err, db) {

    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");

    var query = {"category_code": "biotech"};
    /*Find returns a cursor, so at this point, no data has been retrieved from the database. If we call the toArray() all the data will be loaded into memory and stored in array. This way we are not soring all of it in memory, we are streaming the data, it comes back into batches and it is not blocking the execution for a long time, like toArray() is.*/
    var cursor = db.collection('companies').find(query);
    /*This forEach method is not the same as the array's forEach!!*/
    cursor.forEach(
        function(doc) {
            console.log( doc.name + " is a " + doc.category_code + " company." );
        },
        function(err) {
            assert.equal(err, null);
            return db.close();
        }
    );

});
