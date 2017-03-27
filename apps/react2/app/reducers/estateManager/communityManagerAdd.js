import * as actions from '../../actions/estateManager/communityManagerAdd';
const initialState = {
  loading: false,
  data: [],
  parentList: [],
  treeData: [],
  options: [],
  uploadToken: '',
};
export default function index(state = initialState, action = {}) {
  switch (action.type) {
    case actions.GETAREA_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case actions.GETAREA_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        options: action.data.data
      });
    case actions.GETAREA_FAILED:
      return Object.assign({}, state, {
        loading: false,
      });
    case actions.GETSERVERLIST_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case actions.GETSERVERLIST_SUCCESS:
      console.log("action.data")
      return Object.assign({}, state, {
        loading: false,
        treeData: action.data.data
      });
    case actions.GETSERVERLIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
      });
    case actions.GETCOMPANYLIST_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case actions.GETCOMPANYLIST_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        parentList: action.data.data
      });
    case actions.GETCOMPANYLIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
      });
    case actions.UPDATECOMMUNITY_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
      });
    case actions.UPDATECOMMUNITY_FAILED:
      return Object.assign({}, state, {
        loading: false,
      });
    case actions.GETUPLOADTOKEN_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case actions.GETUPLOADTOKEN_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        uploadToken: action.data.data
      });
    case actions.GETUPLOADTOKEN_FAILED:
      return Object.assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
