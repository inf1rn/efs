import { cloneDeep } from "lodash"

export function changePropertyById(objects, objectId, newObjectData, property) {
    objects = cloneDeep(objects)
    const object = objects.find(object => object.id == objectId)
    object[property] = newObjectData[property]
    return objects
}