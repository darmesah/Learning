const fs = require("fs");
const chalk = require("chalk");
const { title } = require("process");

// const getNotes = () => {
//   return "Your note is .....";
// };

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse.bold("Note Removed"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse.bold("Note not found"));
  }
};

const listNotes = () => {
  console.log(chalk.green.inverse.bold("Your note is being printed"));
  const notes = loadNotes();
  notes.forEach((note) => {
    console.log(note.title + ": " + note.body);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const noteToLoad = notes.find((note) => note.title === title);

  if (noteToLoad) {
    console.log(
      chalk.green.inverse.bold(noteToLoad.title) + ": " + noteToLoad.body
    );
  } else {
    console.log(chalk.red.inverse.bold("No note found"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
