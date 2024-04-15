const { NlpManager } = require("node-nlp");
const express = require("express");

const manager = new NlpManager({ languages: ["en"] });

const app = express();

// Add training data
manager.addDocument("en", "hello", "greeting");
manager.addDocument("en", "hi", "greeting");
manager.addDocument("en", "yo", "greeting");
manager.addDocument("en", "sup", "greeting");
manager.addDocument("en", "k cha", "greeting");
manager.addDocument("en", "hey you", "greeting");
manager.addDocument("en", "konnnichwa", "greeting");
manager.addDocument("en", "good morning", "greeting");
manager.addDocument("en", "good evening", "greeting");
manager.addDocument("en", "good day", "greeting");

manager.addAnswer("en", "greeting", "hey");
manager.addAnswer("en", "greeting", "hey there");
manager.addAnswer("en", "greeting", "hey! how can i help you");
manager.addAnswer("en", "greeting", "yo whatsUp");

// Train the model and process a message
manager.train().then(async () => {
  manager.save();
  app.get("/bot", async (req, res) => {
    let response = await manager.process("en", "hello sir");
    console.log(response);
  });
});

app.listen(3000);
