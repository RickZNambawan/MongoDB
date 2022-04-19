# MongoDB Syntax
## MongoDB Compass ()
## MongoDB Atlas (Cloud Database)

## BASIC COMMANDS
db - to show current database name
show dbs - show all databases
use <dbname> - to create new database or to use it.
show collections - to show all the tables in database
db.createCollection('<collectionName>')
db.dropDatabase() - to delete database

## CREATE
db.<collection>.insertOne({<keyvalue>}) - create one data
db.<collection>.insertMany({<keyvalue>}, {<keyvalue>}) - create more than one data 

## READ
db.<collection>.findOne({<keyvalue>}) - show only the first data with specific field
db.<collection>.find() - show all data in a collection
db.<collection>.find({<keyvalue>}) - to show all data with specific field
db.<collection>.find().sort({<key>: 1}) - sort data by key name (1: ascending, 2: descending)
db.<collection>.find({<keyvalue>}).count() - return the number of data
db.<collection>.find().limit(2) - show data but limit by the number
db.<collection>.find().sort({<key>: 1}).limit(2) - chaining commands
db.<collection>.find().forEach((<variable>) => console.log(<variable>)) - loop all the data
db.<collection>.find({<key>: <value>}, {<key>: 1, <key>: 0}) - show all the data with 1 but not with 0

## UPDATE
db.<collection>.update({<keyvalue>}, {$set: {<key>: <updatedValue>}}) - update specific data
db.<collection>.update({<keyvalue>}, {$inc: {<key>: <number>}}) - increment value of key 
db.<collection>.update({<keyvalue>}, {$rename: {<key>: <updatedKey>}}) - update the key name

## DELETE
db.<collection>.deleteOne({<key>:<valueId>}) - delete data from collection
db.<collection>.deleteMany({<key>:<valueId>}) - delete more than one data from collection

## Adding Sub-Collection
db.<collection>.update({<field>}, {
    $set: {
        <subDocument>: [
            {
                <field>
            }, 
            {
                <field>
            } 
        ] 
    }
})

## Querying Sub-Collection
db.<collection>.find({
    <field>: {
        $elemMatch: {
            <key>: <value> 
        }
    }
})

## Querying Expression
db.<collection>.find({
    <field>: {
        $gt: <number>
    }
})

# Complex Read Modifiers
sort() - Sort the results of a find by the given fields 
limit() - Only return a set number of documents
skip() - Skip a set number of documents from the beginning

## Complex Update Object Operator
$set - Update only the fields passed to $set. This will not affect any fields not passed to $set.
$inc - Increment the value of the field by the amount given
$rename - Rename a field
$unset - Remove a field
$push - Add a value to an array field
$pull - Remove a value from an array field
$$

## Complex Querying Object Operator
$eq - check for equality
$ne - check for not equal
$gt - greater than
$gte - greater than or equal
$lt - less than
$lte - less than or equal
$in - check if the key is in the array
$nin - check if the key is not in the array
$and - check that multiple conditions are all true
$or - check that one of multiple conditions is true
$not - negate the filter inside of $not
$exists - check if a field exists, true and boolean type
$expr - do comparisons between different fields (expression)