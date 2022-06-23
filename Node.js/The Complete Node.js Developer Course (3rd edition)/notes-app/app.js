// const fs = require("fs");
const notes = require("./notes.js");

//Create file and puts texts inside
// fs.writeFileSync("notes.txt", "My name is Alex");

// Append a message to file
// fs.appendFileSync("notes.txt", " I am a student");

// To enable our application manipulate multiple files
// const name = require("./utils.js");
// const name = "Alex";
// console.log(name);

// Impoted module with function to add two numbers
// const impt = require("./utils.js");
// console.log(impt(2, 4));

// Using the validator NPM module
// const validator = require("validator");
// const getNotes = require("./notes.js");
// const msg = getNotes();
// console.log(msg);
// console.log(validator.isURL("https://google.com"));

// Using the chalk NPM module
// const chalk = require("chalk");
// console.log(chalk.green.bgCyan.inverse.bold("Success"));

//Accessing input (Basic)
// console.log(process.argv[2]);

// const command = process.argv[2];

// console.log(process.argv);

// if (command === "add") {
//   console.log("Adding note!");
// } else if (command === "remove") {
//   console.log("Removing note!");
// }

// Using yargs

// const { command, describe } = require("yargs");
const { demandOption } = require("yargs");
const yargs = require("yargs");

// Customize yargs version
yargs.version("1.1.0");

// Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

// Create list command
yargs.command({
  command: "list",
  describe: "List notes",
  handler() {
    notes.listNotes();
  },
});

// Create read command
yargs.command({
  command: "read",
  describe: "Read notes",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

// console.log(process.argv);
// console.log(yargs.argv);
yargs.parse();
