const { NlpManager } = require('node-nlp');

function setupNlpManager() {
    const manager = new NlpManager({ languages: ['id'], forceNER: true });

    // Adds the utterances and intents for the NLP
    manager.addDocument('id', 'goodbye for now', 'greetings.bye');
    manager.addDocument('id', 'bye bye take care', 'greetings.bye');
    manager.addDocument('id', 'okay see you later', 'greetings.bye');
    manager.addDocument('id', 'bye for now', 'greetings.bye');
    manager.addDocument('id', 'i must go', 'greetings.bye');
    manager.addDocument('id', 'hello', 'greetings.hello');
    manager.addDocument('id', 'hi', 'greetings.hello');
    manager.addDocument('id', 'howdy', 'greetings.hello');

    // Train also the NLG
    manager.addAnswer('id', 'greetings.bye', 'Till next time');
    manager.addAnswer('id', 'greetings.bye', 'see you soon!');
    manager.addAnswer('id', 'greetings.hello', 'Hey there!');
    manager.addAnswer('id', 'greetings.hello', 'Greetings!');

    return manager;
}

async function processMessage(message) {
    const manager = setupNlpManager();
    await manager.train();
    manager.save();
    const response = await manager.process('en', message);
    return response;
}

module.exports = { processMessage };