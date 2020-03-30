const fs = require('fs')
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

    static async update(name, toAdd, pathAdd) {
        const id = await Character.keyByName(name)

        const url = `${dburl}/dnd/characters/${id}${pathAdd}.json`

        await axios.post(url, toAdd)
    }

    static async getAll(addPath = '') {
        const response = await axios.get(`${dburl}/dnd${addPath}.json`)

        return response.data
    }

    static async getByName(name) {
        const data = await Character.getAll('/characters')
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
}

module.exports = Character