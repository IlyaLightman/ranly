const Inventory = require('./Inventory')
// Функции для комманды inv (Инвентарь)

// async function isInventoryExist(title) {
//     const titles = await Inventory.inventoriesTitles()
//     if (titles.includes(title)) {
//         return true
//     } else return false
// }

// $dnd inv create Potions
async function create(title) {
    return new Promise(async (resolve, reject) => {
        const inventory = new Inventory(title, [''], 0)

        await inventory.save()
            .then(() => resolve())
            .catch(err => reject(err))
    })
}

async function addItem(inv, title, about) { //$dnd inv add <inv name> <item title> <item description>
    return new Promise(async (resolve, reject) => {
        const item = { title, about }

        const inventory = await Inventory.getByTitle(inv)
        inventory.items.push(item)

        await Inventory.inventoryUpdate(inv, inventory)
            .then(resolve)
            .catch(reject)
    })
}

module.exports = {
    create,
    addItem
}