import * as actions from '../../actions/estateManager/serveManagerUpdate';
const initialState = {
	loading: false,
	parentList:[],
	info: '',
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

    case actions.SERVERSHOW_REQUEST:
			return Object.assign({}, state, {
				loading: true
			});
		case actions.SERVERSHOW_SUCCESS:
			action.data.data.img_url=[{
					uid: -1,
					name: 'logo.png',
					status: 'done',
					url:action.data.data.img_url,
			}];
			return Object.assign({}, state, {
				loading: false,
				info: action.data.data
			});
		case actions.SERVERSHOW_FAILED:
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
