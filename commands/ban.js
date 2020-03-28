const Discord = require('discord.js')

module.exports = {
    name: 'ban',
    description: 'Аккуратнее с этим...',
    cooldown: 15,
    usage: 'Не стоит использовать это',
    execute(message, args) {
        message.channel.send(`${message.author}, ты уверен в этом?`).then(() => {
            setTimeout(() => {
                message.channel.send(`${message.author}, хотя уже слишком поздно`).then(() => {
                    setTimeout(() => {
                        message.channel.send(`${message.author}, прощай.`).then(() => {
                            message.guild.member(message.author).ban('Неудачник.')
                        })
                    }, 2000)
                })
            }, 2500)
        })
    }
}