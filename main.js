// Response for Uptime Robot
const http = require("http");
const fs = require('fs');

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
  console.log("Web is OK.🙆");
});

// Discord bot implements
const discord = require("discord.js");
const client = new discord.Client();

client.on("ready", message => {
  console.log("Bot is OK.🙆");
  client.user.setActivity("Free Threader | Made by Lovely Cat.");
});

const write_json = ( filename, obj ) =>

{

  fs.writeFile( filename, JSON.stringify( obj, null, '\t' ), (e) => {

    if ( e ) {

      console.log( e );

      throw e;

    }

  });

}

 



 

const ch_log_filename = 'ch_log.json';

 

let ch_log ={};

// ch_log.jsonが存在していれば読み込み、無ければchannels配列を作成

try {

  const str = fs.readFileSync( ch_log_filename, 'utf8' );

  ch_log = JSON.parse( str );

}

catch ( err ) {

  ch_log.channels = new Array();

}

 

 

 



client.on("message", (message) =>

{

  let args = message.content.split( /\s+/ );

  const command = arg.shift();

  const ch_name = arg[0]; 
 
  if ( command === 'p!delete' )

  {

    let channel = message.guild.channels.cache.find(c=>c.name == ch_name);

 

    if ( channel )

    {

      const index = ch_log.channels.findIndex( (obj)=>{

        return obj.ch_id === channel.id;

      });

 

      // 削除しようとしているユーザーが作成者かチェック

      if ( message.member.id === ch_log.channels[index].user_id )

      {

        channel.delete()

          .then( (ch) => {

            // 削除したチャンネルじゃなければ削除メッセージを送信

            if ( ch.id !== message.channel.id ) {

              message.channel.send( ch_name + 'チャンネルを削除しました' );

            }

 

            // 削除したチャンネルのログを削除してJSONファイルに出力

            ch_log.channels.splice( index, 1 );

            write_json( ch_log_filename, ch_log );

          })

          .catch( (err) => { console.log( err ); } );

      }

      else {

        message.channel.send( ch_name + 'チャンネルを削除する権限がありません' );

      }

    }

    else {

      message.channel.send( ch_name + 'チャンネルは存在しません' );

    }

  }

});

 

client.login(token);
