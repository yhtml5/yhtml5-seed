import * as actions from '../../actions/estateManager/serveManager';
const initialState = {
	loading: false,
	data: [],
	parentList:[],
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

		case actions.SERVERCHECK_REQUEST:
			return Object.assign({}, state, {
				loading: true
			});
		case actions.SERVERCHECK_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
			});
		case actions.SERVERCHECK_FAILED:
			return Object.assign({}, state, {
				loading: false,
			});

		case actions.PARENTNAME_REQUEST:
			return Object.assign({}, state, {
				loading: true
			});
		case actions.PARENTNAME_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				parentList:action.data.data
			});
		case actions.PARENTNAME_FAILED:
			return Object.assign({}, state, {
				loading: false,
			});
		default:
			return state;
	}
}
