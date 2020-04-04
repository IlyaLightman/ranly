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
        const inventory = new Inventory(title, '')

        await inventory.save()
    })
}

async function addItem(inv, title, about) {

}