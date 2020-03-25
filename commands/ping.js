module.exports = {
    name: 'ping',
    description: 'Пинг!',
    cooldown: 5,
    execute(message) {
        message.channel.send('Pong').then(m => {
            // TODO Вывод в консоль, наверное нужно сделать общую функцию
        })
    }
}