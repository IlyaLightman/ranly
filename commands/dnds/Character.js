const axios = require('axios')
require('dotenv').config()
const dburl = process.env.DND_DATABASE

class Character {
    constructor(name, maxHP, maxMP, lvl, stats, isMagic, race, skills, magic, about) {
        this.name = name // получается имя
        this.maxHP = maxHP
        this.maxMP = maxMP
        this.lvl = lvl
        this.stats = stats // Объект характеристик с их значением
        this.isMagic = isMagic
        this.race = race
        this.skills = skills // Массив навыков и заклинаний. Скил - объект с названием, описанием и уровнем у персонажа
        this.magic = magic
        this.about = about
    }

    async save() {
        const character = this

        await axios.post(`${dburl}dnd/characters.json`, character).catch(console.log)
    }

    static async characterUpdate(name, character) {
        const id = await Character.keyByName(name)
        const url = `${dburl}/dnd/characters/${id}.json`

        await axios.put(url, character)
    }

    static async getAll(addPath = '/characters') {
        const response = await axios.get(`${dburl}/dnd${addPath}.json`)

        return response.data
    }

    static async getByName(name) {
        const data = await Character.getAll()
        const character = Object.values(data).find(char => char.name === name)

        return character
    }

    static async keyByName(name) {
        const data = await Character.getAll('/characters')

        let keyId = -1
        Object.values(data).find(char => {
            keyId++
            return char.name === name
        })
        const charKey = Object.keys(data)[keyId]

        return charKey
    }

    static async delete(name) {
        const id = await this.keyByName(name)

        await axios.delete(`${dburl}/dnd/characters/${id}.json`)
    }

    static async charactersNames() { // Возвращает массив имён всех персонажей
        const names = []
        const characters = (await axios.get(`${dburl}/dnd/characters.json`)).data

        Object.values(characters).forEach(char => names.push(char.name))

        return names
    }
}

module.exports = Character