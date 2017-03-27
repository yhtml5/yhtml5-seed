import * as actions from '../../actions/estateManager/serveManagerAdd';
const initialState = {
	loading: false,
	parentList:[],
	uploadToken: '',
};
export default function index(state = initialState, action = {}) {
	switch (action.type) {
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

		case actions.SERVERUPDATE_REQUEST:
			return Object.assign({}, state, {
				loading: true
			});
		case actions.SERVERUPDATE_SUCCESS:
			return Object.assign({}, state, {
				loading: false
			});
		case actions.SERVERUPDATE_FAILED:
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
