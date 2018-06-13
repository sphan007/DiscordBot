const { Command } = require('discord.js-commando');
let cheerio = require('cheerio')
let $ = cheerio.load('https://exvius.gamepedia.com/Unit_Rankings')
//*[@id="mw-content-text"]/table[2]

var ranking = [];
$('#mw-content-text').each(function() {
    var rank = this.attr('href');
    ranking.push(rank);
});
console.log(ranking);
function changeLetter(word) {
    var phrase = word.split('_');
    for(var i = 0; i < phrase.length; i++) {
        phrase[i] = phrase[i].charAt(0).toUpperCase() + phrase[i].slice(1);
    }
    return phrase.join(' ');
}
function changeURL(word) {
    var phrase = word.split('_');
    for(var i = 0; i < phrase.length; i++) {
        phrase[i] = phrase[i].charAt(0).toUpperCase() + phrase[i].slice(1);
    }
    return phrase.join('_');
}
module.exports = class FFBE extends Command {
    constructor(client) {
        super(client, {
            name: 'unit',
            group: 'ffbe',
            memberName: 'unit',
            description: 'Looks up units from FFBE.',
            examples: ['unit Rikku']
        });
    }

    run(message, args) {
        
        const embed = {
            "title": "" + changeLetter(args),
            url: "https://exvius.gamepedia.com/" + changeURL(args),
            "color": 3447003,
            "thumbnail": {
              "url": "attachment://sprite.png"
            },
            "fields": [
              {
                "name": "Rating:",
                "value": "https://exvius.gamepedia.com/Unit_Rankings", //how to get the rating based on different units
                "inline": false
              },
              {
                "name": "Rarity:",
                "value": "Not yet implemented.",
                "inline": true,
              },
          ],
          timestamp: new Date(),
          "footer": {
            "text": changeLetter(args) + " sucks by the way - Chan."
          }
          
        };

        message.channel.send({ embed, files: [{ attachment: 'commands/ffbe/sprite/'+ args.replace(/\s+/g, '') + '.png', name: 'sprite.png' }] }).catch(err => message.channel.send("could not find cause it's stupid"));
    }
};
