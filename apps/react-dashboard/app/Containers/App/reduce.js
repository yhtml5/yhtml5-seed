import {UpdateState} from './action'
import initialState from './state'

function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case UpdateState:
      return Object.assign({}, state, action.payload)
    case 'UpdatePathname':
      return Object.assign({}, state, {
        pathnameChange: action.payload !== state.pathnameCurrent,
        pathnameCurrent: action.payload
      })
    default:
      return state;
  }
}
export default reduce
