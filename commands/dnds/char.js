const Character = require('./Character')
// Функции для комманды char (Персонаж)

// &dnd char create Devitt 40 60 6 3 3 20 3 14 3 yes Human Местный Букер Девитт
async function create(
    name, maxHP, maxMP, lvl,
    strength, dexterity, intelligence, physique, wisdom, charm,
    isMagic, race
) {
    return new Promise(async (resolve, reject) => {
        const baseStats = {
            strength, dexterity, intelligence, physique, wisdom, charm
        }

        isMagic === 'yes' ? isMagic = true : isMagic = false

        const charObj = new Character(
            name, maxHP, maxMP, lvl, baseStats, isMagic, race,[''], ['']
        )

        await charObj.save().catch(err => reject(err)).then(() => resolve())
    })
}

async function addMagic(name, title, mp, school, level, about) {
    return new Promise(async (resolve, reject) => {
        const magic = { title, mp, school, level, about }
        const character = await Character.getByName(name)

        character.magic.push(magic)
        console.log(character)

        await Character.update(character)
            .catch(err => reject(err))
            .then(() => resolve())
    })
}

async function addSkills(name, args) {

}

module.exports = {
    create,
    addMagic,
    addSkills
}