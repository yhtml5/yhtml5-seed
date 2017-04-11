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
      api: (isMock) ? 'mock.yhtml5.com' : '//116.62.92.115:71'
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
        key: '1',
        name: '首页',
        icon: 'home',
      }, {
        key: '2',
        name: '系统设置',
        icon: 'setting',
      }, {
        key: '3',
        name: '小区管理',
        icon: 'team',
      }, {
        key: '4',
        name: '缴费管理',
        icon: 'pay-circle-o',
      }, {
        key: '5',
        name: '物业服务',
        icon: 'customer-service',
      }, {
        key: '10',
        name: '工作台',
        url: '/',
        items: [{
          name: '新增',
          url: '/collectionsAdd'
        }, {
          name: '收费',
          url: '/collections',
        }]
      }]
  }
}

function getApiUrl() {
  let env = config().environment.find((value, index) => value.host === window.location.host)
  return (env)
    ? env.api
    : config().environment[0].api
}

export {config, getApiUrl}
