import {UpdateState} from './action'
import initialState from './state'

function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case UpdateState:
      return {...state, ...action.payload}
    case 'UpdatePathname':
      return {
        ...state,
        pathnameCurrent: action.payload,
        pathnameChange: action.payload !== state.pathnameCurrent
      }
    default:
      return state;
  }
}
export default reduce
