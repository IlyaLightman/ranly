const Character = require('./dnds/Character')
const fs = require('fs')
const { create, addMagic, addSkills } = require('./dnds/char')

const validActions = ['char', 'inv', 'coin']
const validCommands = ['add', 'list', 'create']

module.exports = {
    name: 'dnd',
    description: 'Для описания этого всего не хватит одной строчки',
    args: true,
    async execute(message, args) {
        const action = args[0] // char, inv, coin
        const command = args[1] // add, list, check

        if (!(validActions.includes(action) && validCommands.includes(command))) return



        const data = await Character.getAll()

        console.log(data)
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
