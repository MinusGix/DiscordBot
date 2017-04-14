/* jshint esversion:6*/

//For discord
var Discord = require('discord.js'),
    fs = require('fs'),
    Jimp = require("jimp"),
    imgurUploader = require('imgur-uploader'),
    client = new Discord.Client(),
    config = loadJSON(__dirname + '/JSON/config.json');

//Loads a JSON file
function loadJSON(dir) {
    return JSON.parse(fs.readFileSync(dir, 'utf8'));
}

//Writes to a JSON file
function writeJSON(dir, data) {
    return fs.writeFileSync(
        dir,
        JSON.stringify(data),
        'utf8'
    );
}

client.on("ready", function() {
    console.log("logged in serving in " + client.guilds.array().length + " servers");

});
client.on("message", message => {
    console.log(message.author.username + ' : ' + message.content);
    if (message.author.username === config.botName) {
        return;
    }
    runCommand(message);

});
client.on("messageUpdate", (oldMessage, newMessage) => {
    //nothing, I'll just ignore those
});

client.on('guildMemberAdd', member => {
    //get the channel by it's ID
    var channel = client.channels.get(config.channelToWelcomeUserIn);
    getWelcomeImage(member.user.username, function(data) {
        channel.send(data.link);
    });
});


var COMMANDS = {};

function addCommand(name, func) {
    COMMANDS["cmd_" + name] = {
        name,
        func
    };
}

function runCommand(message) {
    var firstArg = message.content.split(' ')[0];
    if (firstArg.startsWith(config.commandsBegin) && COMMANDS.hasOwnProperty('cmd_' + firstArg.replace(config.commandsBegin, ''))) {
        //probably don't need most of these, but it's for simplicity if I ever do need them.
        var args = {
            message,
            send: message.channel.sendMessage.bind(message.channel),
            sendFile: message.channel.sendFile.bind(message.channel),
            user: message.author,
            text: message.content,
            nick: message.author.username,
            username: message.author.username,
            avatar: message.author.avatar,
            avatarURL: message.author.avatarURL,
            isBot: message.author.bot,
            authorID: message.author.id,
            lastMessageID: message.author.lastMessageID,
            dm: message.author.send.bind(message.author),
            dmCode: message.author.sendCode.bind(message.author),
            dmEmbed: message.author.sendEmbed.bind(message.author),
            dmFile: message.author.sendFile.bind(message.author),
            dmMessage: message.author.sendMessage.bind(message.author),
        };
        COMMANDS['cmd_' + firstArg.replace(config.commandsBegin, '')].func(args);
    }
}
addCommand('help', function(args) {
    var text = 'Commands:\n',
        first = true;
    for (let cmd in COMMANDS) {
        if (!first) {
            text += ', ';
        } else {
            first = false;
        }
        text += '#' + COMMANDS[cmd].name;
    }
    args.send(text + '.');
});
addCommand('hello', function(args) {
    args.send(`Hello ${args.nick}!`);
});
addCommand('showwelcome', function(args) {
    getWelcomeImage(args.nick, function(data) {
        args.send(data.link);
    });
});

function getWelcomeImage(nick, callback) {
    Jimp.read(config.imageFile).then(function(image) {
        //Apparently it might be good to do this so it doesn't modify the original
        var img = image.clone();
        /*
			fonts are 
			Jimp.FONT_SANS_8_BLACK;   // Open Sans, 8px, black 
			Jimp.FONT_SANS_16_BLACK;  // Open Sans, 16px, black 
			Jimp.FONT_SANS_32_BLACK;  // Open Sans, 32px, black 
			Jimp.FONT_SANS_64_BLACK;  // Open Sans, 64px, black 
			Jimp.FONT_SANS_128_BLACK; // Open Sans, 128px, black 
 
			Jimp.FONT_SANS_8_WHITE;   // Open Sans, 8px, white 
			Jimp.FONT_SANS_16_WHITE;  // Open Sans, 16px, white 
			Jimp.FONT_SANS_32_WHITE;  // Open Sans, 32px, white 
			Jimp.FONT_SANS_64_WHITE;  // Open Sans, 64px, white 
			Jimp.FONT_SANS_128_WHITE; // Open Sans, 128px, white 
		*/

        Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(function(font) {
            //200, 200 is the x and y position. x and y starts at 0,0 of the image
            img.print(font, config.text.x, config.text.y, config.text.before + nick + config.text.after);

            img.getBuffer(Jimp.AUTO, function(err, buff) {
                if (err) {
                    console.log('ERROR IN GENERATING BUFFER FOR IMAGE:');
                    console.log(err);
                    return;
                }
                imgurUploader(buff, { title: 'Hello!' }).then(data => {
                    callback(data);
                });
            });
        }).catch(function(err) {
            console.log('ERROR IN LOADING FONT FOR IMAGE TEXT:');
            console.log(err);
        });
    }).catch(function(err) {
        console.log('ERROR IN LOADING FILE:');
        console.log(err);
    });
}

client.login(config.botToken);