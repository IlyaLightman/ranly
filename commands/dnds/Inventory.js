const axios = require('axios')
require('dotenv').config()
const dburl = process.env.DND_DATABASE

class Inventory {
    constructor(title, items, money) {
        this.title = title
        this.items = items
        this.money = money
    }

    async save() {
        const inventory = this

        await axios.post(`${dburl}/dnd/inventories.json`, inventory).catch(console.log)
    }

    static async inventoryUpdate(title, inventory) {
        const id = await Inventory.keyByTitle(title)
        const url = `${dburl}/dnd/inventories/${id}.json`

        await axios.put(url, inventory)
    }

    static async getAll(addPath = '/inventories') {
        const response = await axios.get(`${dburl}/dnd${addPath}.json`)

        return response.data
    }

    static async getByTitle(title) {
        const data = await Inventory.getAll()
        const inventory = Object.values(data).find(inv => inv.title === title)

        return inventory
    }

    static async keyByTitle(title) {
        const data = await Inventory.getAll('/inventories')

        let keyId = -1
        Object.values(data).find(inv => {
            keyId++
            return inv.title === title
        })
        const invKey = Object.keys(data)[keyId]

        return invKey
    }

    static async inventoriesTitles() { // Возвращает массив имён всех персонажей
        const titles = []
        const inventories = (await axios.get(`${dburl}/dnd/inventories.json`)).data

        Object.values(inventories).forEach(inv => titles.push(inv.title))

        return titles
    }
}

module.exports = Inventory