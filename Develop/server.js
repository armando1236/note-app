const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require("./db/db.json")

const PORT = process.env.PORT || 3001;

const app = express();



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

// POST Route for a new UX/UI tip
app.post("/notes", (req, res) => {
  const note = req.body;
readFileAsync("./develop/db/db.json", "utf8").then(function(data){
  const notes = [].concat(JSON.parse(data));
  note.id = notes.length +1
  notes.push(note);
  return notes
}).then(function(notes){
  fs.writeFileSync("./develop/db/db.json",JSON.stringify(notes))
  res.json(note);
})
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
    };

    readAndAppend(newTip, './db/db.json');
    res.json(`Note added! 🚀`);
  } else {
    res.error('Error in adding tip');
  }
});