module.exports = {
    name: 'role',
    description: 'Управление ролями на сервере',
    aliases: ['roles'],
    usage: 'list / set / remove / check',
    examples: ['list', 'set @member [role name]'],
    cooldown: 5,
    args: true,
    execute(message, args) {
        const option = args[0]
        let response = `Переданы неверные параметры`

        switch (option) {
            case 'check':

                break
            case 'list':

                break
        }

        message.channel.send(response).then()
    }
}