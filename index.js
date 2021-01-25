const Discord = require("discord.js")
const client = new Discord.Client({
    partials: ['MESSAGE', 'REACTION'],
  });
const WOKCommands = require("wokcommands")
require('dotenv').config()
client.on('ready', () => {
    client.user.setPresence({ activity: 
        { name: '|| users type ~help',
        type: "WATCHING"
     }, 
        status: 'online' })
    // See the "Language Support" section of this documentation
    // An empty string = ignored
    const messagesPath = ''
  
    // Used to configure the database connection.
    // These are the default options but you can overwrite them
    const dbOptions = {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  
    // Initialize WOKCommands with specific folders and MongoDB
    new WOKCommands(client, {
      commandsDir: 'commands',
      featureDir: 'features',
      messagesPath,
      showWarns: true, // Show start up warnings
      dbOptions
    })
    .setBotOwner([
        "632619985310711833",
		"716485063524745306",
		"484074891432296469",
		"299216236238077952",
		"359731859409862656",
        "591698678452977707",
        "725010310922240007"
    ])
      // Set your MongoDB connection path
      .setMongoPath(process.env.MONGO_URI)
      // Set the default prefix for your bot, it is ! by default
      .setDefaultPrefix('~')
      // Set the embed color for your bot. The default help menu will use this. This hex value can be a string too
      .setColor(0xff0000)
      .setCategorySettings([
        {
            name: 'Fun',
            emoji: '🎮'
          },
          {
            name: 'Economy',
            emoji: '💸'
          },
          {
            name: 'Info',
            emoji: 'ℹ️'
          },
          {
            name: 'Music',
            emoji: '🎶'
          },
          {
            // You can change the default emojis as well
            name: 'Configuration',
            emoji: '🚧',
            // You can also hide a category from the help menu
            // Admins bypass this
            hidden: true
          },
          {
              name: 'Moderation',
              emoji: '🚔'
          },
          {
            name: 'OWNER',
            emoji: '🅾️',
            hidden: true
          }
        ])
      })
  
  client.login(process.env.TOKEN)