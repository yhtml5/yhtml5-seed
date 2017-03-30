import {Modal, message, notification} from 'antd';
import {UpdateState} from './action'
import {getCookie} from  '../../app/cookie'
import {ajax} from '../../app/ajax'
import {validator} from  '../../app/validator'
import {history} from '../../store/index'

function updateState(data) {
  return {
    type: UpdateState,
    payload: data
  }
}

function initializeUserManagement() {
  return (dispatch, getState) => {
    dispatch(updateState({
      tableCurrent: 1
    }))
  }
}

function ajaxUserManagementList() {
  return (dispatch, getState) => {
    dispatch(updateState({
      tableLoading: true,
    }))
    ajax(
      'property/manage/list',
      {
        community_id: getCookie('_communityId'),
        page: getState().userManagement.tableCurrent,
        rows: getState().userManagement.tablePageSize,
        username: getState().userManagement.userName,
      },
      () => {
        dispatch(updateState({
          tableLoading: false,
          searchButtonConfirmLoading: false,
          searchButtonResetLoading: false
        }))
      },
      () => {
        dispatch(updateState({
          tableLoading: false,
          searchButtonConfirmLoading: false,
          searchButtonResetLoading: false
        }))
      },
      (response) => {
        dispatch(updateState({
          managerId: response.data.manager_id,
          tableData: response.data.list,
          tableTotals: Number(response.data.totals),
        }))
        setTimeout(() => {
          dispatch(updateState({
            tableLoading: false,
            searchButtonResetLoading: false,
            searchButtonConfirmLoading: false,
          }))
        }, 300)
      }
    )
  }
}

function ajaxChangeStatus(callback) {
  return (dispatch, getState) => {
    ajax(
      'property/manage/change-status',
      {
        is_enable: (getState().userManagement.userStatusCurrent == '1') ? '2' : '1',
        user_id: getState().userManagement.userIdCurrent,
      },
      () => {
        callback.reject()
        dispatch(updateState({
          userIdCurrent: '',
          userStatusCurrent: ''
        }))
      },
      () => {
        callback.reject()
        dispatch(updateState({
          userIdCurrent: '',
          userStatusCurrent: ''
        }))
      },
      (response) => {
        dispatch(updateState({
          userIdCurrent: '',
          userStatusCurrent: ''
        }))
        dispatch(ajaxUserManagementList())
        callback.resolve()
      }
    )
  }
}

function ajaxUserInfo() {
  return (dispatch, getState) => {
    dispatch(updateState({
      editFormLoading: true,
    }))
    ajax(
      'property/manage/show',
      {
        user_id: getState().userManagement.userIdCurrent,
      },
      () => {
        dispatch(updateState({
          editFormLoading: false,
        }))
      },
      () => {
        dispatch(updateState({
          editFormLoading: false,
        }))
      },
      (response) => {

        function mapAjaxToState(data) {
          return data.map((value, index) => {
            return value.id
          })
        }

        dispatch(updateState({
          editFormName: response.data.name,
          editFormSex: response.data.sex,
          editFormPhone: response.data.mobile,
          editFormLoading: false,
          editMenusCurrent: mapAjaxToState(response.data.menus),
          editCommunitiesCurrent: mapAjaxToState(response.data.communitys),
        }))
      }
    )
  }
}

function ajaxManageMenus() {
  return (dispatch, getState) => {
    dispatch(updateState({
      userMenusLoading: true
    }))
    ajax(
      'property/manage/menus',
      {},
      () => {
        dispatch(updateState({
          userMenusLoading: false
        }))
      },
      () => {
        dispatch(updateState({
          userMenusLoading: false
        }))
      },
      (response) => {
        dispatch(updateState({
          userMenus: response.data,
          userMenusLoading: false,
        }))
      }
    )
  }
}

function ajaxManageCommunities() {
  return (dispatch, getState) => {
    dispatch(updateState({
      userCommunitiesLoading: true
    }))
    ajax(
      'property/manage/communitys',
      {},
      () => {
        dispatch(updateState({
          userCommunitiesLoading: false
        }))
      },
      () => {
        dispatch(updateState({
          userCommunitiesLoading: false
        }))
      },
      (response) => {
        dispatch(updateState({
          userCommunities: response.data,
          userCommunitiesLoading: false,
        }))
      }
    )
  }
}

