import {validator} from  '../../app/validator'

function isBuildingsEmpty(buildings2) {
  if (validator.isArrayEmpty(buildings2)) {
    return true
  } else {
    return buildings2.every((element, index, array) => validator.isArrayEmpty(element.children))
  }
}

export {isBuildingsEmpty}
