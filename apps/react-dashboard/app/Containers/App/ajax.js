import ajax from  '../../util/ajax'
import {config} from '../../config'
import {updateState} from './task'

/**
 * Todo Mapping Parameters
 *
 * @param {object} params
 * @param {function} dispatch
 */


const mock = [{
  "key": "2",
  "children": [{"key": "20"}, {"key": "21"}, {"key": "22"}]
}, {
  "key": "3",
  "children": [{"key": "30"}, {"key": "31"}, {"key": "32"}]
}]


const ajaxPermissions = (params, dispatch) =>
  new Promise((resolve) => {
      dispatch(updateState({permissions: mock}))
      resolve()
      // ajax(
      //   'property/site/menus',
      //   {
      //     name: params.LoginName,
      //     password: params.LoginPassword,
      //   },
      //   () => resolve(),
      //   () => resolve(),
      //   (response) => {
      //     return resolve()
      //   }
      // )
    }
  )


export {ajaxPermissions}
