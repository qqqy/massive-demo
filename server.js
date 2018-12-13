const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive')
const connectionString = 'postgres://zxdpqnmcmvllse:0d7091c34124fefe2faeb9b9cdb160b98da590372abe1aee64bd96a5b99110fa@ec2-54-83-197-230.compute-1.amazonaws.com:5432/d2qom1pm1nih91?ssl=true'



const app = express();
app.use(bodyParser.json());

const port = 3000;

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

massive(connectionString).then(connection => {
  app.set('db' , connection)
  app.listen(port, () => {
  console.log('Started server on port', port);
  });
  // console.log(connection)
})