function ajaxAddUser() {
  return (dispatch, getState) => {
    dispatch(updateState({
      addButtonSaveLoading: true
    }))

    const params = getState().userManagement

    //simple
    Array.prototype.clone = function () {
      return this.slice(0)
    }
    const newMenus = params.addMenusCurrent.clone()
    const newCommunities = params.addCommunitiesCurrent.clone()
    if (newMenus.indexOf("all") >= 0) {
      newMenus.splice(newMenus.indexOf("all"), 1)
    }
    if (newCommunities.indexOf("all") >= 0) {
      newCommunities.splice(newCommunities.indexOf("all"), 1)
    }
    const newMenus2 = newMenus.map((value, index) => {
      return {menu_id: value}
    })
    const newCommunities2 = newCommunities.map((value, index) => {
      return {community_id: value}
    })
    //simple

    ajax(
      'property/manage/add',
      {
        community_ids: newCommunities2,
        menu_ids: newMenus2,
        mobile: params.addFormPhone,
        name: params.addFormName,
        sex: params.addFormSex
      },
      () => {
        dispatch(updateState({
          addButtonSaveLoading: false
        }))
      },
      () => {
        dispatch(updateState({
          addButtonSaveLoading: false
        }))
      },
      (response) => {
        history.push('/userManagement')
        message.success('新增用户成功', 4)
        dispatch(updateState({
            addButtonSaveLoading: false,
            userIdCurrent: '',
            addFormName: '',
            addFormSex: undefined,
            addFormPhone: '',
            addMenusCurrent: [],
            addCommunitiesCurrent: [],
          })
        )
      }
    )
  }
}

function ajaxEditUser() {
  return (dispatch, getState) => {
    dispatch(updateState({
      editButtonSaveLoading: true
    }))
    const params = getState().userManagement

    //simple
    Array.prototype.clone = function () {
      return this.slice(0)
    }
    const newMenus = params.editMenusCurrent.clone()
    const newCommunities = params.editCommunitiesCurrent.clone()
    if (newMenus.indexOf("all") > 0) {
      newMenus.splice(newMenus.indexOf("all"), 1)
    }
    if (newCommunities.indexOf("all") > 0) {
      newCommunities.splice(newCommunities.indexOf("all"), 1)
    }
    const newMenus2 = newMenus.map((value, index) => {
      return {menu_id: value}
    })
    const newCommunities2 = newCommunities.map((value, index) => {
      return {community_id: value}
    })
    //simple

    ajax(
      'property/manage/edit',
      {
        community_ids: newCommunities2,
        menu_ids: newMenus2,
        mobile: params.formPhone,
        name: params.formName,
        sex: params.formSex,
        user_id: params.userIdCurrent
      },
      () => {
        dispatch(updateState({
          editButtonSaveLoading: false
        }))
      },
      () => {
        dispatch(updateState({
          editButtonSaveLoading: false
        }))
      },
      (response) => {
        message.destroy()
        message.success('更新用户信息成功', 4)
        dispatch(updateState({
          editButtonSaveLoading: false
        }))
        history.push('/userManagement')
      }
    )
  }
}

/*======  business logic  ======*/

function searchUserManagement(userName) {
  return (dispatch, getState) => {
    dispatch(updateState({
      userName: userName,
      searchButtonConfirmLoading: true,
      tableCurrent: 1
    }))
    dispatch(ajaxUserManagementList())
  }
}

function resetUserManagement() {
  return (dispatch, getState) => {
    dispatch(updateState({
      userName: '',
      searchButtonResetLoading: true,
      tableCurrent: 1
    }))
    dispatch(ajaxUserManagementList())
  }
}

function changePage(current) {
  return (dispatch, getState) => {
    dispatch(updateState({
      tableCurrent: current,
      tableLoading: true
    }))
    dispatch(ajaxUserManagementList())
  }
}

