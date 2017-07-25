const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/library';
const ObjectId = require('mongodb').ObjectId;

function createBook(req,res) {
    mongoClient.connect(url, (err,db) => {
      if(err) {
        res.send(err)
      } else {
        db.collection('books').insert({
          isbn: req.body.isbn,
          title: req.body.title,
          author: req.body.author,
          category: req.body.category,
          stock: Number(req.body.stock)
        }, (err,book) => {
          if(err) res.status(500).send(err)
          console.log(book);
          res.status(500).send(book)
        })
      }
    })
}

function getAllBooks(req,res) {
  mongoClient.connect(url, (err,db) => {
    if(err) {
      res.send(err)
    } else {
      db.collection('books').find().toArray( (err,result) => {
        if(err) res.status(500).send(err)
        res.status(500).send(result)
      })
    }
  })
}

function getOneBook(req,res) {
  mongoClient.connect(url, (err,db) => {
    if(err) {
      res.send(err)
    } else {
      db.collection('books').find({
        _id: ObjectId(req.params.id)
      }).toArray( (err,book) => {
        if(err) res.status(500).send(err)
        res.status(500).send(book)
      })
    }
  })
}

function deleteBook(req,res) {
  mongoClient.connect(url, (err,db) => {
    if(err) {
      res.status(500).send(err)
    } else {
      db.collection('books').deleteOne({
        _id: ObjectId(req.params.id)
      }, (err,result) => {
        if(err) res.status(500).send(err)
        console.log('Delete Book Success');
        res.status(500).send(result)
      })
    }
  })
}

function updateBook(req, res) {
  mongoClient.connect(url, (err,db) => {
    if(err) {
      res.status(500).send(err)
    } else {
      db.collection('books').update({
        _id: ObjectId(req.params.id)
      },{
          isbn: req.body.isbn,
          title: req.body.title,
          author: req.body.author,
          category: req.body.category,
          stock: Number(req.body.stock)
        },(err,book) => {
        if(err) res.status(500).send(err)
        console.log('Update book success');
        res.status(500).send(book)
      })
    }
  })
}

module.exports = {
  createBook, getAllBooks, getOneBook, updateBook, deleteBook
}
