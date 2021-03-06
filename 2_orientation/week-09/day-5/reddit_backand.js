'use strict';

const express = require('express');
const mysql = require('mysql');

const app = express();
let post = 8080;

app.use(express.json());

let conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootSql',
  database: 'reddit'
});

conn.connect(function(err){
  if (err){
    console.log('Error connecting to DB');
    return;
  }
  console.log('Connected to DB')
});

// app.use('C:\Users\K\Desktop\greenfox\tamaskamaras\JS\week-08\day-4-5', express.static('day-4-5'));
// res.sendFile('C:\Users\K\Desktop\greenfox\tamaskamaras\JS\week-08\day-4-5\reddit.html');

app.use(express.static('frontend_reddit'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/frontend_reddit/reddit.html');
});

app.get('/posts', function(req, res) {
  conn.query('SELECT * FROM posts;', function(err, rows) {
    if (err) {
      console.log(err.toString());
      res.status(500).send('Database error');
      return;
    }
    res.send(JSON.stringify(rows));
  });
});

app.post('/posts', function(req, res) {
  conn.query('INSERT INTO posts (title, url, timestamp, score) VALUES("' +
  req.body.title + '", "' + req.body.url + '", "' + parseInt(Date.now()) + '", "' + 0 + '");', function(err, rows) {
    if (err) {
      console.log(err.toString());
      res.status(500).send('Database error, post');
      return;
    };
    res.json({message: 'OK',});
  });
}); 
// conn.end();

app.delete('/posts/:id', function(req, res) {
  conn.query('DELETE FROM posts WHERE id = "' + req.params.id + '";', function(err, rows) {
    if (err) {
      console.log(err.toString());
      res.status(500).send('Database error, delete');
      return;
    }
    res.send(JSON.stringify(rows));
  });
});

app.put('/posts/:id/upvote', function(req, res) {
  conn.query('UPDATE posts SET score = score + 1 WHERE id = ' + req.params.id + ';', function(err, rows) {
    if (err) {
      console.log(err.toString());
      res.status(500).send('Darabase error, update');
      return;
    }
    conn.query('SELECT * FROM posts WHERE id = ' + req.params.id + ';', function(err2, rows2) {
      if (err) {
        console.log(err.toString());
        res.status(500).send('Database error, request score data')
        return;
      }
      res.send(JSON.stringify(rows2[0]));
    })
  })
})

app.put('/posts/:id/downvote', function(req, res) {
  conn.query('UPDATE posts SET score = score - 1 WHERE id = ' + req.params.id + ';', function(err, rows) {
    if (err) {
      console.log(err.toString());
      res.status(500).send('Darabase error, update');
      return;
    }
    conn.query('SELECT * FROM posts WHERE id = ' + req.params.id + ';', function(err2, rows2) {
      if (err) {
        console.log(err.toString());
        res.status(500).send('Database error, request score data')
        return;
      }
      res.send(JSON.stringify(rows2[0]));
    })
  })
})

app.listen(post, function() {
  console.log('App is listening on ' + post);
});