function changeStatus(value, resolve, reject) {
  return (dispatch, getState) => {
    dispatch(updateState({
      userIdCurrent: value.id,
      userStatusCurrent: value.is_enable
    }))
    dispatch(ajaxChangeStatus({resolve, reject}))
  }
}

function addUser() {
  return (dispatch, getState) => {
    dispatch(updateState({
      userIdCurrent: '',
      formName: '',
      formSex: undefined,
      formPhone: '',
    }))
  }
}


function addUserCancel() {
  return (dispatch, getState) => {
    dispatch(updateState({
      add: {
        formName: '',
        formSex: undefined,
        formPhone: '',
        buttonSaveLoading: false,
        menusCurrent: [],
        communitiesCurrent: [],
      },
      userIdCurrent: '',
    }))
  }
}

function addUserSave(value) {
  return (dispatch, getState) => {
    const obj = getState().userManagement
    if (validator.isArrayEmpty(obj.addMenusCurrent)) {
      notification['warn']({
        key: 'menus',
        message: '提示',
        description: '请至少选择一个菜单权限',
        duration: 4,
      })
    } else if (validator.isArrayEmpty(obj.addCommunitiesCurrent)) {
      notification['warn']({
        key: 'communities',
        message: '提示',
        description: '请至少选择一个小区权限',
        duration: 4,
      })
    } else {
      dispatch(updateState({
        addFormName: value.name,
        addFormSex: value.sex,
        addFormPhone: value.phone,
      }))
      dispatch(ajaxAddUser())
    }
  }
}

function checkAddMenus(value) {
  console.log('checkAddMenus', value)
  return (dispatch, getState) => {
    dispatch(updateState({
      addMenusCurrent: value
    }))
  }
}

function checkAddCommunities(value) {
  return (dispatch, getState) => {
    dispatch(updateState({
      addCommunitiesCurrent: value
    }))
  }
}

function checkEditMenus(value) {
  console.log('checkEditMenus', value)
  return (dispatch, getState) => {
    dispatch(updateState({
      editMenusCurrent: value
    }))
  }
}

function checkEditCommunities(value) {
  return (dispatch, getState) => {
    dispatch(updateState({
      editCommunitiesCurrent: value
    }))
  }
}

function editUser(value) {
  return (dispatch, getState) => {
    dispatch(updateState({
      userIdCurrent: value.id,
    }))
    dispatch(ajaxUserInfo())
  }
}
function editUserSave(value) {
  return (dispatch, getState) => {
    const obj = getState().userManagement
    if (validator.isArrayEmpty(obj.editMenusCurrent)) {
      notification['warn']({
        key: 'menus',
        message: '提示',
        description: '请至少选择一个菜单权限',
        duration: 4,
      })
    } else if (validator.isArrayEmpty(obj.editCommunitiesCurrent)) {
      notification['warn']({
        key: 'communities',
        message: '提示',
        description: '请至少选择一个小区权限',
        duration: 4,
      })
    } else {
      dispatch(updateState({
        formName: value.name,
        formSex: value.sex,
        formPhone: value.phone,
      }))
      dispatch(ajaxEditUser())
    }
  }
}
function editUserCancel() {
  return (dispatch, getState) => {
    dispatch(updateState({
      add: {
        formName: '',
        formSex: undefined,
        formPhone: '',
        buttonSaveLoading: false,
        menusCurrent: [],
        communitiesCurrent: [],
      },
      userIdCurrent: '',
    }))
  }
}

function changeForm(value) {
  console.warn(value)
  return (dispatch, getState) => {
    if ('user' in value) {
      dispatch(updateState({formName: value.user.value}))
    }
    if ('sex' in value) {
      dispatch(updateState({formSex: value.sex.value}))
    }
    if ('phone' in value) {
      dispatch(updateState({formPhone: value.phone.value}))
    }
  }
}

export {
  ajaxUserManagementList, ajaxManageMenus, ajaxManageCommunities, ajaxUserInfo,
  initializeUserManagement, updateState, searchUserManagement, resetUserManagement, changePage, changeStatus,
  addUser, addUserSave, addUserCancel, checkAddMenus, checkAddCommunities,
  editUser, editUserSave, editUserCancel, checkEditMenus, checkEditCommunities, changeForm
}
