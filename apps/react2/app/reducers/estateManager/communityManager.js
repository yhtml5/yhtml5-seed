import * as actions from '../../actions/estateManager/communityManager';
const initialState = {
    loading: false,
    data: [],
    parentList:[],
    treeData:[],
    options:[],
    paginationTotal: 0
};
export default function index(state = initialState, action = {}) {
    switch (action.type) {
        case actions.GETLIST_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case actions.GETLIST_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                data: action.data.data.list,
                paginationTotal: action.data.data.totals
            });
        case actions.GETLIST_FAILED:
            return Object.assign({}, state, {
                loading: false,
            });
        case actions.STATUSCHANGE_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case actions.STATUSCHANGE_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                data: action.data.data.list
            });
        case actions.STATUSCHANGE_FAILED:
            return Object.assign({}, state, {
                loading: false,
            });
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
        console.log(action.data.data)
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
        default:
            return state;
    }
}
