import * as actions from '../../actions/payment/payment';
const initialState = {
  data: [],
  dataDetails: {},
  dataSelectService: [],
  loading: false,
  loadingButtonSearch: false,
  loadingTable: false,
  paginationTotal: 0,
  paginationCurrent: 1,
  selectService: [],
  sumAmount: '',
};

export default function index(state = initialState, action = {}) {
  switch (action.type) {
    case actions.GET_LIST:
      return Object.assign({}, state, {
        loadingTable: true,
        loadingButtonSearch: true
      });
    case actions.GET_LIST_SUCCESS:
      return Object.assign({}, state, {
        loadingTable: false,
        loadingButtonSearch: false,
        data: action.data.data.lists,
        paginationTotal: Number(action.data.data.totals),
        sumAmount: action.data.data.sum_amount,
      });
    case actions.GET_LIST_FAILED:
      return Object.assign({}, state, {
        loadingTable: false,
        loadingButtonSearch: false,
      });
    case actions.GETLISTDETAILS_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case actions.GETLISTDETAILS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        dataDetails: action.data.data
      });
    case actions.GETLISTDETAILS_FAILED:
      return Object.assign({}, state, {
        loading: false,
      });
    case actions.GET_SERVICE_SERVICE:
      return Object.assign({}, state, {
        loading: true
      });
    case actions.GET_SERVICE_BILL_LIST:
      return Object.assign({}, state, {
        loading: true
      });
    case actions.GET_SERVICE_BILL_LIST_SUCCESS:
      return Object.assign({}, state, {
        dataSelectService: action.data.data
      });
    case actions.GET_SERVICE_BILL_LIST_FAILED:
      return Object.assign({}, state, {
        loading: false,
      });
    case actions.EXPORT_REPORT:
      return Object.assign({}, state, {});
    case actions.EXPORT_REPORT_SUCCESS:
      return Object.assign({}, state, {});

    default:
      return state;
  }
}
