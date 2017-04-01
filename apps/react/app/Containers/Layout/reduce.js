import {UpdateState, ToggleSider} from './action'
import initialState from './state'

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case UpdateState:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}
