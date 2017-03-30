import {UpdateState} from './action';

const initialState = {
  userIdCurrent: '',
  userStatusCurrent: '',
  userMenus: [],
  userMenusLoading: false,
  userCommunities: [],
  userCommunitiesLoading: false,
  searchUser: '',
  searchButtonConfirmLoading: false,
  searchButtonResetLoading: false,
  modalStatusButtonLoading: false,
  managerId: '',
  tableData: [],
  tableLoading: false,
  tableTotals: 0,
  tableCurrent: 1,
  tablePageSize: 10,
  addFormName: '',
  addFormSex: undefined,
  addFormPhone: '',
  addButtonSaveLoading: false,
  addMenusCurrent: [],
  addCommunitiesCurrent: [],
  editFormName: '',
  editFormSex: undefined,
  editFormPhone: '',
  editFormLoading: false,
  editButtonSaveLoading: false,
  editMenusCurrent: [],
  editCommunitiesCurrent: [],
}

export default function index(state = initialState, action = {}) {
  switch (action.type) {
    case UpdateState:
      return Object.assign({}, state, action.payload)
    default:
      return state;
  }
}
