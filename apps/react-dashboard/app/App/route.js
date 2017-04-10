// import {ajaxMenus, changeMenus, verifyPermissions} from './task';
// import {getFormulaList} from '../containers/FormulaManagement/task'
// import {searchParkingFee} from '../containers/ParkingFee/task'
// import {initializeGenerateBill, ajaxGetFormulas, ajaxGetBuildings, ajaxGetService, ajaxViewBill, ajaxDetectionBill} from '../containers/GenerateBill/task'
// import {ajaxUserManagementList, initializeUserManagement} from '../containers/UserManagement/task'
// import {ajaxManageMenus, ajaxManageCommunities} from '../containers/UserManagement/task'
// import {browserHistory} from 'react-router-dom'
//
// function routeChange(history, store) {
//   // console.clear()
//   console.group('router')
//   console.warn('history', history)
//   console.warn('store', store)
//   console.warn('state', store.getState())
//   console.warn(history.getCurrentLocation().pathname)
//
//   function listener() {
//     let pathname = history.getCurrentLocation().pathname
//     store.dispatch({type: 'UpdatePathname', payload: pathname})
//     console.warn('routeChange')
//     if (store.getState().app.pathnameChange) {
//       console.warn('routeChangeTrue')
//       store.dispatch(ajaxMenus())
//       store.dispatch(changeMenus(pathname))
//       switch (pathname) {
//         case '/parkingFee':
//           store.dispatch(searchParkingFee())
//           break
//         case '/formulaManagement':
//           store.dispatch(getFormulaList())
//           break
//         case '/generateBill/step1':
//           store.dispatch(initializeGenerateBill('step1'))
//           break
//         case '/generateBill/step2':
//           store.dispatch(initializeGenerateBill('step2'))
//           break
//         case '/generateBill/step3':
//           store.dispatch(initializeGenerateBill('step3'))
//           break
//         case '/generateBill/bill':
//           store.dispatch(initializeGenerateBill('bill'))
//           break
//         case '/userManagement':
//           store.dispatch(initializeUserManagement())
//           store.dispatch(ajaxUserManagementList())
//           break
//         case '/userManagement/userAdd':
//           store.dispatch(ajaxManageMenus())
//           store.dispatch(ajaxManageCommunities())
//           break
//         case '/userManagement/userEdit':
//           store.dispatch(ajaxManageMenus())
//           store.dispatch(ajaxManageCommunities())
//           break
//         default:
//           break
//       }
//     }
//   }
//
//   listener()
//   history.listen(listener)
//   console.groupEnd()
// }
//
// export {routeChange}
