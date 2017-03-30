import {RenderTable, UpdateState} from './action';

const initialState = {
  tableLoading: false,
  tableExportLoading: false,
  totals: 1,
  current: 1,
  amount: '',
  list: [],
  number: '',
  timeStart: '',
  timeEnd: ''
};

export default function index(state = initialState, action = {}) {
  switch (action.type) {
    case UpdateState:
      return Object.assign({}, state, action.payload)
    case RenderTable:
      return Object.assign({}, state, {
        amount: action.payload.paid_amount,
        totals: Number(action.payload.totals),
        list: action.payload.lists,
        tableLoading: false
      })
    default:
      return state;
  }
}
