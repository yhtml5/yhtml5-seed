import ajax from  '../../util/ajax'

/**
 * Todo Mapping Parameters
 *
 * @param {object} params
 * @param {function} dispatch
 */

async function ajaxLogin(params, dispatch) {
  await new Promise((resolve) =>
    ajax(
      'property/site/menus',
      {
        name: params.LoginName,
        password: params.LoginPassword,
      },
      () => resolve(),
      () => resolve(),
      (response) => {
        return resolve()
      }
    )
  )
}

export {ajaxLogin}
