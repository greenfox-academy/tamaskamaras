'use strict';

const express = require('express');
const mysql = require('mysql');
const app = express();
let PORT = 8080;
const HOST = '0.0.0.0';

app.use(express.json());
app.use(express.static(__dirname));

let conn = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
  port: process.env.RDS_PORT
})

conn.connect(function(err){
  if (err){
    console.log('Error connecting to DB');
    console.log(err)
    return;
  }
  console.log('Connected to DB')
})

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
} );

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/space.html');
})

app.get('/planets', function(req, res) {
  let select = `SELECT * FROM planet`;
  connQuery(res, select);
})

app.get('/ship', function(req, res) {
  let select = `SELECT * FROM spaceship`;
  connQuery(res, select);
})

app.put('/movehere', function(req, res) {
  let select = `UPDATE spaceship SET planet =
    (SELECT name FROM planet WHERE id = ${req.query.planet_id}) WHERE id = 1;`;
  conn.query(select, function(err, rows) {
    if (err) {
      console.log(err.toString());
      res.status(500).send('Database error, post');
      return;
    };
    res.json({message: 'OK',});
  })
})

app.put('/toship', function(request, response) {
  let select = `SELECT max_capacity, utilization, population FROM spaceship, planet
    WHERE spaceship.id = 1 AND planet.id = ${request.query.planet_id};`;
  conn.query(select, function(selectError, selectRows) {
    if (selectError) {
      console.log(selectError.toString());
      response.status(500).send('Database error');
      return;
    }
    let update = validationToShip(selectRows, request.query.planet_id);
    conn.query(update, function(updateError, rows) {
      if (updateError) {
        console.log(updateError.toString());
        response.status(500).send('Database error, update');
        return;
      };
      response.json({message: 'OK',});
    })
  })
})

function validationToShip(rows, planet_id) {
  let update = `UPDATE spaceship, planet SET spaceship.utilization = spaceship.utilization + `;
  let freeSeats = rows[0].max_capacity - rows[0].utilization;
  if (freeSeats > 0 && rows[0].population > freeSeats) {
    update += `${freeSeats}, planet.population = planet.population - ${freeSeats}
      WHERE spaceship.id = 1 AND planet.id = ${planet_id};`;
    return update;
    } else if (freeSeats > 0 && rows[0].population < freeSeats) {
    update += `planet.population, planet.population = 0 WHERE spaceship.id = 1 AND planet.id = ${planet_id};`;
    return update;
  }
}

app.put('/toplanet', function(request, response) {
  let update = `UPDATE planet SET planet.population = planet.population +
    (SELECT utilization FROM spaceship WHERE id = 1)
      WHERE planet.id = ${request.query.planet_id};`
  conn.query(update, function(err, rows) {
    if (err) {
      console.log(err.toString());
      response.status(500).send('Database error, post');
      return;
    };
  })
  conn.query(`UPDATE spaceship SET utilization = 0 WHERE id = 1;`, function(shipError, shipRows) {
    if (shipError) {
      console.log(shipError.toString());
      response.status(500).send('Database error, post');
      return;
    };
    response.json({message: 'OK',});
  })
})

function connQuery(response, select) {
  conn.query(select, function(err, rows) {
    if (err) {
      console.log(err.toString());
      response.status(500).send('Database error');
      return;
    }
    response.json(rows);
  })
}
