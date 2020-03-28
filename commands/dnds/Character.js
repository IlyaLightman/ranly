const fs = require('fs')
const axios = require('axios')
require('dotenv').config()
const dburl = process.env.DND_DATABASE

class Character {
    constructor(name, maxHP, maxMP, lvl, stats, skills) {
        this.name = name // получается имя
        this.maxHP = maxHP
        this.maxMP = maxMP
        this.lvl = lvl
        this.stats = stats // Объект характеристик с их значением
        this.skills = skills // Массив навыков и заклинаний. Скил - объект с названием, описанием и уровнем у персонажа
    }

    save(character) {
        return new Promise((resolve, reject) => {
            axios.post(`${dburl}/dnd/characters/`, character).catch(err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static async getAll() {
        const response = await axios.get(`${dburl}/dnd.json`)

        return response.data
    }

    static async getById(id) {
        const nickname = 'devitt' // Там будет массив и по нему будет искаться имя

        const response = await axios.get(`${dburl}/dnd/characters/${nickname}`)

        return response.data
    }
}

module.exports = Character