export default function getItemAndItemIndexByID(allItems, itemID) {
    let item, itemIndex

    for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].id === itemID) {
            item = allItems[i]
            itemIndex = i
            break
        }
    }

    return { item, itemIndex }
}