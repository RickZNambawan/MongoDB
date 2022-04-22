const express = require('express');
const { ObjectId } = require('mongodb');
const { connection, getDatabase } = require('./db');

// init app & 
const app = express();
app.use(express.json());

// db connection && middleware
let db;
connection(err => {
    if(!err) {
        app.listen(3000, () => {
            console.log("App is listening in port 3000!")
        });

        db = getDatabase();
    }
});

/* endpoint-routes */
// CREATE
app.post('/books', (req, res) => {
    const book = req.body;
    db.collection('books')
    .insertOne(book)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(() => res.status(500).json({error: 'Cannot create doc!'}));
});

// READ
app.get('/books', (_req, res) => {
    let books = []
    db.collection('books')
    .find()
    .sort({ author: 1})
    .forEach(book => books.push(book))
    .then(() => {
        res.status(200).json(books);
    }).catch(() => res.status(500).json({error: "Could not fetch documents!"}));
});

app.get('/books/id/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)) {
        db.collection('books')
        .findOne({_id: ObjectId(req.params.id)})
        .then(book => {
            res.status(200).json(book);
        }).catch(() => res.status(500).json({error: 'Could not find the id'}));
    } else {
        res.status(500).json({error: 'Not a valid document id!'});
    }
});

// DELETE
app.delete('/books', (req, res) => {
    const bookId = req.body;
    db.collection('books')
    .deleteOne({_id: ObjectId(bookId._id)})
    .then(book => res.status(200).json(book))
    .catch(() => res.status(500).json({error: 'Could not delete doc'}));
});

// PATCH
app.patch('/books/id/:id', (req, res) => {
    const updates = req.body;
    if(ObjectId.isValid(req.params.id)) {
        db.collection('books')
        .updateOne({
            _id: ObjectId(req.params.id)
        }, {
            $set: updates
        }).then(result => res.status(200).json(result))
        .catch(() => res.status(500).json({error: "Cannot update doc!"}))
    } else {
        res.status(500).json({error: 'Not a valid document id!'});
    }
});


// PAGINATION - if you want to limit the number of documents you want to show by pages
app.get('/books/pages', (req, res) => {
    const currentPage = req.query.page || 0;
    const booksPerPage = 2;

    let books = [];
    db.collection('books')
    .find()
    .sort({ author: 1 })
    .skip(currentPage * booksPerPage)
    .limit(booksPerPage)
    .forEach(book => books.push(book))
    .then(() => {
        res.status(200).json(books);
    })
    .catch(() => {
        res.status(500).json({error: "ERROR!"});
    });
});

// INDEXES
// db.collection('books').createIndexes({rating: 8});
// db.collection('books').getIndexes();
// db.collection('books').findOne({ rating: 8})

// ROUTES END-POINT
// http://localhost:3000/books/ - GET ALL BOOKS

// http://localhost:3000/books/id/<id> - GET BOOK BY ID

// http://localhost:3000/books - ADD BOOK (TYPE IN DOCUMENT IN JSON BODY)

// http://localhost:3000/books - DELETE BOOK (TYPE ID IN JSON BODY)

// http://localhost:3000/books/id/<id> - UPDATE BOOK BY ID (PUT ID IN URL THEN TYPE DOCUMENT IN JSON BODY)

// http://localhost:3000/books/pages/?page=0 - PAGINATION (CHANGE THE NUMBER OF PAGES)