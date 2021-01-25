const { MessageEmbed } = require("discord.js")

module.exports = {
    category: "Moderation",
    description: "Kick someone along you are a moderator",
    requiredPermissions: ['KICK_MEMBERS'],
    expectedArgs: "<@user> <reason>",
    callback: async ({ message, args, text, client, prefix, instance, arguments }) => {
        if(message.author.bot || message.channel.type === "dm") return;
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("I need KICK_MEMBERS permission or ADMINISTRATOR permission to execute this command!").then(m => m.delete({ timeout: 5000}));
        
        const toKick = message.mentions.members.first() || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" "));
        if(!toKick) return message.channel.send("No user found make sure to ping them!").then(m => m.delete({ timeout: 5000}));
        let reason = args.slice(1).join(" ") || "There was no reason";
        if(!toKick.kickable) return message.channel.send(`${toKick} is not able to be kicked!`).then(m => m.delete({ timeout: 5000}));
        toKick.kick(reason)
        const mss = new MessageEmbed()
        .setTitle(`I have kicked ${toKick} \n Reason: ${reason}`)
        .setColor('RANDOM')
        message.channel.send(mss).then(m => m.delete({ timeout: 5000}));
    }
}