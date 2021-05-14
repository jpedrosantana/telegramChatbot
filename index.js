const Telegrambot = require("node-telegram-bot-api");

const dialogFlow = require("./dialogflow");
const youtube = require("./youtube");
const token = 'YOUR-TELEGRAM-CHATBOT-API';

const bot = new Telegrambot(token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id; 

    const dfResponse = await dialogFlow.sendMessage(chatId.toString(), msg.text);

    let responseText = dfResponse.text;
    if(dfResponse.intent === 'Curso de programação'){
        responseText = await youtube.searchVideoURL(responseText, dfResponse.fields.cursos.stringValue);
    }

    bot.sendMessage(chatId, responseText);
});