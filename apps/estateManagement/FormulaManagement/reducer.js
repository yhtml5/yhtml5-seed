import {
  ToggleFormulaAddModal, ToggleSubmitButtonLoading,
  SubmitFormula, RenderFormulaList, UpdateState
} from './action';

const initialState = {
  totals: 1,
  current: 1,
  list: [],
  visible: false,
  submitButtonLoading: false,
  formula: '',
  formulaName: '',
};

export default function index(state = initialState, action = {}) {
  switch (action.type) {
    case UpdateState:
      return Object.assign({}, state, action.payload)
    case ToggleFormulaAddModal:
      return Object.assign({}, state, {
        visible: action.payload
      })
    case SubmitFormula:
      return Object.assign({}, state, {})
    case RenderFormulaList:
      return Object.assign({}, state, {
        totals: Number(action.payload.totals),
        list: action.payload.list,
      })
    default:
      return state;
  }
}
