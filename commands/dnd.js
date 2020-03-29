const Character = require('./dnds/Character')
const fs = require('fs')
const { create, addMagic, addSkills } = require('./dnds/char')

const validActions = ['char', 'inv', 'coin']
const validCommands = ['add', 'list', 'create', 'magic']

const errorMessage = 'Произошла ошибка во время создания, проверьте правильность введённых данных'

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
                        await create(...charArgs) // &dnd char create Devitt 40 60 6 3 3 20 3 14 3 yes Human
                            .catch(() => message.channel.send(
                                errorMessage))
                            .then(() => message.channel.send('Новый персонаж создан'))
                    } else if (command === 'magic') {
                        await addMagic(...charArgs) // name (персонажа), title, mp, school, level, about
                            .catch(() => message.channel.send(
                                errorMessage))
                            .then(() => message.channel.send(`Новый скилл добалвен персонажу ${charArgs[0]}`))
                    }
                break
            case 'inv':

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