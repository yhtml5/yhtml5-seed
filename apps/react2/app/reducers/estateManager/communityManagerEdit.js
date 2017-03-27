import * as actions from '../../actions/estateManager/communityManagerEdit';
const initialState = {
  loading: false,
  data: [],
  parentList: [],
  treeData: [],
  options: [],
  info: '',
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
    case actions.COMMUNITYSHOW_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case actions.COMMUNITYSHOW_SUCCESS:
      var provinces_id = action.data.data.city_id.slice(0, 2)
      var city_id = action.data.data.city_id;
      action.data.data.city_id = [];
      action.data.data.city_id = [provinces_id, city_id];
      for (var i = 0; i < action.data.data.service_list.length; i++) {
        action.data.data.service_list[i] = action.data.data.service_list[i].service_id
      }
      action.data.data.logo_url = [{
        uid: -1,
        name: 'logo.png',
        status: 'done',
        url: action.data.data.logo_url,
      }]
      for (var i = 0; i < action.data.data.img_list.length; i++) {
        action.data.data.img_list[i].url = action.data.data.img_list[i].img_url;
        action.data.data.img_list[i].name = "img" + i;
        action.data.data.img_list[i].status = 'done';
        action.data.data.img_list[i].uid = i - 1;
        delete action.data.data.img_list[i].img_url;
      }
      return Object.assign({}, state, {
        loading: false,
        info: action.data.data,
      });

    case actions.COMMUNITYSHOW_FAILED:
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
