const { NlpManager } = require("node-nlp");
const data = require("./conversation_data.json"); // Update with the correct path

function setupNlpManager() {
  const manager = new NlpManager({ languages: ["id"], forceNER: true });

  // Add intents and responses from your JSON data
  data.intents.forEach((intent) => {
    manager.addDocument("id", intent.input, intent.output);
  });

  // Train also the NLG
  Object.keys(data.responses).forEach((output) => {
    const responses = Array.isArray(data.responses[output])
      ? data.responses[output]
      : [data.responses[output]];
    responses.forEach((response) => {
      manager.addAnswer("id", output, response);
    });
  });

  return manager;
}

async function processMessage(message) {
  const manager = setupNlpManager();
  await manager.train();
  manager.save();
  const response = await manager.process("id", message); // Change 'en' to 'id'
  return response;
}

module.exports = { processMessage };