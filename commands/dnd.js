const Character = require('./dnds/Character')
const fs = require('fs')
// const { create, addMagic, addSkill, setStat, setStats, setBase, deleteCharacter } = require('./dnds/char')
const char = require('./dnds/char')
const inv = require('./dnds/inv')

const validActions = ['char', 'inv', 'coin']
const validCommands = ['add', 'list', 'create', 'magic', 'stat', 'stats', 'skill', 'base', 'delete', 'names']

const errorMessage = 'Произошла ошибка, проверьте правильность введённых данных'

module.exports = {
    name: 'dnd',
    description: 'Для описания всего не хватит строчки...',
    args: true,
    async execute(message, args) {
        const action = args[0] // char, inv, coin
        const command = args[1] // add, list, check, skill (для персонжей), magic (также для них)

        if (!(validActions.includes(action) && validCommands.includes(command))) return

        // const personCheck = await Character.getByName('Devitt')
        // console.log(personCheck)

        const charArgs = [ ...args ]
        charArgs.splice(0, 2)

        switch (action) {
            case 'char':
                    if (command === 'create') {
                        await char.create(...charArgs) // &dnd char create Devitt 40 60 6 3 3 20 3 14 3 yes Human
                            .then(() => message.channel.send('Новый персонаж создан'))
                            .catch(err => message.channel.send(
                                err))
                    } else if (command === 'magic') {
                        await char.addMagic(...charArgs) // name (персонажа), title, mp, school, level, about
                            .then(() => message.channel.send(`Новый спелл добалвен персонажу ${charArgs[0]}`))
                            .catch(err => message.channel.send(
                                err))
                    } else if (command === 'skill') {
                        await char.addSkill(...charArgs) // name, title, about
                            .then(() => message.channel.send(`Новый скилл добалвен персонажу ${charArgs[0]}`))
                            .catch(err => message.channel.send(
                                err))
                    } else if (command === 'stat') {
                        await char.setStat(...charArgs) // name, stat, value
                            .then(() => message.channel.send(`Обновлена характеристика персонажа ${charArgs[0]}`))
                            .catch(err => message.channel.send(
                                err))
                    } else if (command === 'stats') {
                        await char.setStats(...charArgs) // name, шесть характеристик цифрами
                            .then(() => message.channel.send(`Обновлены характеристики персонажа ${charArgs[0]}`))
                            .catch(err => message.channel.send(
                                err))
                    } else if (command === 'base') {
                        await char.setBase(...charArgs)
                            .then(() => message.channel.send(`Обновлён персонаж ${charArgs[0]}`))
                            .catch(err => message.channel.send(
                                err))
                    } else if (command === 'delete') {
                        await char.deleteCharacter(charArgs[0])
                            .then(() => message.channel.send(`Персонаж ${charArgs[0]} был удалён`))
                            .catch(err => message.channel.send(
                                err))
                    } else if (command === 'names') {
                        await Character.charactersNames()
                    }
                break
            case 'inv':
                    if (command === 'create') {
                        await inv.create(...charArgs)
                            .then(() => message.channel.send(`Иневентарь ${charArgs[0]} создан`))
                            .catch(err => message.channel.send(err))
                    } else if (command === 'add') {
                        await inv.addItem(...charArgs)
                            .then(() => message.channel.send(
                                `Предмет ${charArgs[1]} добавлен в инвентарь ${charArgs[0]}`))
                    }
                break
        }

        if (action === 'char' && command === 'create') {

        }

        // const data = await Character.getAll()
        //
        // console.log(data)
    }
}

// $dnd mode -database <token>   Из списка токенов с прикреплёнными к ним бд (пока один с файрбейзом)
// Далее если активен dnd мод, он преобразует сообещния с &<текст> в $dnd <текст>

// &char list - Вывод всех персонажей с их характеристиками и id (id от 0 до N - натуральные числа)
// $char <id> set <характеристика> <значение> (Характеристики это как hp, mp, так и расрпеделяемые и лор)
// $char create <имя>
// $inv list - Вывод всего инвентаря с монетами и id вещей (также как и с персонажами)
// $inv add <предмет>
// $inv del <id>
// $coin add <монета (g, s, b)> <количество>
// $coin del <монета (g, s, b)> <количество>