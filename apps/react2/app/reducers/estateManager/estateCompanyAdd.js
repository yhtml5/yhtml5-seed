import * as actions from '../../actions/estateManager/estateCompanyAdd';
const initialState = {
	loading: false,
  parentList: [],
};
export default function index(state = initialState, action = {}) {
	switch (action.type) {
    case actions.COMPANYPARENT_REQUEST:
        return Object.assign({}, state, {
            loading: true
        });
    case actions.COMPANYPARENT_SUCCESS:
        return Object.assign({}, state, {
            loading: false,
            parentList : action.data.data
        });
    case actions.COMPANYPARENT_FAILED:
        return Object.assign({}, state, {
            loading: false,
        });
    case actions.COMPANYUPDATE_REQUEST:
        return Object.assign({}, state, {
            loading: true
        });
    case actions.COMPANYUPDATE_SUCCESS:
        return Object.assign({}, state, {
            loading: false,
        });
    case actions.COMPANYUPDATE_FAILED:
        return Object.assign({}, state, {
            loading: false,
        });
		default:
			return state;
	}
}
