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
        const description = about.join(' ')
        const magic = { title, mp, school, level, description }

        const character = await Character.getByName(name)

        character.magic.push(magic)

        await Character.characterUpdate(name, character)
            .then(() => resolve())
            .catch(err => reject(err))
    })
}

async function addSkill(name, title, type, ...about) {
    return new Promise(async (resolve, reject) => {
        const description = about.join(' ')
        const skill = { title, type, description }

        const character = await Character.getByName(name)

        character.skills.push(skill)

        await Character.characterUpdate(name, character)
            .then(() => resolve())
            .catch(err => reject(err))
    })
}

async function setStat(name, stat, value) {
    return new Promise(async (resolve, reject) => {
        const character = await Character.getByName(name)
        try {
            character.stats[stat] = value
            await Character.characterUpdate(name, character)
                .then(() => resolve())
                .catch(err => reject(err))
        } catch (err) {
            reject(err)
        }
    })
}

async function setStats(name, charm, dexterity, intelligence, physique, strength, wisdom) {
    return new Promise(async (resolve, reject) => {
        try {
            const character = await Character.getByName(name)
            const stats = {charm, dexterity, intelligence, physique, strength, wisdom}

            character.stats = stats
            await Character.characterUpdate(name, character)
                .then(() => resolve())
                .catch(err => reject(err))
        } catch (err) {
            reject(err)
        }
    })
}

async function setBase(name, characteristic, value) {
    return new Promise(async (resolve, reject) => {
        const character = await Character.getByName(name)

        try {
            character[characteristic] = value // lvl, maxHP, maxMP, name, race

            await Character.characterUpdate(name, character)
                .then(() => resolve())
                .catch(err => reject(err))
        } catch (err) {
            reject(err)
        }
    })
}

async function deleteCharacter(name) {
    return new Promise(async (resolve, reject) => {
        await Character.delete(name)
            .then(() => resolve())
            .catch(err => reject(err))
    })
}

module.exports = {
    create,
    addMagic,
    addSkill,
    setStat,
    setStats,
    setBase,
    deleteCharacter
}