const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive')
require("dotenv").config();

const {CONNECTION_STRING, PORT} = process.env


const app = express();
app.use(bodyParser.json());

// DEM DAT STUDY //

app.get('/', (req, res) => {
  const db = req.app.get('db')
  
  db.getAllInjuries().then(injuries => {
    res.send(injuries);
    
  })
});

app.get('/incidents', (req, res) => {
  const db = req.app.get('db')
  const state = req.query.state;
  if (state) {
    db.getIncidentsByState({state: state}).then(incidents => {
      res.send(incidents)
    })
  } else {  db.getAllIncidents().then(incidents => {
    res.send(incidents);}

)}
});

app.post('/incidents', (req, res) => {
  const incident = req.body;
  const db = req.app.get('db')
  db.postNewIncident(incident).then(result => {

    res.send(result[0]);
  }).catch(err => {res.status(400).send(err.message)})
});

massive(CONNECTION_STRING).then(connection => {
  app.set('db' , connection)
  app.listen(PORT, () => {
  console.log('Started server on port', PORT);
  });
  // console.log(connection)
})
