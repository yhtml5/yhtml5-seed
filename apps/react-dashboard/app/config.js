function config() {
  let isMock = false
  return {
    entryUrl: '/login',
    version: process.env.version ? process.env.version : '开发测试版',
    title: process.env.title ? process.env.title : 'Title',
    subTitle: '管',
    copyright: 'zje.com',
    environment: [{
      name: 'development',
      host: 'localhost:9999',
      api: (isMock) ? '//192.168.1.89:8077/mockjsdata/33' : '//192.168.1.105:1111'
    }, {
      name: 'test',
      host: 'httest.ejz99.com',
      api: '//192.168.1.105:1111'
    }, {
      name: 'test2',
      host: '192.168.1.105:1113',
      api: '//192.168.1.105:1111'
    }, {
      name: 'production',
      host: 'houtai.ejz99.com',
      api: '//116.62.92.115:71'
    }],
    root: {
      name: 'yhtml5',
      password: '123456'
    },
    cookie: {
      token: 'Hs6qoOHka3s78dbT',
      tokenValue: 'yqwe0OdsD',
      userName: 'srdf',
      userValue: ''
    },
    siteMap: [{
      key: '1',
      name: '基础组件',
      icon: 'api',
    }, {
      key: '2',
      name: '页面管理',
      icon: 'home',
    }, {
      key: '3',
      name: '内容管理',
      icon: 'book',
    }, {
      key: '10',
      name: '表单与正则',
      pathname: '/form',
    }, {
      key: '20',
      name: '导航管理',
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
      name: '套餐管理',
      pathname: '/packages',
      items: [{
        name: '新增',
        pathname: '/add'
      }, {
        name: '编辑',
        pathname: '/edit',
      }]
    }, {
      key: '31',
      name: '直播管理',
      pathname: '/live',
      items: [{
        name: '新增',
        pathname: '/live/add'
      }, {
        name: '编辑',
        pathname: '/live/edit',
      }]
    }, {
      key: '36',
      name: '问答管理',
      pathname: '/question',
      items: [{
        name: '新增',
        pathname: '/question/add'
      }, {
        name: '编辑',
        pathname: '/question/edit',
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

function searchKetWithPathname() {
  // let index = config().siteMap.findIndex((value, index) => value.pathname === window.location.hash.split('#')[1])
  let index = config().siteMap.findIndex((value, index) => {
    const url = window.location.hash.split('#')[1]
    const url2 = url.split('/')[0]
    return (value.pathname ? value.pathname : 1) === (url2 ? url2 : url)
  })

  if (window.location.hash.split('#')[1] === '/') {
    return config().siteMap[2].key
  } else if (index < 0) {
    return false
  } else {
    return config().siteMap[index].key
  }
}

function getApiUrl() {
  let env = config().environment.find((value, index) => value.host === window.location.host)
  return (env) ?
    env.api :
    config().environment[0].api
}

export { config, getApiUrl, searchMenuWithKey, searchKetWithPathname }
