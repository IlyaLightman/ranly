const fs = require('fs')
const Discord = require('discord.js')
const { bgBlueBright, blue, magenta } = require('chalk')

const { prefix, hearts, groovy, groovyChannel } = require('./config')
require('dotenv').config()
const token = process.env.TOKEN

const client = new Discord.Client()
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => {
    return file.endsWith('.js')
})

commandFiles.forEach(file => {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
})

let commands = ''
client.commands.forEach(command => commands += `${command.name} `)
console.log(bgBlueBright.bold(commands))

const cooldowns = new Discord.Collection()

client.once('ready', () => {
    console.log(magenta('Ranly готов к работе!'))
})

client.on('shardError', error => {
    console.error('A websocket connection encountered an error:', error);
})

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
})

client.on('message', message => {
    if (!(message.content.startsWith(prefix) || message.content.startsWith(groovy)) || message.author.bot) return

    const heart = Math.floor(Math.random() * 6)
    message.react(hearts[heart]).then(() => { })

    if (message.content.startsWith(groovy + ' ') && message.channel.name !== groovyChannel) {
        message.channel.send(`${message.author}, НЕ СЮДА ОТПРАВЛЯЙ ЕСТЬ КАНАЛ СПЕЦИАЛЬНЫЙ. ЕЩЁ РАЗ И БАН`).then(
            () => {}
        )
        return
    }

    const args = message.content.slice(prefix.length).split(/ +/)
    const commandName = args.shift().toLowerCase()

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    if (!command) return

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply(`Can't execute that command inside DMs!`)
    }

    if (command.args && !args.length) {
        // let reply = `Это так не работает, ${message.author}!`
        let reply = `Это так не работает`

        if (command.usage) {
            reply += `\nВызов должен быть таким: \`${prefix}${command.name} ${command.usage}\``
            if (command.examples) {
                reply += `\nНапример: \`${prefix}${command.name} ${command.examples[0]}\``
                command.examples.shift()
                command.examples.forEach(example => {
                    reply += ` или \`${prefix}${command.name} ${example}\``
                })
            }
        }

        return message.channel.send(reply)
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection())
    }

    const now = Date.now()
    const timestamps = cooldowns.get(command.name)
    const cooldownAmount = (command.cooldown || 3) * 1000

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000
            return message.reply(
                `Подожди ещё ${timeLeft.toFixed(1)} секунд перед использованием команды вновь`)
        }
    }

    timestamps.set(message.author.id, now)
    setTimeout(() => {
        timestamps.delete(message.author.id)
    }, cooldownAmount)

    try {
        command.execute(message, args)
    } catch (err) {
        console.error(err)
        message.reply(`Произошла ошибка`).then(console.log)
    }
})

client.login(token).then(() => console.log(blue('Ranly залогинился!')))