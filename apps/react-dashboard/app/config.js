function config() {
  let isMock = false
  return {
    entryUrl: '/',
    title: 'XXXX管理系统',
    subTitle: '管',
    copyright: 'xxxx.com',
    environment: [{
      title: 'development',
      host: 'localhost:9999',
      api: (isMock) ? 'mock.yhtml5.com' : ''
    }, {
      name: 'test',
      host: 'test.yhtml5.com',
      api: '//116.62.92.115:72'
    }, {
      name: 'production',
      host: 'pro.yhtml5.com',
      api: '//116.62.92.115:73'
    }],
    root: {
      name: 'yhtml5',
      password: '123456'
    },
    cookie: {
      token: 'Hs6qoOHka3s78dbT',
      userId: ''
    },
    siteMap: [
      {
        key: '2',
        name: '页面管理',
        icon: 'home',
      }, {
        key: '3',
        name: '内容管理',
        icon: 'book',
      }, {
        key: '20',
        name: '导航20',
        pathname: '/navigation',
        items: [{
          name: '新增',
          pathname: '/add'
        }, {
          name: '编辑',
          pathname: '/edit',
        }]
      }, {
        key: '21',
        name: '导航21',
        pathname: '/navigation',
        items: [{
          name: '新增',
          pathname: '/add'
        }, {
          name: '编辑',
          pathname: '/edit',
        }]
      }, {
        key: '22',
        name: '导航22',
        pathname: '/navigation',
        items: [{
          name: '新增',
          pathname: '/add'
        }, {
          name: '编辑',
          pathname: '/edit',
        }]
      }, {
        key: '23',
        name: '导航23',
        pathname: '/navigation',
        items: [{
          name: '新增',
          pathname: '/add'
        }, {
          name: '编辑',
          pathname: '/edit',
        }]
      }, {
        key: '30',
        name: '导航30',
        pathname: '/navigation',
        items: [{
          name: '新增',
          pathname: '/add'
        }, {
          name: '编辑',
          pathname: '/edit',
        }]
      }]
  }
}

function searchMenuWithKey(key) {
  let keyIndex = 0
  config().siteMap.forEach((value, index) => {
    if (value.key === key) {
      return keyIndex = index
    }
  })
  return config().siteMap[keyIndex]
}

function getApiUrl() {
  let env = config().environment.find((value, index) => value.host === window.location.host)
  return (env)
    ? env.api
    : config().environment[0].api
}

export {config, getApiUrl, searchMenuWithKey}
