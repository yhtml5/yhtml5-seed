import * as actions from '../actions/public';
const initialState = {};

export default function index(state = initialState, action = {}) {
  switch (action.type) {
    case actions.LOGOUT:
      return Object.assign({}, state, {
        loadingTable: true,
        loadingButtonSearch: true
      });
    case actions.RESET_PASSWORD:
      return Object.assign({}, state, {
      });
    case actions.RESET_PASSWORD_SUCCESS:
      return Object.assign({}, state, {

      });
    case actions.RESET_PASSWORD_FAILED:
      return Object.assign({}, state, {
        loadingTable: true,
        loadingButtonSearch: true
      });
    default:
      return state;
  }
}
