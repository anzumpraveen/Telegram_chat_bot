const teligram = require('node-telegram-bot-api')
require('dotenv').config();
const axios = require('axios');


const TOKEN = process.env.TOKEN

const bot = new teligram(TOKEN, { polling: true })


bot.on('message', (msg) => {
    var hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
        bot.sendMessage(msg.chat.id, "Hello dear user");
    }

    var bye = "bye";
    if (msg.text.toString().toLowerCase().includes(bye)) {
        bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
    }

});


bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Welcome");

});

bot.onText(/\/sendpic/, (msg) => {

    bot.sendPhoto(msg.chat.id, "https://raw.githubusercontent.com/hosein2398/node-telegram-bot-api-tutorial/master/pics/CaptionJPG.JPG", { caption: "Here we go ! \nThis is just a caption " });

});

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Welcome", {
        "reply_markup": {
            "keyboard": [["Sample text", "Second sample"], ["Keyboard"], ["I'm robot"]]
        }
    });

});

bot.on('message', (msg) => {
    var Hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.chat.id, "Hello dear user");
    }
    var bye = "bye";
    if (msg.text.toString().toLowerCase().includes(bye)) {
        bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
    }
    var robot = "I'm robot";
    if (msg.text.indexOf(robot) === 0) {
        bot.sendMessage(msg.chat.id, "Yes I'm robot but not in that way!");
    }
});

bot.on('message', (msg) => {

    var Hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.chat.id, "<b>bold</b> \n <i>italic</i> \n <em>italic with em</em> \n <a href=\"http://www.example.com/\">inline URL</a> \n <code>inline fixed-width code</code> \n <pre>pre-formatted fixed-width code block</pre>", { parse_mode: "HTML" });
    }
});

bot.on('message', (msg) => {
    var location = "location";
    if (msg.text.indexOf(location) === 0) {
        bot.sendLocation(msg.chat.id, 12.9716, 77.5946);
        bot.sendMessage(msg.chat.id, "Here is the point");

    }
});


bot.on('message', (msg) => {

    var bye = "bye";
    if (msg.text.toString().toLowerCase().includes(bye)) {
        bot.sendMessage(msg.chat.id, "Have a nice day " + msg.from.first_name);
    }

});


bot.onText(/\/domath(.+)/, (msg, match) => {
    let str = match[1]
    bot.sendMessage(msg.chat.id, eval(str));
});

bot.onText(/\/weather(.+)/, (msg, match) => {
    const data = match[1]
    // console.log(data);
    axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/ ${data} ?unitGroup=metric&include=current&key=6RFVTH86QN4A4XQRZ5MR25YUL&contentType=json`).then(resp => {
        let data_store = resp.data
        let temp = `Temp : ${data_store['days'][0]["temp"]}`
        let humidity = `humidity : ${data_store["days"][0]["humidity"]}`
        bot.sendMessage(msg.chat.id, temp)
        bot.sendMessage(msg.chat.id, humidity)
    });

});