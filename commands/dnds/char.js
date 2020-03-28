const Character = require('./Character')
// Функции для комманды char (Персонаж)

// &dnd char create Devitt 40 60 6 3 3 20 3 14 3 yes Human Местный Букер Девитт
async function create(
    name, maxHP, maxMP, lvl,
    strength, dexterity, intelligence, physique, wisdom, charm,
    isMagic, race, lore
) {
    return new Promise((resolve, reject) => {
        const baseStats = {
            strength, dexterity, intelligence, physique, wisdom, charm
        }

        const charObj = new Character(
            name, maxHP, maxMP, lvl, baseStats, []
        )

        charObj.save().then(() => resolve()).catch(err => reject(err))
    })

}

async function addMagic(args) {

}

async function addSkills(args) {

}

module.exports = {
    create
}