import {RenderTable, UpdateState, UpdateBuildings} from './action';

const initialState = {
  isTask: false,
  taskId: '',
  buildings: [],
  buildings2: [],
  formProjectId: '',
  formProjects: [],
  formFormulaId: '',
  formFormulas: [],
  formTimeStart: '',
  formTimeEnd: '',
  tableLoading: false,
  tableData: [],
  tableTotals: 0,
  tableCurrent: 1,
  tableRow: 10,
  tableAmount: '',
  searchSelectStatus: [],
  step: 0,
  selectorsLoading: false,
  step2ButtonNextLoading: false,
  step2SelectProjectLoading: false,
  step2SelectFormulaLoading: false,
  step3ButtonConfirmLoading: false,
  step3ButtonCancelLoading: false,
};

export default function index(state = initialState, action = {}) {
  switch (action.type) {
    case UpdateState:
      return Object.assign({}, state, action.payload)
    case UpdateBuildings:
      return Object.assign({}, state, action.payload)
    case RenderTable:
      return Object.assign({}, state, {
        tableAmount: action.payload.paid_amount,
        tableTotals: Number(action.payload.tableTotals),
        tableData: action.payload.lists,
        tableLoading: false
      })
    default:
      return state;
  }
}
