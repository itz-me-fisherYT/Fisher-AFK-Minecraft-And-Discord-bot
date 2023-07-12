const Dtoken = process.env['Dtoken']
var mineflayer = require('mineflayer');
var tpsPlugin = require('mineflayer-tps')(mineflayer);
var antiafk = require('mineflayer-antiafk');


var D = require('discord.js');
var ttt = require('discord-tictactoe');
var chalk = require('chalk');

const client = new D.Client({ intents: [] });
const config = require('./config.json');
let color = "#RANDOM";

client.setMaxListeners(25);

var jc = config.jc;
let prefix = config.prefix;
let ip = config.ip;
let username = config.username;
let ver = config.version;
var bot;
function createBot() {
    let pass = config.password;
    if (!pass) {
        bot = mineflayer.createBot({
            host: ip,
            hideErrors: true,
            username: username,
            version: ver
        });
    } else {
        bot = mineflayer.createBot({
            host: ip,
            username: username,
            hideErrors: true,
            password: 231107,
            version: ver
        });
    }

    bot.loadPlugin(tpsPlugin);
    bot.loadPlugin(antiafk);

  bot.on('message', message => { // logs messages to console + logins for the server
        console.log('\x1b[36m%s\x1b[0m', '[CHAT]' + '\x1b[0m', '' + message.toString());
            if (message.toString() === ("Please, login with the command: /login <password>")) {
                bot.chat(`/login ` + password) } // Login (not gonna use .env, if you're using a public service like repl.it and you got hacked its your fault.)
                if (message.toString() === ("Please, register to the server with the command: /register <password> <ConfirmPassword>")) {
                bot.chat(`/register ` + password) } // Registers into 8b. Might made this universal for servers that uses the same login concept.
            if (message.toString() === ("Successful login!")) {
                console.log('\x1b[33m%s\x1b[0m','[Console] not has joined the server!') } // Bot has joined the server
            if (message.toString() === ("Successfully registered!")) {
                console.log('\x1b[33m%s\x1b[0m','[Console] Bot has successfully registered to the server!') } // huhu   
      });
bot.on('playerCollect', (collector) => {
    if (collector !== bot.entity) return

    setTimeout(() => {
        const leggings = bot.inventory.items().find(item => item.name.includes('leggings'))
        if (leggings) bot.equip(leggings, 'legs')

        const helmet = bot.inventory.items().find(item => item.name.includes('helmet'))
        if (helmet) bot.equip(helmet, 'head')

        const boots = bot.inventory.items().find(item => item.name.includes('boots'))
        if (boots) bot.equip(boots, 'feet')

        const chestplate = bot.inventory.items().find(item => item.name.includes('chestplate'))
        if (chestplate) bot.equip(chestplate, 'torso')
    }, 150)
})
  
setTimeout(() => {
    isinwork = false
}, 30000)
  
    bot.once("spawn", () => {
        bot.physics.maxGroundSpeed = 2
        bot.chat("/server Anarchy")
        setInterval(() => {
            bot.setControlState("jump", true)
            bot.setControlState("jump", false)
        }, 3000);
    });
  
    // =========================
    // SET ACTIVITY BOT
    // =========================
    client.on('ready', activity => {
        client.user.setStatus(`online`)
        client.user.setActivity(
            `${ip} Servers Chat, | For Help Do  ${prefix}help `, {
            type: "WATCHING"
        }
        )
    });

    client.on('ready', async () => {
        console.log(chalk.blue('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()'))
        console.log(chalk.magenta(`Discord Bot on. Loggined as ${client.user.tag}`))
        console.log(chalk.red('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()\n'))
    })
    bot.once('login', async () => {
        console.log(chalk.blue('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()'))
        console.log(chalk.magenta(`bot is on At ${ip}`))
        bot.chat(jc)
        console.log(chalk.yellow(`Bot just say "${jc}"`))
        console.log(chalk.red('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()\n'))
    })

    let forceStop = false;

    function getRandomMessage() {
        return config.messages[Math.floor(Math.random() * config.messages.length)];
    }

    function isInLobby() {
        if (!bot || !bot.game || bot.game.difficulty != "hard") {
            return true;
        } else {
            return false;
        }
    }

    bot.once("login", async () => {
        await bot.waitForTicks(1000);
        while (!forceStop) {
            if (!isInLobby()) {
                for (player in bot.players) {
                    const targetUsername = bot.players[player].username;
                    if (config.blacklist.includes(targetUsername.toLowerCase()) || bot.entity.username == targetUsername) continue;
                    if (forceStop) return;
                    bot.chat(getRandomMessage());
                    await bot.waitForTicks(config.delay);
                }
            }
            await bot.waitForTicks(2);
        }
    });

    //tictactoe
    new ttt({
        "language": "en",
        "command": "!ttt",
        "commandOptionName": "opponent",
    }).attach(client)

    bot.on("chat", async function(username, message) {
        let msg = message.toString();
        let args = msg.split(' ');

        if (msg.startsWith("!")) {
            let text = msg.substring(1); // Remove the first character "!"

            // Remove color codes from the message
            text = text.replace(/§[0-9a-fklmnor]/gi, '');

            if (text === "tp") {
                bot.chat(`/tpa itz_me_fisherYT`);
            }
            if (text === "tp2") {
                bot.chat(`/tpa breadperson86`);
            }
            if (text === "discord") {
                bot.chat("Bots discord: https://discord.gg/WG9EeGtKbK");
            }
            if (text === 'leav') {
                bot.chat("Disconnected, attempting to reconnect in 60 seconds...");
                bot.quit();
            }
              if (text === "tpa") {
                bot.chat(`${username} kill yourself`);
            }
          if (text === "dupe") {
                bot.chat(`/msg ${username} &e&n&lgive me a shulker box and place a item frame near me!`);
                bot.chat(`/msg ${username} &d&n&ldo !discord join the discord and do !dupe in #the-mc-chat ty`);
                bot.chat(`${username} kill yourself`);
          }
            if (text === 'kill') {
                bot.chat("/kill");
            }
          if (text === 'kit') {
                bot.chat(`/msg ${username} &f&k|||| &l&e&lPlease accept the teleportation request! &f&k||||`)
            bot.chat(`/msg ${username} &f&kKits Are Still Being Made!`)
    bot.chat(`${username} kill yourself`)
            }
            if (text === 'help') {
                bot.chat(`/msg ${username} &e&lmy commands are !discord !leave !kill !dupe !tpa !kit`);
            }

        }
    });


    client.on('message', msg => {
        if (!msg.content.startsWith(prefix)) return
        let args = msg.content.split(" ").slice(1)
        args = msg.content.slice(prefix.length).split(/ +/);
        let command = msg.content.split(" ")[0];
        command = command.slice(prefix.length);
        command = args.shift().toLowerCase();
        if (command == "say") {
            const chat = args.join(" ")
            bot.chat("" + chat)
            const success = new D.MessageEmbed()
                .setDescription(`:white_check_mark: ${msg.author.tag} sent \`${chat}\``)
                .setTimestamp();
            msg.channel.send(success);
        } else if (command == "forward") {
            bot.setControlState('forward', true)
            const MoForw = new D.MessageEmbed()
                .setDescription(`:white_check_mark: Im Moving forward To Stop Do -stop`)
                .setTimestamp();
            msg.channel.send(MoForw);
        } else if (command == "backward") {
            bot.setControlState('back', true)
            const MoBackw = new D.MessageEmbed()
                .setDescription(`:white_check_mark: Im Moving backward To Stop Do -stop`)
                .setTimestamp();
            msg.channel.send(MoBackw);
        } else if (command == "stop") {
            bot.clearControlStates()
            const MoStop = new D.MessageEmbed()
                .setDescription(`:white_check_mark: Stopped!`)
                .setTimestamp();
            msg.channel.send(MoStop);
        } else if (command == "left") {
            bot.setControlState('left', true)
            const MoLeft = new D.MessageEmbed()
                .setDescription(`:white_check_mark: Im Moving left To Stop Do -stop`)
                .setTimestamp();
            msg.channel.send(MoLeft);
        } else if (command == "right") {
            bot.setControlState('right', true)
            const MoRight = new D.MessageEmbed()
                .setDescription(`:white_check_mark: Im Moving Right To Stop Do -stop`)
                .setTimestamp();
            msg.channel.send(MoRight);
        } else if (command == "help") {
            const help = new D.MessageEmbed()
                .setTitle('Help')
                .setDescription('Here are the available commands:')
                .addFields({
                    name: `:speech_balloon: ${prefix}say`,
                    value: `Get the bot to say what you want.`
                }, {
                    name: `:arrows_counterclockwise: ${prefix}movement`,
                    value: `Look at the movement command.`
                }, {
                    name: `:frame_photo: ${prefix}dupe`,
                    value: `Frame dupe. `
                }, {
                    name: `:signal_strength: ${prefix}tps`,
                    value: `Get TPS of server.`
                }, {
                    name: `:busts_in_silhouette: ${prefix}online`,
                    value: `Get the current player list.`
                }, {
                    name: `:information_source: ${prefix}status`,
                    value: `Show information about the bot.`
                }, {
                    name: `:world_map: ${prefix}location`,
                    value: `Show the bot's current location.`
                }, {
                    name: `:loudspeaker: ${prefix}spam`,
                    value: `Spam ping the mentioned user. (Usage: ${prefix}spam @username 10)`
                }, {
                    name: `:wastebasket: ${prefix}purge`,
                    value: `Delete messages in bulk.`
                }, {
                    name: `:game_die: ${prefix}ttt`,
                    value: `Play TicTacToe.`
                },);
            msg.channel.send(help);
        } else if (command == "movement") {
            const movement = new D.MessageEmbed()
                .setTitle(`Movement Command`)
                .addFields({
                    name: ` :arrow_up: ${prefix}forward`,
                    value: `To Move Forward.`
                }, {
                    name: ` :arrow_down: ${prefix}backward`,
                    value: `To Move Backward `
                }, {
                    name: ` :arrow_left:  ${prefix}left`,
                    value: `To Move Left.`
                }, {
                    name: ` :arrow_right: ${prefix}right`,
                    value: `To Mover Right`
                }, {
                    name: ` :stop_button: ${prefix}stop`,
                    value: `To Stop all Movement`
                }, {
                    name: ` :kangaroo: ${prefix}jump`,
                    value: `To Jump`
                }, {
                    name: ` :stop_button: ${prefix}stopjump`,
                    value: `To Stop`
                }, {
                    name: ` :feet: ${prefix}sneak`,
                    value: `To Sneak`
                }, {
                    name: ` :stop_button: ${prefix}stopsneak`,
                    value: `To Stop Sneak`
                },);
            msg.channel.send(movement);
        } else if (command == "purge") {
            msg.channel.bulkDelete(100);
        } else if (command == "dupe") {
            const itemframe = bot.nearestEntity(entity => entity.name.match('item_frame'))
            if (itemframe) {
                setInterval(async () => {
                    const shulk = bot.inventory.items().find(item => item.name.includes('shulker_box'))
                    if (shulk) {
                        bot.equip(shulk, 'hand')
                        bot.lookAt(itemframe.position);
                        await bot.useOn(itemframe)
                        await bot.attack(itemframe)
                    }
                }, 300);
                const dupe = new D.MessageEmbed()
                    .setDescription(`:white_check_mark: Dupe Started`);
                msg.channel.send(dupe);
            } else {
                return msg.reply("Bot doesn't have Shulker Boxes or Bot is not near a Item Frame.");
            }
        } else if (command == "tps") {
            const tps = new D.MessageEmbed()
                .setDescription(`Current TPS of the server is **${bot.getTps()}**`);
            msg.channel.send(tps);
        } else if (command == "online") {
            let players = Object.keys(bot.players);
            let list = players.map((e) => e.username);
            const playerList = players.join(", ");

            const online = new D.MessageEmbed()
                .setTitle(`List Of Online Players`)
                .setDescription(`Here are the players currently online:\n\n${playerList}`);

            if (playerList) {
                return msg.channel.send(online);
            } else {
                return msg.channel.send("There are no players online right now.");
            }
        } else if (command == "status") {
            const status = new D.MessageEmbed()
                .setTitle(`**${bot.username}** Statistics`)
                .setDescription(`Health: **${bot.health}**\nFood: **${bot.food}**\nXP: **${bot.experience.level || 0}**`);

            msg.channel.send(status);
        } else if (command == "location") {
            const X = bot.entity.position.x.toFixed(1);
            const Y = bot.entity.position.y.toFixed(1);
            const Z = bot.entity.position.z.toFixed(1);

            const coord = new D.MessageEmbed()
                .setTitle(`**${bot.username}** Location`)
                .setDescription(`X: **${X}**\nY: **${Y}**\nZ: **${Z}**`);
            msg.channel.send(coord);
        } else if (command == "spam") {
            const numMessages = parseInt(args[1]);
            const user = msg.mentions.users.first();

            if (!user) {
                return msg.reply('Please mention a user to spam!');
            }

            if (isNaN(numMessages) || numMessages < 1 || numMessages > 10000) {
                return msg.reply('Please provide a valid number of messages between 1 and 10000.');
            }

            for (let i = 0; i < numMessages; i++) {
                msg.channel.send(`Hey ${user}! You're being spammed!`);
            }
        } else if (command == "sneak") {
            bot.setControlState('sneak', true);
            const sneak = new D.MessageEmbed()
                .setDescription(`Bot is Sneaking`)
            msg.channel.send(sneak);
        } else if (command == "stopsneak") {
            bot.setControlState('sneak', false);
            const stsneak = new D.MessageEmbed()
                .setDescription(`Bot Stopped Sneaking`)
            msg.channel.send(stsneak);
        } else if (command == "jump") {
            bot.setControlState('jump', true);
            const jump = new D.MessageEmbed()
                .setDescription(`Bot Started Jumping`)
            msg.channel.send(jump);
        } else if (command == "stopjump") {
            bot.setControlState('jump', false);
            const stjump = new D.MessageEmbed()
                .setDescription(`Bot Stopped Jumping`)
            msg.channel.send(stjump);
        } else if (command == "antiafk") {
            const afk = ['jump']
            bot.afk.setOptions({ actions: afk });
            bot.afk.setOptions({ maxActionsInterval: 2000 });
            bot.afk.start();
            const start = new D.MessageEmbed()
                .setDescription(`AFK Started`)
            msg.channel.send(start);
        } else if (command == "stopafk") {
            bot.afk.stop();
            const stop = new D.MessageEmbed()
                .setDescription(`AFK Stopped`)
            msg.channel.send(stop);
        }
        else if (command == "tpa") {
            bot.chat(`/tpa ${username}`);
        }
    })

    bot.on("messagestr", message => {
        let channel = client.channels.cache.get(config.scid)
        if (!channel) return;
        const msg = new D.MessageEmbed()
            .setDescription(`>> ${message}`)
        channel.send(msg)
    });

    client.login(Dtoken)
        .catch(error => {
            console.log(chalk.red(`Can't Login`));
        })

    bot.on('kicked', (reason) => {
        console.log(chalk.red(`[BotLog] kicked from the server. Reason: \n${reason}`));
    });

    bot.on('end', () => {
        console.log(chalk.blue('Disconnected, attempting to reconnect in 60 seconds...'));
        setTimeout(() => {
            createBot(); // Recreate the bot
        }, 60000); // Reconnect after 10 seconds
    });
    //end of code
}
createBot();
