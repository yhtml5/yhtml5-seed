import * as actions from '../../actions/estateManager/estateCompanyManager';
const initialState = {
  loading: false,
  data: [],
  paginationTotal: 0
};
export default function index(state = initialState, action = {}) {
    switch (action.type) {
        case actions.COMPANYLIST_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case actions.COMPANYLIST_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                data: action.data.data.list,
                paginationTotal: action.data.data.totals
            });
        case actions.COMPANYLIST_FAILED:
            return Object.assign({}, state, {
                loading: false,
            });
        case actions.COMPANYOPENDOWN_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case actions.COMPANYOPENDOWN_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                openDownInfo : action.data
            });
        case actions.COMPANYOPENDOWN_FAILED:
            return Object.assign({}, state, {
                loading: false,
            });
        default:
            return state;
    }
}
