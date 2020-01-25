/* Functions for handling graphql data nodes. Assumes nodes have ids. */

export function containsNode(nodeList, node) {
    for (let i=0; i < nodeList.length; i++) {
        if (node.id === nodeList[i].id) {
            return true;
        }
    }
    return false;
}

export function removeById(thingsWithIds, id) {
    let idxToRemove;
    for (let i=0; i < thingsWithIds.length; i++) {
        if (thingsWithIds[i].id === id) {
            idxToRemove = i;
            break;
        }
    }
    if (idxToRemove !== null) {
        return thingsWithIds.filter((_, i) => i !== idxToRemove);
    }
    throw new Error(
        "When trying to remove it, no item with id " + id + " existed in:",
        thingsWithIds);
}

export function getFromId(id, thingsWithIds) {
    for (let i=0; i < thingsWithIds.length; i++) {
        if (thingsWithIds[i].id === id) {
            return thingsWithIds[i];
        }
    }
    throw new Error(
        "No item with id " + id + " existed in:", thingsWithIds);
}

