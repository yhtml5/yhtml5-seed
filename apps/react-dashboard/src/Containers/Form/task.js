// import { message } from 'antd'
// import { history } from '../../redux/store'
// import { isObject, isArrayEmpty} from '../../util/validator'
// import { UpdateState } from './action'
// import {
//   ajaxList, ajaxToggleStatus,
//   ajaxAdd, ajaxEdit, ajaxEditInfo,
// } from './ajax'

// /* ===== base =====*/

// function updateState(data) {
//   if (isObject(data)) {
//     return {
//       type: UpdateState,
//       payload: data
//     }
//   } else {
//     console.error('action updateState params must be a object')
//   }
// }

// const init = (value) =>
//   async (dispatch, getState) => {
//     process.env.NODE_ENV === 'production' || console.log('initPackages', getState())
//     const params = getState().packages
//     const params2 = getState().app

//     if (isArrayEmpty(params.modalColumnsStyles)) {
//       ajaxColumnStyles(dispatch)
//         .catch((err) => console.error(err))
//     }

//     switch (value) {
//       case 'add':
//         dispatch(updateState({
//           formType: 'add',
//           formStatus: undefined,
//           formIsReco: undefined,
//           headerPreviewDisabled: true,
//           headerOnlineDisabled: true,
//           headerRecommendDisabled: true,
//           modalColumsId: undefined,
//           columnsStyles: []
//         }))
//         break
//       case 'edit':
//         if (!params.formId) {
//           console.warn(params.formId, !params.formId)
//           setTimeout(() => history.push('/packages'))
//           return
//         }
//         dispatch(checkColumn())
//         dispatch(updateState({
//           formType: 'edit',
//           //headerPreviewDisabled: false,
//           //headerOnlineDisabled: false,
//           //headerRecommendDisabled: false,
//           modalColumsId: undefined,
//         }))
//         break
//       default:
//         dispatch(updateState({
//           tableLoading: true
//         }))
//         await ajaxList(dispatch, {
//           ...params,
//           ...params2
//         }).catch((err) => console.error(err))

//         dispatch(updateState({
//           tableLoading: false,
//           columnsStyles: [],
//           formId: false,
//           packageId: '',
//           formType: 'default',
//           formStatus: undefined,
//           formIsReco: undefined,
//           formName: '',
//           formSort: '',
//           formImage: [],
//           formPrice: '',
//           formQuota: '',
//           formSurplus: '',
//           formSaveLoading: false,
//           formSaveDisabled: false,
//           formAddColumnLoading: false,
//         }))
//         break
//     }
//   }

// /* ===== index =====*/

// const toggleStatus = (id, status) =>
//   async (dispatch, getState) => {
//     process.env.NODE_ENV === 'production' || console.log('toggleStatus', id, status)
//     const params = getState().packages
//     const type = getState().packages.formType

//     await ajaxToggleStatus(id, status)
//       .catch((err) => console.error(err))

//     if (history.location.pathname === '/packages') {
//       dispatch(updateState({
//         tableLoading: true
//       }))
//       await ajaxList(dispatch, {
//         ...params
//       })
//         .catch((err) => console.error(err))
//       dispatch(updateState({
//         tableLoading: false
//       }))
//     }

//     if (type === 'edit' || type === 'add') {
//       await ajaxEditInfo(dispatch, id)
//         .catch((err) => console.error(err))
//     }

//   }

// /* ===== add/edit =====*/

// const add = (value) =>
//   async (dispatch, getState) => {
//     process.env.NODE_ENV === 'production' || console.log('add', getState(), value)

//     dispatch(updateState({
//       formSaveLoading: true
//     }))
//     const params = getState().packages

//     await ajaxAdd(dispatch, {
//       ...value
//     })
//       .then(() => {
//         dispatch(updateState({ formSaveDisabled: true }))
//         dispatch(checkColumn())
//         // message.destroy()
//         message.success('新增成功')
//       })
//       .catch((err) => console.error(err))

//     dispatch(updateState({
//       formSaveLoading: false
//     }))

//   }

// const toEdit = (id) =>
//   async (dispatch, getState) => {
//     console.log('toEdit', getState(), id)

//     dispatch(updateState({
//       formId: id,
//       packageId: id,
//       formChannel: undefined,
//       formColumn: undefined,
//       formLabel: undefined,
//     }))

//     history.push('/packages/edit')

//     await ajaxEditInfo(dispatch, id)
//       .then(() => {
//         dispatch(checkColumn())
//       })
//       .catch((err) => console.error(err))

//     // dispatch(updateState({modalLoading: false,}))
//   }

// const edit = (value) =>
//   async (dispatch, getState) => {
//     console.log('edit', getState(), value)
//     const id = getState().packages.packageId

//     dispatch(updateState({
//       formSaveLoading: true
//     }))

//     await ajaxEdit(dispatch, {
//       ...value,
//       id
//     })
//       .then(() => {
//         message.success('编辑成功')
//         dispatch(updateState({}))
//       })
//       .catch((err) => console.error(err))

//     dispatch(updateState({
//       formSaveLoading: false,
//     }))
//   }

// export {
//   updateState,
//   init,
//   toggleStatus,
//   add,
//   edit,
//   toEdit,
// }
