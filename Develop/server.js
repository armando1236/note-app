const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require("./db/db.json")
const uuid = require("uuid");
const { networkInterfaces } = require('os');

const PORT = process.env.PORT || 3001;

const app = express();



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static middleware
app.use(express.static('./public'));
app.use(express.json());

app.get("api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'))
});

// POST Route 
app.post("api/notes", (req, res) => {
  const newNotes = req.body;
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  // fs.readFileAsync("./develop/db/db.json", "utf8").then(function(data){
    // note.id = notes.length +1
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    // return notes
    // }).then(function(notes){
      fs.writeFileSync("./db/db.json", JSON.stringify(notes))
      res.json(notes);
    });
    // const { title, text } = req.body;
    
    // if (req.body) {
      //   const newNote = {
        //     title,
        //     text,
        //   };
        
        //   readAndAppend(newTip, './db/db.json');
        //   res.json(`Note added! 🚀`);
        // } else {
          //   res.error('Error in adding tip');
          // }
          // });
          
          // GET Route for homepage
          app.get('/', (req, res) =>
          res.sendFile(path.join(__dirname, '/public/index.html'))
          );
          
          // GET Route for feedback page
          app.get('/notes', (req, res) =>
          res.sendFile(path.join(__dirname, '/public/notes.html'))
          );
      
          app.listen(PORT, () =>
          console.log(`App listening at http://localhost:${PORT} 🚀`)
          );