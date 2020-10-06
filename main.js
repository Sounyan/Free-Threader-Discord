// Response for Uptime Robot
const http = require("http");

function getType(_url) {
  var types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "text/json",
    ".png": "image/png",
    ".gif": "image/gif",
    ".svg": "svg+xml"
  };

  for (var key in types) {
    if (_url.endsWith(key)) {
      return types[key];
    }
  }
  return "text/plain";
}
var server = http.createServer(function(req, res) {
  var url =
    "public" + (req.url.endsWith("/") ? req.url + "index.html" : req.url);
  console.log(url);
  if (fs.existsSync(url)) {
    fs.readFile(url, (err, data) => {
      if (!err) {
        res.writeHead(200, { "Content-Type": getType(url) });
        res.end(data);
      } else {
        res.statusCode = 500;
        res.end();
      }
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});
var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("ok");
});

// Discord bot implements
const discord = require("discord.js");
const client = new discord.Client();
const Canvas = require("canvas");
const prefix = "Sc+";
const fs = require("fs");
const cron = require("node-cron");
const { inspect } = require("util");
const ms = require("ms");

client.on("ready", message => {
  console.log("bot is ready!");
  client.user.setActivity("リニューアル中です!");
});


client.on("message", message => {
  const prob = Math.floor(Math.random() * 100);

  //乱数の値が10以下だったら
  if (message.channel.id === "726000952296865813" && prob < 1) {
    message.channel.send("https://discord.gg/ChRCsyN",
                         {embed: {
      color: "RANDOM",
                           
      title: "おっと、ここで雑談してますね?",
      description: "ここで雑談するのもいいんですが雑談に特化したサーバーがあるんですよ〜\n是非このサーバーへ〜"
    }})
  }
})

const messageId　= '742265836244434994'
const channelId = '726000945309286460'
const emojiId =　'726000967627046912'
client.once('ready', () => {
  client.channels.fetch(channelId)
    .then(channel => channel.messages.fetch(messageId))
    .catch(console.error)
})

client.on('messageReactionAdd', async (reaction,user) => {
  const message = reaction.message
  const emoji = reaction.emoji
  if (emoji.id !== emojiId) return
  if (message.id !== messageId) return
  if (reaction.message.guild.member(user.id).roles.cache.has("726000947175620629")) return
  reaction.message.guild.member(user.id).roles.add("742271596579782746")
})

const messageId1　= '742630590234361907'
const channelId1 = '742623891301597194'
const emojiId1 =　'726000967627046912'
client.once('ready', () => {
  client.channels.fetch(channelId1)
    .then(channel => channel.messages.fetch(messageId1))
    .catch(console.error)
})

client.on('messageReactionAdd', async (reaction,user) => {
  const message = reaction.message
  const emoji = reaction.emoji
  if (emoji.id !== emojiId1) return
  if (message.id !== messageId1) return
  if (reaction.message.guild.member(user.id).roles.cache.has("742632018029969418")) return
reaction.message.guild.member(user.id).roles.add("742632018029969418")
})

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if (message.content.indexOf(prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "eval") {
    // Put your userID here
    if (message.author.id !== "645581794267234315") return;

    let evaled;
    try {
      evaled = await eval(args.join(" "));
      message.channel.send(inspect(evaled));
      message.react("check");
      console.log(inspect(evaled));
    } catch (error) {
      console.error(error);
      message.channel.send({
        embed: {
          color: 16757683,
          title: "⚠エラーが発生しました…⚠",
          description: "エラー内容```" + error + "```"
        }
      });
      message.react("uncheck");
    }
  }

 

  if (command === "topic") {
    const topic = args.join(" ");
    message.channel.setTopic("```"+topic+"```")
  }
  })




client.login("Njk2NTgxMzkyMzE4MDcwODI0.XxRAiQ.F496_S9XSqLDyVhexmtSByJdx2M");
